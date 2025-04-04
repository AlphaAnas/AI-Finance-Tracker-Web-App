'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/app/firebase.js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (!email) return toast.error('Please enter your email');

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success('Reset link sent to your email!');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Email not found!');
      } else {
        toast.error(error.message || 'Reset failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen bg-blue-500 text-white">
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="bg-blue-400 p-8 rounded-xl w-full max-w-md shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Reset Your Password</h2>
          <p className="mb-6 text-sm">Enter your registered email to receive reset instructions.</p>

          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-black p-3 w-full rounded border mb-4"
          />

          <button
            onClick={handleReset}
            disabled={loading}
            className={`p-3 w-full rounded font-semibold ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <p className="text-white/70 text-sm mt-4 text-center">
            Back to <a href="/" className="underline">Login</a>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
