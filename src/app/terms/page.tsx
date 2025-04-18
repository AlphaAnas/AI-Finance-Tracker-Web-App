'use client';

import { motion } from 'framer-motion';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using AI Finance Tracker, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Description of Service</h2>
              <p>
                AI Finance Tracker is a financial management application that provides budget tracking, expense monitoring, and financial planning tools.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Maintain the confidentiality of your account</li>
                <li>Provide accurate and truthful information</li>
                <li>Use the service for lawful purposes only</li>
                <li>Not share account credentials with third parties</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Account Registration</h2>
              <p>
                Users must register for an account using valid credentials through our supported authentication providers (Google, Facebook).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Data Usage</h2>
              <p>
                We collect and use your data as described in our Privacy Policy. By using our service, you agree to our data handling practices.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Service Modifications</h2>
              <p>
                We reserve the right to modify or discontinue the service at any time, with or without notice.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Limitation of Liability</h2>
              <p>
                AI Finance Tracker is provided "as is" without warranties of any kind, either express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Contact Information</h2>
              <p>
                For any questions regarding these Terms, please contact us at: [Your Contact Email]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">9. Changes to Terms</h2>
              <p>
                We reserve the right to update these Terms at any time. Continued use of the service after such changes constitutes acceptance of the new Terms.
              </p>
              <p className="mt-2">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 