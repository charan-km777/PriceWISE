import { useState, useEffect } from 'react';
import { ShoppingCart, User, Bell, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { createClient } from '../utils/supabase/client';

interface HeaderProps {
  onSearch: (query: string) => void;
  cartCount: number;
  onNavigate: (page: string) => void;
  currentPage: string;
  isAuthenticated: boolean;
  onLogout: () => void;
  alertsCount: number;
  accessToken: string | null;
}

export function Header({ onSearch, cartCount, onNavigate, currentPage, isAuthenticated, onLogout, alertsCount, accessToken }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState<string>('User');

  useEffect(() => {
    if (accessToken) {
      fetchUserName();
    }
  }, [accessToken]);

  const fetchUserName = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser(accessToken!);
      if (user?.user_metadata?.name) {
        setUserName(user.user_metadata.name);
      }
    } catch (error) {
      console.error('Error fetching user name:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
      onNavigate('home');
    }
  };

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-emerald-200 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Logo />
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PriceWISE
              </h1>
              <p className="text-xs text-emerald-600/70">Smart Shopping</p>
            </div>
          </motion.div>

          {/* Username Display */}
          {isAuthenticated && (
            <div className="hidden md:block text-emerald-700">
              Hello, <span className="font-semibold">{userName}</span>
            </div>
          )}

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products to compare prices..."
                className="w-full px-6 py-3 bg-emerald-50/50 border border-emerald-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/20 transition-all"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-2 rounded-full transition-all shadow-lg hover:shadow-emerald-500/50"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Icons */}
          <div className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('tracking')}
                  className="relative p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <Bell className={`w-6 h-6 ${currentPage === 'tracking' ? 'text-emerald-600' : 'text-gray-600'}`} />
                  {alertsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {alertsCount}
                    </span>
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate('cart')}
                  className="relative p-2 hover:bg-emerald-50 rounded-lg transition-colors"
                >
                  <ShoppingCart className={`w-6 h-6 ${currentPage === 'cart' ? 'text-emerald-600' : 'text-gray-600'}`} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </>
            )}

            <div className="relative group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                <User className="w-6 h-6 text-gray-600" />
              </motion.button>
              
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {isAuthenticated ? (
                  <>
                    <button
                      onClick={() => onNavigate('tracking')}
                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-gray-700 transition-colors first:rounded-t-xl"
                    >
                      My Tracked Products
                    </button>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 transition-colors last:rounded-b-xl"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onNavigate('login')}
                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-gray-700 transition-colors first:rounded-t-xl"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => onNavigate('signup')}
                      className="w-full text-left px-4 py-3 hover:bg-emerald-50 text-emerald-600 transition-colors last:rounded-b-xl"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </div>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-emerald-50 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="md:hidden mt-4">
          <div className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 bg-emerald-50/50 border border-emerald-300 rounded-full text-gray-800 placeholder-gray-500 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm"
            >
              Go
            </button>
          </div>
        </form>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 border-t border-emerald-200 pt-4"
            >
              <nav className="flex flex-col gap-2">
                {isAuthenticated && (
                  <div className="px-4 py-2 text-emerald-700">
                    Hello, <span className="font-semibold">{userName}</span>
                  </div>
                )}
                <button
                  onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Home
                </button>
                {isAuthenticated && (
                  <>
                    <button
                      onClick={() => { onNavigate('tracking'); setMobileMenuOpen(false); }}
                      className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                    >
                      Tracked Products
                    </button>
                    <button
                      onClick={() => { onNavigate('cart'); setMobileMenuOpen(false); }}
                      className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                    >
                      Cart ({cartCount})
                    </button>
                  </>
                )}
                <button
                  onClick={() => { onNavigate('help'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Help
                </button>
                <button
                  onClick={() => { onNavigate('contact'); setMobileMenuOpen(false); }}
                  className="text-left px-4 py-2 hover:bg-emerald-50 rounded-lg text-gray-700 transition-colors"
                >
                  Contact
                </button>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}