import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', logger(console.log));
app.use('*', cors());

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
);

// Helper function to get user from access token
async function getUserFromToken(authHeader: string | null) {
  if (!authHeader) return null;
  const accessToken = authHeader.split(' ')[1];
  if (!accessToken) return null;
  const { data: { user }, error } = await supabase.auth.getUser(accessToken);
  if (error || !user) return null;
  return user;
}

// Auth Routes
app.post('/make-server-273decf9/signup', async (c) => {
  try {
    const { email, password, name, phone } = await c.req.json();
    
    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, phone },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log('Error during signup:', error);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ user: data.user });
  } catch (error) {
    console.log('Server error during signup:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

// Product Tracking Routes
app.get('/make-server-273decf9/tracked-products', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const key = `tracked_products_${user.id}`;
    const trackedProducts = await kv.get(key) || [];
    
    return c.json({ products: trackedProducts });
  } catch (error) {
    console.log('Error fetching tracked products:', error);
    return c.json({ error: 'Failed to fetch tracked products' }, 500);
  }
});

app.post('/make-server-273decf9/track-product', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const product = await c.req.json();
    const key = `tracked_products_${user.id}`;
    const trackedProducts = await kv.get(key) || [];
    
    // Add product with tracking info
    const trackedProduct = {
      ...product,
      id: `${product.name}_${Date.now()}`,
      trackedAt: new Date().toISOString(),
      userId: user.id,
      initialPrice: product.currentPrice,
      lowestPrice: product.currentPrice,
      targetPrice: product.targetPrice || product.currentPrice * 0.9, // 10% discount by default
    };

    trackedProducts.push(trackedProduct);
    await kv.set(key, trackedProducts);
    
    return c.json({ success: true, product: trackedProduct });
  } catch (error) {
    console.log('Error tracking product:', error);
    return c.json({ error: 'Failed to track product' }, 500);
  }
});

app.delete('/make-server-273decf9/track-product/:id', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const productId = c.req.param('id');
    const key = `tracked_products_${user.id}`;
    const trackedProducts = await kv.get(key) || [];
    
    const updatedProducts = trackedProducts.filter((p: any) => p.id !== productId);
    await kv.set(key, updatedProducts);
    
    return c.json({ success: true });
  } catch (error) {
    console.log('Error removing tracked product:', error);
    return c.json({ error: 'Failed to remove tracked product' }, 500);
  }
});

// Cart Routes
app.get('/make-server-273decf9/cart', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const key = `cart_${user.id}`;
    const cart = await kv.get(key) || [];
    
    return c.json({ cart });
  } catch (error) {
    console.log('Error fetching cart:', error);
    return c.json({ error: 'Failed to fetch cart' }, 500);
  }
});

app.post('/make-server-273decf9/cart/add', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const product = await c.req.json();
    const key = `cart_${user.id}`;
    const cart = await kv.get(key) || [];
    
    // Check if product already in cart
    const existingIndex = cart.findIndex((p: any) => 
      p.name === product.name && p.platform === product.platform
    );
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity = (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        id: `${product.name}_${product.platform}_${Date.now()}`,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }
    
    await kv.set(key, cart);
    
    return c.json({ success: true, cart });
  } catch (error) {
    console.log('Error adding to cart:', error);
    return c.json({ error: 'Failed to add to cart' }, 500);
  }
});

app.delete('/make-server-273decf9/cart/:id', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const productId = c.req.param('id');
    const key = `cart_${user.id}`;
    const cart = await kv.get(key) || [];
    
    const updatedCart = cart.filter((p: any) => p.id !== productId);
    await kv.set(key, updatedCart);
    
    return c.json({ success: true, cart: updatedCart });
  } catch (error) {
    console.log('Error removing from cart:', error);
    return c.json({ error: 'Failed to remove from cart' }, 500);
  }
});

// AI Chatbot Route
app.post('/make-server-273decf9/chat', async (c) => {
  try {
    const { message, products } = await c.req.json();
    
    // Simple AI-like responses for product recommendations
    const responses = {
      cheapest: (products: any[]) => {
        if (!products || products.length === 0) return "I don't see any products to compare. Try searching for a product first!";
        const cheapest = products.reduce((prev, curr) => 
          prev.currentPrice < curr.currentPrice ? prev : curr
        );
        return `Based on current prices, I recommend buying from **${cheapest.platform}** at **$${cheapest.currentPrice}**. This is the cheapest option available and will save you the most money!`;
      },
      best: (products: any[]) => {
        if (!products || products.length === 0) return "Please search for a product first so I can help you find the best deal!";
        const sorted = [...products].sort((a, b) => a.currentPrice - b.currentPrice);
        return `Here's my recommendation:\n\n🥇 Best Price: ${sorted[0].platform} - $${sorted[0].currentPrice}\n${sorted.length > 1 ? `🥈 Second Best: ${sorted[1].platform} - $${sorted[1].currentPrice}` : ''}\n\nI suggest going with ${sorted[0].platform} to maximize your savings!`;
      },
      track: () => "You can track any product by clicking the 'Track Price' button. I'll notify you when the price drops to your target!",
      help: () => "I'm here to help you save money! I can:\n• Find the cheapest prices across platforms\n• Recommend the best deals\n• Help you track products for price drops\n• Answer questions about products\n\nJust ask me anything!",
    };

    const lowerMessage = message.toLowerCase();
    
    let response = "I'm your shopping assistant! Ask me about the cheapest options, best deals, or how to track products for price drops.";
    
    if (lowerMessage.includes('cheap') || lowerMessage.includes('lowest') || lowerMessage.includes('save')) {
      response = responses.cheapest(products);
    } else if (lowerMessage.includes('best') || lowerMessage.includes('recommend')) {
      response = responses.best(products);
    } else if (lowerMessage.includes('track')) {
      response = responses.track();
    } else if (lowerMessage.includes('help') || lowerMessage.includes('how')) {
      response = responses.help();
    }
    
    return c.json({ response });
  } catch (error) {
    console.log('Error in chatbot:', error);
    return c.json({ error: 'Failed to process chat message' }, 500);
  }
});

// Price Check Route (simulated)
app.get('/make-server-273decf9/search/:query', async (c) => {
  try {
    const query = c.req.param('query');
    
    // Detect if query is fashion-related
    const fashionKeywords = ['shirt', 'pant', 'dress', 'shoe', 'clothes', 'fashion', 'wear', 'jacket', 'jeans', 'skirt', 'top', 'clothing', 'apparel', 'saree', 'kurta', 'kurti'];
    const isFashion = fashionKeywords.some(keyword => query.toLowerCase().includes(keyword));
    
    // Platform selection based on product type
    const platforms = isFashion 
      ? ['Flipkart', 'Myntra', 'Ajio', 'Meesho']
      : ['Amazon', 'Flipkart', 'eBay'];
    
    const basePrice = Math.random() * 500 + 50;
    
    // Platform-specific URL formats - updated for better product accuracy
    const platformUrls: Record<string, string> = {
      'Amazon': `https://www.amazon.in/s?k=${encodeURIComponent(query)}&ref=nb_sb_noss`,
      'Flipkart': `https://www.flipkart.com/search?q=${encodeURIComponent(query)}&sort=relevance`,
      'eBay': `https://www.ebay.in/sch/i.html?_nkw=${encodeURIComponent(query)}&_sacat=0`,
      'Myntra': `https://www.myntra.com/search?q=${encodeURIComponent(query)}`,
      'Ajio': `https://www.ajio.com/search/?text=${encodeURIComponent(query)}&l=grid`,
      'Meesho': `https://www.meesho.com/search?q=${encodeURIComponent(query)}`
    };
    
    const results = platforms.map(platform => ({
      name: query,
      platform,
      currentPrice: Number((basePrice + (Math.random() - 0.5) * 100).toFixed(2)),
      originalPrice: Number((basePrice * 1.2).toFixed(2)),
      rating: Number((Math.random() * 2 + 3).toFixed(1)),
      reviews: Math.floor(Math.random() * 5000 + 100),
      inStock: Math.random() > 0.1,
      shipping: Math.random() > 0.5 ? 'Free' : `₹${(Math.random() * 100 + 40).toFixed(0)}`,
      url: platformUrls[platform],
      productId: `${platform.toLowerCase()}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }));
    
    return c.json({ results });
  } catch (error) {
    console.log('Error searching products:', error);
    return c.json({ error: 'Failed to search products' }, 500);
  }
});

// Get price alerts
app.get('/make-server-273decf9/price-alerts', async (c) => {
  try {
    const user = await getUserFromToken(c.req.header('Authorization'));
    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const key = `tracked_products_${user.id}`;
    const trackedProducts = await kv.get(key) || [];
    
    // Check which products have hit their target price
    const alerts = trackedProducts.filter((p: any) => 
      p.currentPrice <= p.targetPrice
    );
    
    return c.json({ alerts });
  } catch (error) {
    console.log('Error fetching price alerts:', error);
    return c.json({ error: 'Failed to fetch price alerts' }, 500);
  }
});

Deno.serve(app.fetch);