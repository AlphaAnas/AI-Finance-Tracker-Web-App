'use client';

import { motion } from 'framer-motion';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-600">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">1. Introduction</h2>
              <p>
                This Privacy Policy explains how AI Finance Tracker ("we," "our," or "us") collects, uses, and protects your personal information when you use our application.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">2. Information We Collect</h2>
              <p>We collect the following types of information:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Account information (email, name)</li>
                <li>Profile information</li>
                <li>Financial data (budgets, expenses, income)</li>
                <li>Usage data</li>
                <li>Device information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Improve and personalize your experience</li>
                <li>Process your financial data</li>
                <li>Communicate with you</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information. Your data is encrypted and stored securely using industry-standard protocols.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">5. Third-Party Services</h2>
              <p>
                We use third-party services including:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Google Authentication</li>
                <li>Facebook Authentication</li>
                <li>Firebase Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">6. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
                [Your Contact Email]
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">8. Updates to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
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