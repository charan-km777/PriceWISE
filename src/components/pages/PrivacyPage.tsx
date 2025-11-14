import { motion } from 'motion/react';
import { Shield } from 'lucide-react';

export function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Shield className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">Privacy Policy</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6 text-slate-300">
          <p className="text-sm text-slate-400">Last Updated: November 9, 2025</p>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">1. Information We Collect</h2>
            <p className="mb-3">We collect several types of information to provide and improve our service:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Personal Information:</strong> Email address, name, and password when you create an account</li>
              <li><strong>Usage Data:</strong> Information about your searches, tracked products, and shopping preferences</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies</li>
              <li><strong>Shopping Data:</strong> Products you search for, track, and add to your cart</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">2. How We Use Your Information</h2>
            <p className="mb-3">We use the collected information for various purposes:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>To provide and maintain our price comparison service</li>
              <li>To notify you about price changes and deals</li>
              <li>To improve and personalize your experience</li>
              <li>To communicate with you about your account and our services</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To analyze usage patterns and improve our algorithms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">3. Data Sharing and Disclosure</h2>
            <p className="mb-3">
              We do not sell your personal information. We may share your information only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>With Your Consent:</strong> When you explicitly agree to share information</li>
              <li><strong>Service Providers:</strong> Third-party companies that help us operate our service</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information. However, no method of transmission over the Internet is 100% secure. We use 
              encryption, secure servers, and regular security audits to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">5. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Export your data in a portable format</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">6. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our service and hold 
              certain information. You can instruct your browser to refuse all cookies or to indicate when 
              a cookie is being sent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">7. Children's Privacy</h2>
            <p>
              Our service is not intended for users under the age of 18. We do not knowingly collect 
              personal information from children. If you are a parent and believe your child has provided 
              us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">8. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by 
              posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
              <br />
              Email: privacy@pricewise.com
              <br />
              Phone: +1 (555) 123-4567
              <br />
              Address: 123 Shopping St, Price City, PC 12345
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
