'use client';

import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from 'src/app/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const provider = new GoogleAuthProvider();

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      console.log("Logged in:", userCredential.user);
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } catch (error: any) {
      console.error("Login error:", error.message);
      toast.error('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      toast.success('Google login successful!');
      console.log("Google signed in:", result.user);
      setTimeout(() => window.location.href = "/dashboard", 1500);
    } catch (error: any) {
      console.error("Google login error:", error.message);
      toast.error('Google login failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) return toast.error("Please enter your registered email");
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset link sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[#3b82f6] mb-1">Expense</h1>
          <p className="text-4xl font-bold text-[#3b82f6] mb-4">Tracker</p>
          <img src="/logo.png" alt="Logo" className="h-60" />
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-center px-12">
        <h2 className="text-3xl font-semibold mb-2">{resetMode ? 'Reset Password' : 'Welcome'}</h2>
        <p className="mb-6">{resetMode ? 'Enter your registered email' : 'Start Managing Your Finance Faster and better'}</p>

        <input
          type="email"
          placeholder="example@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-3 p-3 rounded w-full text-black bg-white border"
        />

        {!resetMode && (
          <input
            type="password"
            placeholder="at least 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-3 rounded w-full text-black bg-white border"
          />
        )}

        {!resetMode && (
          <a onClick={() => setResetMode(true)} className="text-sm mb-4 text-right text-white/70 cursor-pointer">Forgot password?</a>
        )}

        <button
          onClick={resetMode ? handlePasswordReset : handleLogin}
          disabled={loading}
          className={`p-3 rounded w-full font-semibold mb-4 ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-800 hover:bg-blue-900"
          }`}
        >
          {loading ? (resetMode ? "Sending..." : "Logging in...") : (resetMode ? "Send Reset Link" : "Login")}
        </button>

        {!resetMode && (
          <>
            <div className="flex items-center mb-4">
              <hr className="flex-grow border-white/50" />
              <span className="mx-2">or</span>
              <hr className="flex-grow border-white/50" />
            </div>

            <button
              onClick={signInWithGoogle}
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-white text-black p-3 rounded border border-gray-300 mb-2"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="google" className="h-5 w-5" />
              Sign in with Google
            </button>

            <button
              onClick={() => toast("Facebook Sign-in is currently disabled.")}
              className="flex items-center justify-center gap-2 bg-white text-black p-3 rounded border border-gray-300"
            >
              <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" alt="facebook" className="h-5 w-5" />
              Sign in with Facebook
            </button>

            <p className="mt-4 text-white/70 text-left text-sm">
              Don’t have an account? <a href="/signup" className="underline">Signup</a>
            </p>

            <button
              onClick={() => window.location.href = "/dashboard"}
              className="mt-6 bg-white text-blue-700 font-bold px-6 py-2 rounded border border-blue-700 hover:bg-blue-100 transition"
            >
              Go to Random Page →
            </button>
          </>
        )}

        {resetMode && (
          <p
            className="mt-4 text-white/70 text-left text-sm cursor-pointer underline"
            onClick={() => setResetMode(false)}
          >
            Go back to login
          </p>
        )}
      </div>
    </motion.div>
  );
}
