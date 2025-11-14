import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

export function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <FileText className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">Terms & Conditions</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6 text-slate-300">
          <p className="text-sm text-slate-400">Last Updated: November 9, 2025</p>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using PriceWISE, you accept and agree to be bound by the terms and provision 
              of this agreement. If you do not agree to these terms, please do not use our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">2. Use of Service</h2>
            <p className="mb-3">
              PriceWISE provides price comparison and tracking services across multiple e-commerce platforms. 
              You agree to use the service only for lawful purposes and in accordance with these Terms.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You must be at least 18 years old to use this service</li>
              <li>You are responsible for maintaining the confidentiality of your account</li>
              <li>You agree not to use the service for any illegal or unauthorized purpose</li>
              <li>You will not attempt to interfere with the proper working of the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">3. Price Information</h2>
            <p>
              While we strive to provide accurate and up-to-date price information, we cannot guarantee 
              that all prices displayed are current or accurate. Prices are subject to change without notice. 
              Always verify prices on the retailer's website before making a purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">4. Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are owned by PriceWISE 
              and are protected by international copyright, trademark, patent, trade secret, and other 
              intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">5. Third-Party Links</h2>
            <p>
              Our service may contain links to third-party websites or services that are not owned or 
              controlled by PriceWISE. We have no control over, and assume no responsibility for, the 
              content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">6. Limitation of Liability</h2>
            <p>
              PriceWISE shall not be liable for any indirect, incidental, special, consequential, or 
              punitive damages resulting from your use of or inability to use the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">7. Changes to Terms</h2>
            <p>
              We reserve the right to modify or replace these Terms at any time. We will provide notice 
              of any significant changes. Your continued use of the service after any changes constitutes 
              acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">8. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
              <br />
              Email: legal@pricewise.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
