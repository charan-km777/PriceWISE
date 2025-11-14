import { motion } from 'motion/react';
import { Search, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 border-t border-emerald-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-500 p-2 rounded-xl">
                <Search className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                PriceWISE
              </h3>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Your intelligent shopping companion. Compare prices, track deals, and save money on every purchase.
            </p>
            <div className="flex gap-3">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="p-2 bg-white hover:bg-emerald-50 rounded-lg transition-colors shadow-sm"
              >
                <Facebook className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="p-2 bg-white hover:bg-emerald-50 rounded-lg transition-colors shadow-sm"
              >
                <Twitter className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="p-2 bg-white hover:bg-emerald-50 rounded-lg transition-colors shadow-sm"
              >
                <Instagram className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="p-2 bg-white hover:bg-emerald-50 rounded-lg transition-colors shadow-sm"
              >
                <Linkedin className="w-5 h-5 text-gray-600 hover:text-emerald-600" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-emerald-600 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('help')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Help Center
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-emerald-600 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('terms')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('privacy')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('user-policy')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  User Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bibliography')}
                  className="text-gray-600 hover:text-emerald-600 transition-colors text-sm"
                >
                  Bibliography
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-emerald-600 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <Mail className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>support@pricewise.com</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <Phone className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>+91 (555) 123-4567</span>
              </li>
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-emerald-600" />
                <span>123 Shopping St, Price City, PC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-200 mt-8 pt-8 text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} PriceWISE. All rights reserved. Made with ❤️ for smart shoppers.</p>
        </div>
      </div>
    </footer>
  );
}
