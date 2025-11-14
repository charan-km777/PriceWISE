import { motion } from 'motion/react';
import { HelpCircle, Search, Bell, ShoppingCart, TrendingDown, MessageCircle } from 'lucide-react';

export function HelpPage() {
  const faqs = [
    {
      icon: Search,
      question: 'How do I search for products?',
      answer: 'Simply use the search bar at the top of the page to enter the product name you want to compare. Our system will fetch prices from multiple e-commerce platforms instantly.',
    },
    {
      icon: Bell,
      question: 'How does price tracking work?',
      answer: 'After searching for a product, click the bell icon on any product card to start tracking it. Set your target price, and we\'ll notify you when the price drops to or below that amount.',
    },
    {
      icon: ShoppingCart,
      question: 'How do I use the shopping cart?',
      answer: 'Click the cart icon on any product to add it to your cart. Products are grouped by platform, making it easy to checkout on each website. Your cart is saved to your account.',
    },
    {
      icon: TrendingDown,
      question: 'How accurate are the prices?',
      answer: 'We fetch real-time price data from e-commerce platforms. However, prices can change rapidly. Always verify the final price on the retailer\'s website before purchasing.',
    },
    {
      icon: MessageCircle,
      question: 'What is the AI shopping assistant?',
      answer: 'Our AI chatbot helps you find the best deals by analyzing current prices and making recommendations based on your search results. Click the chat icon in the bottom right to start.',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <HelpCircle className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">Help Center</h1>
        </div>

        <div className="mb-12 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6">
          <h2 className="text-xl text-emerald-400 mb-3">Welcome to PriceWISE Help Center</h2>
          <p className="text-slate-300">
            Find answers to common questions and learn how to make the most of our price comparison platform.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl text-white mb-4">Frequently Asked Questions</h2>
          
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="bg-emerald-500/20 p-3 rounded-lg">
                  <faq.icon className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl text-white mb-2">{faq.question}</h3>
                  <p className="text-slate-300">{faq.answer}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
        >
          <h2 className="text-2xl text-white mb-4">Getting Started Guide</h2>
          
          <div className="space-y-4 text-slate-300">
            <div>
              <h3 className="text-lg text-emerald-400 mb-2">Step 1: Create an Account</h3>
              <p>Sign up with your email to access all features including price tracking and shopping cart.</p>
            </div>

            <div>
              <h3 className="text-lg text-emerald-400 mb-2">Step 2: Search for Products</h3>
              <p>Use the search bar to find products you're interested in. Our system will compare prices across multiple platforms.</p>
            </div>

            <div>
              <h3 className="text-lg text-emerald-400 mb-2">Step 3: Track Prices</h3>
              <p>Click the bell icon on products you want to track. Set your target price and get notified when it drops.</p>
            </div>

            <div>
              <h3 className="text-lg text-emerald-400 mb-2">Step 4: Add to Cart</h3>
              <p>Build your shopping list by adding products to your cart. They're organized by platform for easy checkout.</p>
            </div>

            <div>
              <h3 className="text-lg text-emerald-400 mb-2">Step 5: Get AI Assistance</h3>
              <p>Use our AI chatbot to get personalized recommendations and find the best deals based on your searches.</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-emerald-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl text-white mb-3">Still need help?</h3>
          <p className="text-slate-300 mb-4">
            Our support team is here to assist you with any questions or concerns.
          </p>
          <a
            href="mailto:support@pricewise.com"
            className="inline-block bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:from-emerald-600 hover:to-cyan-600 transition-all"
          >
            Contact Support
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
