import { useState, useEffect } from 'react';
import { createClient } from './utils/supabase/client';
import { projectId, publicAnonKey } from './utils/supabase/info';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { HomePage } from './components/HomePage';
import { ProductComparison } from './components/ProductComparison';
import { AIChat } from './components/AIChat';
import { ShoppingCart } from './components/ShoppingCart';
import { ProductTracking } from './components/ProductTracking';
import { Auth } from './components/Auth';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { HelpPage } from './components/pages/HelpPage';
import { ContactPage } from './components/pages/ContactPage';
import { UserPolicyPage } from './components/pages/UserPolicyPage';
import { BibliographyPage } from './components/pages/BibliographyPage';
import { AboutPage } from './components/pages/AboutPage';

// 1. Define and Export the Type for use in other components
export type PageType = 
  | 'landing' 
  | 'home' 
  | 'cart' 
  | 'tracking' 
  | 'login' 
  | 'signup' 
  | 'terms' 
  | 'privacy' 
  | 'help' 
  | 'contact' 
  | 'user-policy' 
  | 'bibliography' 
  | 'about';

export default function App() {
  // 2. Use PageType in useState
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<any[]>([]);
  const [currentProducts, setCurrentProducts] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [alertsCount, setAlertsCount] = useState(0);

  // Check for existing session on mount
  useEffect(() => {
    checkSession();
  }, []);

  // Fetch cart and alerts when authenticated
  useEffect(() => {
    if (accessToken) {
      fetchCart();
      fetchAlerts();
    }
  }, [accessToken]);

  const checkSession = async () => {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.access_token) {
      setAccessToken(session.access_token);
    }
  };

  const fetchCart = async () => {
    if (!accessToken) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/cart`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      setCart(data.cart || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchAlerts = async () => {
    if (!accessToken) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/price-alerts`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      setAlertsCount(data.alerts?.length || 0);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/search/${encodeURIComponent(query)}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      const data = await response.json();
      setCurrentProducts(data.results || []);
    } catch (error) {
      console.error('Error searching products:', error);
    }
  };

  const handleAddToCart = async (product: any) => {
    if (!accessToken) {
      alert('Please login to add items to cart');
      setCurrentPage('login');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/cart/add`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        }
      );
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
        alert('Added to cart!');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart');
    }
  };

  const handleRemoveFromCart = async (productId: string) => {
    if (!accessToken) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/cart/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      if (data.success) {
        setCart(data.cart);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const handleTrackProduct = async (product: any) => {
    if (!accessToken) {
      alert('Please login to track products');
      setCurrentPage('login');
      return;
    }

    const targetPrice = prompt(`Enter your target price for ${product.name} (current: ₹${product.currentPrice}):`, String(product.currentPrice * 0.9));
    if (!targetPrice) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/track-product`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...product,
            targetPrice: parseFloat(targetPrice),
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert('Product is now being tracked!');
        fetchAlerts();
      }
    } catch (error) {
      console.error('Error tracking product:', error);
      alert('Failed to track product');
    }
  };

  const handleLogin = (token: string) => {
    setAccessToken(token);
    setCurrentPage('home');
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setAccessToken(null);
    setCart([]);
    setAlertsCount(0);
    setCurrentPage('home');
  };

  // 3. New Wrapper Function: Solves the type mismatch by casting string -> PageType
  const handleNavigate = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <HomePage onGetStarted={() => setCurrentPage('home')} />;
      case 'login':
        return (
          <Auth
            mode="login"
            onSuccess={handleLogin}
            onToggleMode={() => setCurrentPage('signup')}
          />
        );
      case 'signup':
        return (
          <Auth
            mode="signup"
            onSuccess={handleLogin}
            onToggleMode={() => setCurrentPage('login')}
          />
        );
      case 'cart':
        return (
          <ShoppingCart
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
          />
        );
      case 'tracking':
        return (
          <ProductTracking
            accessToken={accessToken}
            onRefresh={fetchAlerts}
          />
        );
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'help':
        return <HelpPage />;
      case 'contact':
        return <ContactPage />;
      case 'user-policy':
        return <UserPolicyPage />;
      case 'bibliography':
        return <BibliographyPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <>
            <Hero />
            <ProductComparison
              searchQuery={searchQuery}
              onAddToCart={handleAddToCart}
              onTrackProduct={handleTrackProduct}
              isAuthenticated={!!accessToken}
            />
          </>
        );
    }
  };

  // Don't show Header and Footer on landing page
  const showHeaderFooter = currentPage !== 'landing';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-cyan-50 to-emerald-50">
      {showHeaderFooter && (
        <Header
          onSearch={handleSearch}
          cartCount={cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}
          // 4. Use the wrapper function here
          onNavigate={handleNavigate}
          currentPage={currentPage}
          isAuthenticated={!!accessToken}
          onLogout={handleLogout}
          alertsCount={alertsCount}
          accessToken={accessToken}
        />
      )}

      <main className="min-h-[calc(100vh-200px)]">
        {renderPage()}
      </main>

      {/* 5. Use the wrapper function here to fix the Error 2322 */}
      {showHeaderFooter && <Footer onNavigate={handleNavigate} />}

      {accessToken && currentPage !== 'landing' && <AIChat currentProducts={currentProducts} />}
    </div>
  );
}