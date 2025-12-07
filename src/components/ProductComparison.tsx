
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingDown, Star, ExternalLink, ShoppingCart, Bell, Package } from 'lucide-react';

interface Product {
  name: string;
  platform: string;
  currentPrice: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  inStock: boolean;
  shipping: string;
  url: string;
}

interface ProductComparisonProps {
  searchQuery: string;
  onAddToCart: (product: Product) => void;
  onTrackProduct: (product: Product) => void;
  isAuthenticated: boolean;
}

export function ProductComparison({ searchQuery, onAddToCart, onTrackProduct, isAuthenticated }: ProductComparisonProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState<'price' | 'rating'>('price');

  useEffect(() => {
    if (searchQuery) {
      fetchProducts();
    }
  }, [searchQuery]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Updated to point to the local Python FastAPI backend
      const response = await fetch(
        `http://127.0.0.1:8000/search/${encodeURIComponent(searchQuery)}`
      );

      // Check if the response is valid
      if (!response.ok) throw new Error('Backend failed');

      const data = await response.json();
      setProducts(data.results || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      // Optional: Add UI error handling here
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'price') {
      return a.currentPrice - b.currentPrice;
    }
    return b.rating - a.rating;
  });

  const cheapestPrice = Math.min(...products.map(p => p.currentPrice));

  if (!searchQuery) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl text-gray-800 mb-2">
              Price Comparison for "{searchQuery}"
            </h2>
            <p className="text-gray-600">
              {products.length} results across multiple platforms
            </p>
          </div>

          <div className="flex gap-2 mt-4 md:mt-0">
            <button
              onClick={() => setSortBy('price')}
              className={`px-4 py-2 rounded-lg transition-all ${sortBy === 'price'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
            >
              Sort by Price
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg transition-all ${sortBy === 'rating'
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-emerald-50 border border-emerald-200'
                }`}
            >
              Sort by Rating
            </button>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 animate-pulse shadow-md border border-emerald-100">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {sortedProducts.map((product, index) => {
                const isCheapest = product.currentPrice === cheapestPrice;
                const discount = Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100);

                return (
                  <motion.div
                    key={`${product.platform}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative bg-white backdrop-blur-sm border rounded-xl p-6 hover:scale-105 transition-all shadow-md ${isCheapest
                        ? 'border-emerald-500 shadow-lg shadow-emerald-500/30'
                        : 'border-emerald-200 hover:border-emerald-400'
                      }`}
                  >
                    {isCheapest && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm flex items-center gap-1">
                        <TrendingDown className="w-4 h-4" />
                        Best Price
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg text-emerald-600">{product.platform}</h3>
                      {product.inStock ? (
                        <span className="flex items-center gap-1 text-xs text-green-600">
                          <Package className="w-3 h-3" />
                          In Stock
                        </span>
                      ) : (
                        <span className="text-xs text-red-600">Out of Stock</span>
                      )}
                    </div>

                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl text-gray-900">₹{product.currentPrice}</span>
                        {discount > 0 && (
                          <span className="text-gray-500 line-through text-sm">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>
                      {discount > 0 && (
                        <span className="inline-flex items-center gap-1 bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                          <TrendingDown className="w-3 h-3" />
                          {discount}% OFF
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-gray-800">{product.rating}</span>
                      </div>
                      <span className="text-gray-600 text-sm">({product.reviews} reviews)</span>
                    </div>

                    <div className="mb-4 text-sm">
                      <span className="text-gray-600">Shipping: </span>
                      <span className={product.shipping === 'Free' ? 'text-emerald-600' : 'text-gray-700'}>
                        {product.shipping}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(product.url, '_blank')}
                        className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </motion.button>

                      {isAuthenticated && (
                        <>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onAddToCart(product)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-300"
                            title="Add to Cart"
                          >
                            <ShoppingCart className="w-5 h-5" />
                          </motion.button>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => onTrackProduct(product)}
                            className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors border border-gray-300"
                            title="Track Price"
                          >
                            <Bell className="w-5 h-5" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}