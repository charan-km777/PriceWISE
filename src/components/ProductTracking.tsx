import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Bell, TrendingDown, Trash2, Target, Calendar, DollarSign } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface TrackedProduct {
  id: string;
  name: string;
  platform: string;
  currentPrice: number;
  initialPrice: number;
  lowestPrice: number;
  targetPrice: number;
  trackedAt: string;
}

interface ProductTrackingProps {
  accessToken: string | null;
  onRefresh: () => void;
}

export function ProductTracking({ accessToken, onRefresh }: ProductTrackingProps) {
  const [trackedProducts, setTrackedProducts] = useState<TrackedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (accessToken) {
      fetchTrackedProducts();
    }
  }, [accessToken]);

  const fetchTrackedProducts = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/tracked-products`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      const data = await response.json();
      setTrackedProducts(data.products || []);
    } catch (error) {
      console.error('Error fetching tracked products:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeTracking = async (productId: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-273decf9/track-product/${productId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        }
      );
      setTrackedProducts(prev => prev.filter(p => p.id !== productId));
      onRefresh();
    } catch (error) {
      console.error('Error removing tracked product:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-32 bg-white rounded-xl shadow-md border border-emerald-200"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-emerald-600" />
          <h2 className="text-3xl text-gray-800">Price Tracking</h2>
          {trackedProducts.length > 0 && (
            <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
              {trackedProducts.length} tracked
            </span>
          )}
        </div>

        {trackedProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white rounded-2xl border border-emerald-200 shadow-md"
          >
            <Bell className="w-20 h-20 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl text-gray-600 mb-2">No tracked products yet</h3>
            <p className="text-gray-500">Start tracking products to get price drop notifications</p>
          </motion.div>
        ) : (
          <div className="grid gap-6">
            {trackedProducts.map((product, index) => {
              const priceDrop = product.initialPrice - product.currentPrice;
              const priceDropPercent = ((priceDrop / product.initialPrice) * 100).toFixed(1);
              const reachedTarget = product.currentPrice <= product.targetPrice;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white backdrop-blur-sm border rounded-xl p-6 shadow-md ${
                    reachedTarget
                      ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                      : 'border-emerald-200'
                  }`}
                >
                  {reachedTarget && (
                    <div className="mb-4 bg-emerald-50 border border-emerald-300 rounded-lg p-3 flex items-center gap-2">
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                      <span className="text-emerald-700">🎉 Target price reached! Time to buy!</span>
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl text-gray-800 mb-1">{product.name}</h3>
                          <span className="text-emerald-600">{product.platform}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <DollarSign className="w-4 h-4" />
                            Current Price
                          </div>
                          <div className="text-2xl text-gray-800">₹{product.currentPrice}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <Target className="w-4 h-4" />
                            Target Price
                          </div>
                          <div className="text-2xl text-emerald-600">₹{product.targetPrice}</div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <TrendingDown className="w-4 h-4" />
                            Price Drop
                          </div>
                          <div className={`text-2xl ${priceDrop > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                            {priceDrop > 0 ? `-₹${priceDrop.toFixed(2)}` : '₹0.00'}
                          </div>
                          {priceDrop > 0 && (
                            <div className="text-xs text-green-600">({priceDropPercent}% off)</div>
                          )}
                        </div>

                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                            <Calendar className="w-4 h-4" />
                            Tracking Since
                          </div>
                          <div className="text-sm text-gray-800">
                            {new Date(product.trackedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTracking(product.id)}
                      className="p-3 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg transition-colors self-start md:self-center"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {trackedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 bg-white border border-emerald-200 rounded-xl p-6 shadow-md"
          >
            <h4 className="text-lg text-emerald-600 mb-3">📧 Price Alert Notifications</h4>
            <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 mb-4">
              <p className="text-cyan-700 mb-2">You'll receive alerts via:</p>
              <ul className="space-y-1 text-gray-700 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600">📧</span>
                  <span>Email notifications to your registered email</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-600">📱</span>
                  <span>SMS alerts to your registered phone number</span>
                </li>
              </ul>
            </div>
            <h4 className="text-lg text-emerald-600 mb-3">How Price Tracking Works</h4>
            <ul className="space-y-2 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>We monitor prices across all tracked products automatically</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>You'll be notified when a product reaches your target price</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Price history is tracked so you can see the best time to buy</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600">•</span>
                <span>Set custom target prices for each product to get personalized alerts</span>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}