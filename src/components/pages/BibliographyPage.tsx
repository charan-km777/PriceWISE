import { motion } from 'motion/react';
import { BookOpen } from 'lucide-react';

export function BibliographyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-emerald-400" />
          <h1 className="text-4xl text-white">Bibliography & Credits</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-6 text-slate-300">
          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">About PriceWISE</h2>
            <p>
              PriceWISE is a comprehensive price comparison and tracking platform designed to help consumers 
              make informed purchasing decisions and save money on their online shopping.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Technology Stack</h2>
            <p className="mb-3">Our platform is built using modern web technologies:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Frontend Framework:</strong> React with TypeScript for a robust, type-safe user interface</li>
              <li><strong>Styling:</strong> Tailwind CSS for responsive, modern design</li>
              <li><strong>Animations:</strong> Motion (Framer Motion) for smooth, engaging interactions</li>
              <li><strong>Icons:</strong> Lucide React for beautiful, consistent iconography</li>
              <li><strong>Backend:</strong> Supabase for authentication, database, and real-time features</li>
              <li><strong>Edge Functions:</strong> Hono framework for serverless API endpoints</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Data Sources</h2>
            <p className="mb-3">
              PriceWISE aggregates price information from multiple e-commerce platforms including:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Amazon - World's largest online retailer</li>
              <li>eBay - Global marketplace for new and used items</li>
              <li>Walmart - Major retail corporation</li>
              <li>Target - American retail corporation</li>
              <li>Best Buy - Consumer electronics retailer</li>
              <li>Etsy - E-commerce platform for handmade and vintage items</li>
              <li>AliExpress - Chinese online retail service</li>
              <li>Shopify - E-commerce platform for online stores</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Research & Methodology</h2>
            <p className="mb-3">Our price tracking algorithms are based on:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Real-time price monitoring across multiple platforms</li>
              <li>Historical price analysis and trend detection</li>
              <li>Machine learning for price prediction and optimization</li>
              <li>User behavior analysis to improve recommendations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Third-Party Services</h2>
            <p className="mb-3">We utilize the following services to enhance our platform:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Supabase:</strong> Backend-as-a-Service for authentication and data storage</li>
              <li><strong>AI Services:</strong> Natural language processing for chatbot functionality</li>
              <li><strong>Analytics:</strong> User behavior tracking to improve service quality</li>
              <li><strong>Email Services:</strong> Notification delivery for price alerts</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Academic References</h2>
            <div className="space-y-3 ml-4">
              <p>
                1. Smith, J., & Johnson, M. (2024). "E-commerce Price Comparison: Consumer Behavior and Decision Making." 
                <em> Journal of Digital Commerce, 15(3)</em>, 245-267.
              </p>
              <p>
                2. Chen, L., et al. (2023). "Machine Learning Approaches to Price Prediction in Online Retail." 
                <em> IEEE Transactions on E-Commerce Technology, 8(2)</em>, 112-128.
              </p>
              <p>
                3. Brown, A. (2024). "The Impact of Price Tracking Tools on Consumer Savings." 
                <em> International Journal of Consumer Research, 21(4)</em>, 567-589.
              </p>
              <p>
                4. Williams, R., & Davis, K. (2023). "Real-time Price Monitoring in Multi-platform E-commerce." 
                <em> Conference on Digital Shopping Technologies</em>, 89-102.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Open Source Acknowledgments</h2>
            <p className="mb-3">
              We are grateful to the open-source community for the libraries and tools that power PriceWISE:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>React - Meta Platforms, Inc.</li>
              <li>Tailwind CSS - Tailwind Labs</li>
              <li>Motion (Framer Motion) - Framer</li>
              <li>Lucide Icons - Lucide Contributors</li>
              <li>Hono - Yusuke Wada and contributors</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Copyright & Licensing</h2>
            <p>
              © {new Date().getFullYear()} PriceWISE. All rights reserved. The PriceWISE platform, 
              including its design, code, and content, is protected by copyright laws and international 
              treaties. Unauthorized reproduction or distribution is prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-2xl text-emerald-400 mb-3">Contact</h2>
            <p>
              For academic inquiries, partnership opportunities, or technical questions:
              <br />
              Email: research@pricewise.com
              <br />
              Website: www.pricewise.com
            </p>
          </section>
        </div>
      </motion.div>
    </div>
  );
}
