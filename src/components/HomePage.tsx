import { motion } from 'motion/react';
import { TrendingDown, Bell, ShoppingBag, Sparkles, Zap, Shield, Globe, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';

export function HomePage({ onGetStarted }: { onGetStarted: () => void }) {
  const platforms = {
    general: [
      { name: 'Amazon', color: 'from-orange-500 to-yellow-500' },
      { name: 'Flipkart', color: 'from-blue-500 to-cyan-500' },
      { name: 'eBay', color: 'from-blue-600 to-purple-500' },
    ],
    fashion: [
      { name: 'Myntra', color: 'from-pink-500 to-red-500' },
      { name: 'Ajio', color: 'from-purple-500 to-indigo-500' },
      { name: 'Meesho', color: 'from-fuchsia-500 to-pink-500' },
    ]
  };

  const features = [
    {
      icon: <TrendingDown className="w-6 h-6" />,
      title: "Real-Time Price Comparison",
      description: "Compare prices across Amazon, Flipkart, eBay and fashion platforms instantly"
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "Smart Price Alerts",
      description: "Get notified via Email & SMS when prices drop to your target"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Shopping Assistant",
      description: "Get personalized recommendations and find the best deals effortlessly"
    },
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Smart Cart Management",
      description: "Products grouped by platform for seamless multi-site checkout"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Search and compare millions of products in milliseconds"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Your data is encrypted and never shared with third parties"
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section with WhatsApp-style Background */}
      <div className="relative min-h-screen">
        {/* WhatsApp-inspired background pattern */}
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
          {/* Shopping widget pattern */}
          <div className="absolute inset-0 opacity-40">
            {[...Array(50)].map((_, i) => {
              const allPlatforms = [...platforms.general, ...platforms.fashion];
              const platform = allPlatforms[i % allPlatforms.length];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.8, 1, 0.8],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 20 + (i % 10),
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.5
                  }}
                  className={`absolute bg-gradient-to-br ${platform.color} rounded-lg p-2 text-white text-xs shadow-lg border border-white/20`}
                  style={{
                    left: `${(i * 17) % 100}%`,
                    top: `${(i * 13) % 100}%`,
                    width: '80px',
                    height: '60px',
                  }}
                >
                  <div className="flex flex-col items-center justify-center h-full">
                    <ShoppingBag className="w-4 h-4 mb-1" />
                    <span className="font-bold text-[8px]">{platform.name}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Diagonal lines pattern overlay (WhatsApp style) */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%">
              <defs>
                <pattern id="diagonalLines" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="20" y2="20" stroke="rgba(16,185,129,0.3)" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 pt-20 pb-32">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="flex justify-center mb-6"
              >
                <Logo size="lg" />
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-6xl md:text-8xl mb-6"
              >
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                  PriceWISE
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-2xl md:text-3xl text-slate-300 mb-4"
              >
                Never Overpay Again
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto"
              >
                Compare prices in real-time across Amazon, Flipkart, eBay, Myntra, Ajio & Meesho.
                Get instant alerts when prices drop and save money on every purchase.
              </motion.p>

              {/* CTA Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onGetStarted}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2 mx-auto"
              >
                Start Saving Money
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-16"
              >
                {[
                  { label: 'Platforms', value: '6+', icon: <Globe className="w-6 h-6" /> },
                  { label: 'Active Users', value: '10K+', icon: <ShoppingBag className="w-6 h-6" /> },
                  { label: 'Products Tracked', value: '50K+', icon: <TrendingDown className="w-6 h-6" /> },
                  { label: 'Money Saved', value: '₹2Cr+', icon: <Sparkles className="w-6 h-6" /> },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-emerald-500/30 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex justify-center mb-2 text-emerald-400">
                      {stat.icon}
                    </div>
                    <div className="text-3xl bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Why Choose <span className="text-emerald-400">PriceWISE</span>?
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Powerful features designed to help you save time and money
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 hover:border-emerald-500/50 rounded-xl p-6 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg text-white">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl text-white">{feature.title}</h3>
                </div>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Supported Platforms */}
      <div className="relative bg-slate-900 py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl text-white mb-4">
              Supported <span className="text-cyan-400">Platforms</span>
            </h2>
            <p className="text-xl text-slate-400">
              We compare prices across the best e-commerce platforms in India
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* General Products */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl text-emerald-400 mb-6 text-center">General Products</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {platforms.general.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`bg-gradient-to-r ${platform.color} px-8 py-4 rounded-xl text-white shadow-lg border border-white/20`}
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5" />
                      <span className="text-lg">{platform.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Fashion Products */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl text-cyan-400 mb-6 text-center">Fashion Products</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {platforms.fashion.map((platform, index) => (
                  <motion.div
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className={`bg-gradient-to-r ${platform.color} px-8 py-4 rounded-xl text-white shadow-lg border border-white/20`}
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-lg">{platform.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of smart shoppers who save money every day with PriceWISE
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-emerald-500/50 transition-all flex items-center gap-2 mx-auto"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
