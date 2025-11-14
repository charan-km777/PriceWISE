import { motion } from 'motion/react';
import { Info, Target, Users, Zap, Heart, Award } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Info className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">About PriceWISE</h1>
        </div>

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-8"
          >
            <h2 className="text-2xl text-emerald-400 mb-4">Our Mission</h2>
            <p className="text-slate-300 text-lg">
              To empower consumers with intelligent tools that make online shopping transparent, efficient, 
              and economical. We believe everyone deserves to get the best deals without spending hours 
              comparing prices across multiple platforms.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: Target,
                title: 'Our Vision',
                description: 'To become the world\'s most trusted price comparison platform, helping millions save money every day.',
                color: 'emerald',
              },
              {
                icon: Users,
                title: 'Our Community',
                description: 'Join over 10,000 smart shoppers who use PriceWISE to track products and find the best deals.',
                color: 'cyan',
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Cutting-edge AI and real-time data processing to deliver accurate, instant price comparisons.',
                color: 'purple',
              },
              {
                icon: Heart,
                title: 'Customer First',
                description: 'Your satisfaction is our priority. We\'re committed to providing exceptional service and support.',
                color: 'pink',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
              >
                <div className={`bg-${item.color}-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <item.icon className={`w-6 h-6 text-${item.color}-400`} />
                </div>
                <h3 className="text-xl text-white mb-2">{item.title}</h3>
                <p className="text-slate-300">{item.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
          >
            <h2 className="text-2xl text-white mb-4">Our Story</h2>
            <div className="space-y-4 text-slate-300">
              <p>
                PriceWISE was founded in 2024 by a team of passionate developers and data scientists who 
                were frustrated with the time-consuming process of comparing prices across multiple e-commerce 
                platforms. We knew there had to be a better way.
              </p>
              <p>
                What started as a simple price comparison tool has evolved into a comprehensive shopping 
                assistant powered by artificial intelligence. Today, PriceWISE helps thousands of users 
                save money and time on their online purchases every day.
              </p>
              <p>
                Our platform now features real-time price tracking, intelligent notifications, personalized 
                recommendations, and an AI chatbot that helps users make informed purchasing decisions. 
                We're constantly innovating and adding new features based on user feedback.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
          >
            <h2 className="text-2xl text-white mb-4">What We Offer</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Real-time price comparison across 8+ platforms',
                'Smart price tracking with custom alerts',
                'AI-powered shopping assistant',
                'Secure shopping cart management',
                'Price drop notifications',
                'Historical price analysis',
                'Mobile-responsive design',
                'Free to use, always',
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <Award className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border border-emerald-500/30 rounded-xl p-8 text-center"
          >
            <h2 className="text-2xl text-white mb-4">Join Us on Our Journey</h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Whether you're a casual shopper or a bargain hunter, PriceWISE is here to help you save 
              money and shop smarter. Join our growing community of smart shoppers today!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all shadow-lg hover:shadow-emerald-500/50">
                Get Started Free
              </button>
              <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg transition-all">
                Contact Us
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
