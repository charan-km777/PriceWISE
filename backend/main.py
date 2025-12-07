import logging
import time
import concurrent.futures
import re
from typing import List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# --- CONFIGURATION ---
logging.basicConfig(level=logging.INFO)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- DATA MODELS ---
class ProductResult(BaseModel):
    name: str
    platform: str
    currentPrice: float
    originalPrice: float
    rating: float
    reviews: int
    inStock: bool
    shipping: str
    url: str
    addToCartUrl: str 

class SearchResponse(BaseModel):
    results: List[ProductResult]

# --- HELPER FUNCTIONS ---

def get_min_price_limit(query: str) -> float:
    q = query.lower()
    tech_keywords = ['iphone', 'samsung', 'pixel', 'macbook', 'laptop', 'ipad', 'phone', 'tablet']
    if any(k in q for k in tech_keywords) and "case" not in q and "cover" not in q:
        return 2000.0 
    return 10.0

def is_valid_price(price: float, query: str) -> bool:
    if price <= 10: return False
    if price > 500000: return False
    return True

def is_valid_title(query: str, title: str) -> bool:
    q_norm = query.lower().split()
    t_norm = title.lower()
    keywords = [w for w in q_norm if len(w) > 2] 
    if not keywords: return True 
    if any(w in t_norm for w in keywords):
        return True
    return False

def is_fashion_query(query: str) -> bool:
    fashion_keywords = [
        'shirt', 'jeans', 'tshirt', 'dress', 'saree', 'kurta', 'kurti',
        'top', 'skirt', 'lehenga', 'jacket', 'coat', 'blazer', 'suit',
        'pant', 'trouser', 'shoe', 'sneaker', 'sandal', 'heel', 'boot',
        'watch', 'bag', 'purse', 'wallet', 'jewellery', 'cloth', 'wear'
    ]
    return any(k in query.lower() for k in fashion_keywords)

def parse_price(text: str) -> float:
    try:
        # Remove currency symbols and commas
        clean = re.sub(r'[₹,\s]', '', text)
        # Extract first number (handles cases like "₹1,299.00" or "1299")
        match = re.search(r'(\d+\.?\d*)', clean)
        if match:
            return float(match.group(1))
    except:
        pass
    return 0.0

def parse_rating_from_text(text: str) -> float:
    try:
        match = re.search(r'(\d\.\d)\s*out of 5', text)
        if match: return float(match.group(1))
        match_simple = re.search(r'\b([1-5]\.\d)\b', text)
        if match_simple: return float(match_simple.group(1))
    except: pass
    return 0.0

def parse_reviews_from_text(text: str) -> int:
    try:
        clean = text.lower().replace(',', '')
        k_match = re.search(r'(\d+(?:\.\d+)?)k', clean)
        if k_match and ("rating" in clean or "review" in clean):
            return int(float(k_match.group(1)) * 1000)
        match = re.search(r'(\d+)\s*(?:ratings|reviews)|\((\d+)\)', clean)
        if match:
            val = match.group(1) or match.group(2)
            return int(val)
    except: pass
    return 0

# --- DRIVER SETUP ---
def create_driver():
    options = Options()
    options.add_argument('--headless')  # ENABLED for faster execution
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage') 
    options.add_argument('--disable-gpu')
    options.add_argument('--window-size=1920,1080')
    options.add_argument("--log-level=3")
    options.add_argument("--disable-images")  # Faster loading
    options.add_argument("--disable-javascript")  # Faster for static content
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36")
    options.add_argument("--disable-blink-features=AutomationControlled")
    
    service = Service(ChromeDriverManager().install())
    return webdriver.Chrome(service=service, options=options)

# --- SCRAPERS ---

def scrape_amazon(query: str) -> List[ProductResult]:
    print(f"[Amazon] Starting scrape for: {query}")
    candidates = []
    min_price = get_min_price_limit(query)
    
    driver = create_driver()
    try:
        driver.get(f"https://www.amazon.in/s?k={query}")
        
        # Wait for results with timeout
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, 'div[data-component-type="s-search-result"]'))
            )
        except:
            print("[Amazon] Timeout waiting for results")
            return []
        
        items = driver.find_elements(By.CSS_SELECTOR, 'div[data-component-type="s-search-result"]')
        print(f"[Amazon] Found {len(items)} items")

        for item in items[:10]:  # Reduced from 15
            try:
                full_text = item.text.lower()
                
                # Skip sponsored and unavailable
                if "sponsored" in full_text or "unavailable" in full_text or "out of stock" in full_text:
                    continue

                # Name
                try: 
                    name = item.find_element(By.CSS_SELECTOR, 'h2 a span').text
                except:
                    try:
                        name = item.find_element(By.TAG_NAME, 'h2').text
                    except: 
                        continue

                if not is_valid_title(query, name): continue

                # Price - Multiple selectors
                price = 0.0
                try:
                    # Try whole + fraction
                    whole = item.find_element(By.CSS_SELECTOR, 'span.a-price-whole').text
                    try:
                        fraction = item.find_element(By.CSS_SELECTOR, 'span.a-price-fraction').text
                        price = parse_price(f"{whole}.{fraction}")
                    except:
                        price = parse_price(whole)
                except:
                    # Fallback: any element with price class
                    try:
                        price_elem = item.find_element(By.CSS_SELECTOR, 'span.a-price span.a-offscreen')
                        price = parse_price(price_elem.get_attribute('textContent'))
                    except:
                        continue
                
                if price < min_price or not is_valid_price(price, query): 
                    continue

                # Rating & Reviews
                rating = 0.0
                reviews = 0
                try:
                    rating_elem = item.find_element(By.CSS_SELECTOR, 'span.a-icon-alt')
                    rating = parse_rating_from_text(rating_elem.get_attribute('textContent'))
                except: pass
                
                try:
                    review_elem = item.find_element(By.CSS_SELECTOR, 'span.a-size-base.s-underline-text')
                    reviews = parse_reviews_from_text(review_elem.text)
                except: pass

                # Link
                try:
                    link = item.find_element(By.CSS_SELECTOR, 'h2 a').get_attribute('href')
                except:
                    link = item.find_element(By.TAG_NAME, 'a').get_attribute('href')
                
                candidates.append(ProductResult(
                    name=name, 
                    platform="Amazon", 
                    currentPrice=price, 
                    originalPrice=price*1.2,
                    rating=rating, 
                    reviews=reviews, 
                    inStock=True, 
                    shipping="Free", 
                    url=link,
                    addToCartUrl=link
                ))
                
                # Early exit if we have a good match
                if len(candidates) >= 3:
                    break
                    
            except Exception as e:
                continue

    except Exception as e:
        print(f"[Amazon] Error: {e}")
    finally:
        driver.quit()

    if candidates:
        candidates.sort(key=lambda x: x.currentPrice)
        return [candidates[0]]
    
    return []

def scrape_flipkart(query: str) -> List[ProductResult]:
    print(f"[Flipkart] Scraping: {query}")
    candidates = []
    driver = create_driver()
    try:
        driver.get(f"https://www.flipkart.com/search?q={query}")
        
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "div[data-id], a[href*='/p/']"))
            )
        except:
            print("[Flipkart] Timeout")
            return []
        
        # Try multiple selectors
        cards = driver.find_elements(By.CSS_SELECTOR, "div[data-id]")
        if not cards:
            cards = driver.find_elements(By.CSS_SELECTOR, "a[href*='/p/']")
        
        for card in cards[:8]:  # Reduced from infinite
            try:
                full_text = card.text
                
                # Name
                name = ""
                try: 
                    name = card.find_element(By.CSS_SELECTOR, "div.KzDlHZ, div._4rR01T").text
                except:
                    try:
                        name = card.find_element(By.TAG_NAME, "img").get_attribute("alt")
                    except: 
                        name = full_text.split('\n')[0] if full_text else ""
                
                if not name or not is_valid_title(query, name): 
                    continue

                # Price - improved extraction
                price = 0.0
                try:
                    # Modern Flipkart price selector
                    price_elem = card.find_element(By.CSS_SELECTOR, "div.Nx9bqj, div._30jeq3")
                    price = parse_price(price_elem.text)
                except:
                    # Fallback: scan text
                    for line in full_text.split('\n'):
                        if '₹' in line:
                            p = parse_price(line)
                            if p > 0: 
                                price = p
                                break
                
                if not is_valid_price(price, query): 
                    continue

                rating = parse_rating_from_text(full_text)
                reviews = parse_reviews_from_text(full_text)

                try:
                    link = card.find_element(By.TAG_NAME, 'a').get_attribute('href')
                except:
                    link = card.get_attribute('href') or f"https://www.flipkart.com/search?q={query}"

                candidates.append(ProductResult(
                    name=name, 
                    platform="Flipkart", 
                    currentPrice=price, 
                    originalPrice=price*1.1,
                    rating=rating, 
                    reviews=reviews, 
                    inStock=True, 
                    shipping="Free", 
                    url=link,
                    addToCartUrl=link
                ))
                
                if len(candidates) >= 3:
                    break
                    
            except: 
                continue
                
    except Exception as e: 
        print(f"[Flipkart] Error: {e}")
    finally: 
        driver.quit()

    if candidates:
        candidates.sort(key=lambda x: x.currentPrice)
        return [candidates[0]]
    return []

def scrape_meesho(query: str) -> List[ProductResult]:
    print(f"[Meesho] Scraping: {query}")
    candidates = []
    driver = create_driver()
    try:
        driver.get(f"https://www.meesho.com/search?q={query}")
        
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "a[href*='/p/']"))
            )
        except:
            return []
        
        items = driver.find_elements(By.CSS_SELECTOR, "a[href*='/p/']")
        
        for item in items[:8]:
            try:
                full_text = item.text
                lines = full_text.split('\n')
                name = lines[0] if lines else ""
                
                if not name: continue
                
                # Price
                price = 0.0
                for line in lines:
                    if '₹' in line:
                        price = parse_price(line)
                        if price > 0:
                            break
                
                if not is_valid_price(price, query): 
                    continue

                rating = parse_rating_from_text(full_text)
                reviews = parse_reviews_from_text(full_text)
                
                link = item.get_attribute('href')
                
                candidates.append(ProductResult(
                    name=name, 
                    platform="Meesho", 
                    currentPrice=price, 
                    originalPrice=price,
                    rating=rating, 
                    reviews=reviews, 
                    inStock=True, 
                    shipping="Free", 
                    url=link,
                    addToCartUrl=link
                ))
                
                if len(candidates) >= 3:
                    break
                    
            except: 
                continue
    except: 
        pass
    finally: 
        driver.quit()
    
    if candidates:
        candidates.sort(key=lambda x: x.currentPrice)
        return [candidates[0]]
    return []

def scrape_myntra(query: str) -> List[ProductResult]:
    print(f"[Myntra] Scraping: {query}")
    candidates = []
    driver = create_driver()
    try:
        driver.get(f"https://www.myntra.com/{query}")
        
        try:
            WebDriverWait(driver, 5).until(
                EC.presence_of_element_located((By.CSS_SELECTOR, "li.product-base"))
            )
        except:
            return []
        
        items = driver.find_elements(By.CSS_SELECTOR, "li.product-base")
        
        for item in items[:10]:
            try:
                full_text = item.text
                
                # Name
                try:
                    brand = item.find_element(By.CSS_SELECTOR, "h3.product-brand").text
                    product = item.find_element(By.CSS_SELECTOR, "h4.product-product").text
                    name = f"{brand} {product}"
                except:
                    name = full_text.split('\n')[0]
                
                if not name: continue
                
                # Price
                price = 0.0
                try:
                    price_txt = item.find_element(By.CSS_SELECTOR, "span.product-discountedPrice").text
                    price = parse_price(price_txt)
                except:
                    try:
                        price_txt = item.find_element(By.CSS_SELECTOR, "span.product-price").text
                        price = parse_price(price_txt)
                    except: 
                        pass
                
                if not is_valid_price(price, query): 
                    continue

                rating = parse_rating_from_text(full_text)
                reviews = parse_reviews_from_text(full_text)
                if reviews == 0: reviews = 50

                link = item.find_element(By.TAG_NAME, 'a').get_attribute('href')
                
                candidates.append(ProductResult(
                    name=name, 
                    platform="Myntra", 
                    currentPrice=price, 
                    originalPrice=price,
                    rating=rating, 
                    reviews=reviews, 
                    inStock=True, 
                    shipping="Paid", 
                    url=link,
                    addToCartUrl=link
                ))
                
                if len(candidates) >= 3:
                    break
                    
            except: 
                continue
    except: 
        pass
    finally: 
        driver.quit()

    if candidates:
        candidates.sort(key=lambda x: x.currentPrice)
        return [candidates[0]]
    return []

# --- MAIN ENDPOINT ---
@app.get("/search/{query}", response_model=SearchResponse)
async def search_products(query: str):
    print(f"\n--- SEARCH REQUEST: {query} ---")
    results = []
    
    is_fashion = is_fashion_query(query)
    
    with concurrent.futures.ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        
        # Always run Amazon and Flipkart
        futures.append(executor.submit(scrape_amazon, query))
        futures.append(executor.submit(scrape_flipkart, query))
        
        # Add fashion platforms only for fashion queries
        if is_fashion:
            print("[INFO] Fashion query detected - enabling Myntra & Meesho")
            futures.append(executor.submit(scrape_meesho, query))
            futures.append(executor.submit(scrape_myntra, query))
        else:
            print("[INFO] Tech/General query - using Amazon & Flipkart only")
        
        # Collect results
        for future in concurrent.futures.as_completed(futures):
            try:
                data = future.result()
                if data: 
                    results.extend(data)
            except Exception as e: 
                print(f"Thread Error: {e}")

    print(f"--- COMPLETE. Returning {len(results)} results ---")
    return {"results": results}