import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">Contact Us</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8"
          >
            <h2 className="text-2xl text-white mb-6">Send us a message</h2>
            
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-500/20 border border-emerald-500/50 rounded-lg p-6 text-center"
              >
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl text-emerald-400 mb-2">Message Sent!</h3>
                <p className="text-slate-300">We'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-slate-300 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Subject</label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/50"
                >
                  <Send className="w-5 h-5" />
                  Send Message
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
              <h2 className="text-2xl text-white mb-6">Get in Touch</h2>
              <p className="text-slate-300 mb-6">
                Have questions about PriceWISE? We're here to help! Reach out to us through any of these channels.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="bg-emerald-500/20 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">Email</h3>
                    <a href="mailto:support@pricewise.com" className="text-emerald-400 hover:text-emerald-300">
                      support@pricewise.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-cyan-400 hover:text-cyan-300">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-sm text-slate-400 mt-1">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-slate-900/50 rounded-lg">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white mb-1">Address</h3>
                    <p className="text-slate-300">
                      123 Shopping Street
                      <br />
                      Price City, PC 12345
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/30 rounded-xl p-6">
              <h3 className="text-xl text-emerald-400 mb-3">Office Hours</h3>
              <div className="space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <h3 className="text-xl text-white mb-3">Quick Links</h3>
              <div className="space-y-2">
                <a href="#" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  → Visit our Help Center
                </a>
                <a href="#" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  → Check Service Status
                </a>
                <a href="#" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  → Report a Bug
                </a>
                <a href="#" className="block text-emerald-400 hover:text-emerald-300 transition-colors">
                  → Request a Feature
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
