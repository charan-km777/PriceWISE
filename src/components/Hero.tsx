import { motion } from 'motion/react';
import { TrendingDown, Bell, ShoppingBag } from 'lucide-react';

export function Hero() {
  const ecommercePlatforms = [
    { name: 'Amazon', color: 'from-orange-400 to-yellow-400' },
    { name: 'eBay', color: 'from-blue-400 to-purple-400' },
    { name: 'Walmart', color: 'from-blue-500 to-cyan-400' },
    { name: 'Target', color: 'from-red-400 to-pink-400' },
    { name: 'Best Buy', color: 'from-blue-600 to-yellow-400' },
    { name: 'Etsy', color: 'from-orange-500 to-red-400' },
    { name: 'AliExpress', color: 'from-red-500 to-orange-400' },
    { name: 'Shopify', color: 'from-green-400 to-emerald-400' },
  ];

  return (
    <div className="relative min-h-[600px] overflow-hidden">
      {/* Animated Background with E-commerce Logos */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 via-cyan-50 to-emerald-100">
        <div className="absolute inset-0 opacity-20">
          {ecommercePlatforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: [0.3, 0.6, 0.3],
                scale: [0.8, 1, 0.8],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 10 + index,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.5
              }}
              className={`absolute blur-3xl rounded-full w-64 h-64 bg-gradient-to-r ${platform.color}`}
              style={{
                left: `${(index * 12) % 100}%`,
                top: `${(index * 15) % 100}%`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(5,150,105,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(5,150,105,0.08)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-emerald-600 bg-clip-text text-transparent">
              Smart Price Comparison
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              Compare prices across multiple platforms and never miss a deal again
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-emerald-300 shadow-sm"
              >
                <TrendingDown className="w-5 h-5 text-emerald-600" />
                <span className="text-gray-800">Real-time Prices</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-300 shadow-sm"
              >
                <Bell className="w-5 h-5 text-cyan-600" />
                <span className="text-gray-800">Price Alerts</span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-300 shadow-sm"
              >
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                <span className="text-gray-800">AI Assistant</span>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {[
                { label: 'Platforms', value: '8+' },
                { label: 'Users', value: '10K+' },
                { label: 'Products Tracked', value: '50K+' },
                { label: 'Money Saved', value: '$2M+' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm border border-emerald-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="text-3xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Platforms */}
      <div className="absolute bottom-10 left-0 right-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {ecommercePlatforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`bg-gradient-to-r ${platform.color} px-4 py-2 rounded-lg text-white text-sm shadow-md border border-white/30`}
              >
                {platform.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
