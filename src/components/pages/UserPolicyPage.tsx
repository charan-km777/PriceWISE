import { motion } from 'motion/react';
import { Users } from 'lucide-react';

export function UserPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">User Policy</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6 text-slate-300">
          <p className="text-sm text-slate-400">Last Updated: November 9, 2025</p>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">1. Account Registration and Security</h2>
            <p className="mb-3">
              To access certain features of PriceWISE, you must create an account. By creating an account, you agree to:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Immediately notify us of any unauthorized use of your account</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">2. Acceptable Use</h2>
            <p className="mb-3">When using PriceWISE, you agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe upon the rights of others</li>
              <li>Transmit any harmful or malicious code</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Engage in any form of automated data collection (scraping, bots, etc.)</li>
              <li>Interfere with or disrupt the service or servers</li>
              <li>Impersonate any person or entity</li>
              <li>Use the service for any fraudulent or illegal purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">3. User Content</h2>
            <p className="mb-3">
              Users may submit searches, track products, and interact with our AI chatbot. You retain ownership 
              of any content you submit, but grant us a license to use it to provide our services.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You are responsible for all content associated with your account</li>
              <li>We reserve the right to remove any content that violates our policies</li>
              <li>We do not claim ownership of your personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">4. Service Availability</h2>
            <p>
              We strive to provide continuous service availability, but cannot guarantee uninterrupted access. 
              We may modify, suspend, or discontinue any part of the service at any time without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">5. Account Termination</h2>
            <p className="mb-3">We reserve the right to suspend or terminate your account if you:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Violate these policies or our Terms of Service</li>
              <li>Engage in fraudulent or illegal activities</li>
              <li>Abuse our service or other users</li>
              <li>Fail to comply with our requests or instructions</li>
            </ul>
            <p className="mt-3">
              You may delete your account at any time by contacting our support team. Upon deletion, 
              all your data will be removed in accordance with our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">6. Age Requirement</h2>
            <p>
              You must be at least 18 years old to use PriceWISE. By using our service, you represent 
              and warrant that you meet this age requirement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">7. Communication Preferences</h2>
            <p className="mb-3">By creating an account, you agree to receive:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Price drop notifications for tracked products</li>
              <li>Service updates and important announcements</li>
              <li>Promotional emails (you can opt-out at any time)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">8. Dispute Resolution</h2>
            <p>
              If you have any concerns or disputes, please contact us first at support@pricewise.com. 
              We will work with you to resolve the issue promptly and fairly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this User Policy from time to time. Continued use of the service after 
              changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">10. Contact Information</h2>
            <p>
              For questions about this User Policy, contact us at:
              <br />
              Email: policy@pricewise.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
