import { motion } from 'motion/react';
import { Trash2, ExternalLink, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  platform: string;
  currentPrice: number;
  quantity: number;
  url: string;
}

interface ShoppingCartProps {
  cart: CartItem[];
  onRemoveFromCart: (id: string) => void;
}

export function ShoppingCart({ cart, onRemoveFromCart }: ShoppingCartProps) {
  const groupedCart = cart.reduce((acc, item) => {
    if (!acc[item.platform]) {
      acc[item.platform] = [];
    }
    acc[item.platform].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const totalAmount = cart.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Open all products grouped by platform in new tabs
    Object.entries(groupedCart).forEach(([platform, items]) => {
      // Build search query with all products from this platform
      const productNames = items.map(item => item.name).join(' ');
      
      // Platform-specific checkout URLs
      const platformUrls: Record<string, string> = {
        'Amazon': `https://www.amazon.in/s?k=${encodeURIComponent(productNames)}`,
        'Flipkart': `https://www.flipkart.com/search?q=${encodeURIComponent(productNames)}`,
        'eBay': `https://www.ebay.com/sch/i.html?_nkw=${encodeURIComponent(productNames)}`,
        'Myntra': `https://www.myntra.com/search?q=${encodeURIComponent(productNames)}`,
        'Ajio': `https://www.ajio.com/search/?text=${encodeURIComponent(productNames)}`,
        'Meesho': `https://www.meesho.com/search?q=${encodeURIComponent(productNames)}`
      };
      
      // Open in new tab with a slight delay to avoid popup blockers
      setTimeout(() => {
        window.open(platformUrls[platform] || items[0]?.url, '_blank');
      }, Object.keys(groupedCart).indexOf(platform) * 500);
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl text-gray-800">Shopping Cart</h2>
          {totalItems > 0 && (
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
              {totalItems} items
            </span>
          )}
        </div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-emerald-200 shadow-md"
          >
            <ShoppingBag className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500">Add products from search results to get started</p>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {Object.entries(groupedCart).map(([platform, items]) => (
                <motion.div
                  key={platform}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white backdrop-blur-sm border border-emerald-200 rounded-xl p-6 shadow-md"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl text-emerald-600">{platform}</h3>
                    <button
                      onClick={() => {
                        const platformUrl = items[0]?.url?.split('/search')[0] || `https://${platform.toLowerCase()}.com`;
                        window.open(platformUrl, '_blank');
                      }}
                      className="text-sm text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                    >
                      Shop on {platform}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-3">
                    {items.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <h4 className="text-gray-800 mb-1">{item.name}</h4>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">Qty: {item.quantity}</span>
                            <span className="text-emerald-600">₹{item.currentPrice}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.open(item.url, '_blank')}
                            className="p-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onRemoveFromCart(item.id)}
                            className="p-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between items-center">
                    <span className="text-gray-600">Platform Total:</span>
                    <span className="text-xl text-gray-800">
                      ₹{items.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0).toFixed(2)}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24 bg-white backdrop-blur-sm border border-emerald-300 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl text-gray-800 mb-6">Order Summary</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Items ({totalItems})</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Estimated Shipping</span>
                    <span className="text-emerald-600">Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-xl">
                    <span className="text-gray-800">Total</span>
                    <span className="text-emerald-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 border border-emerald-300 rounded-lg p-4 mb-6">
                  <p className="text-sm text-emerald-700">
                    💰 Grouped by platform for easy checkout on each website
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50"
                >
                  Proceed to Checkout
                </motion.button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  You'll be redirected to each platform to complete your purchase
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}