'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, 
  onAuthStateChanged
} from 'firebase/auth';
import { auth } from 'src/app/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';

const provider = new GoogleAuthProvider();

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  // Reset any error when email or password changes
  useEffect(() => {
    setEmailError('');
  }, [email, password]);

  // Check if the user is already logged in
  useEffect(() => {
    console.log("Setting up auth listener in Login page");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already logged in:", user.email);
        toast.success(`Already logged in as ${user.email}`);
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Validate email format
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (resetMode) {
        handlePasswordReset();
      } else {
        handleLogin();
      }
    }
  };

  const handleLogin = async () => {
    // Reset error states
    setEmailError('');
    
    // Validate email format
    if (!email) {
      setEmailError('Email is required');
      toast.error('Please enter your email');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }

    if (!password) {
      toast.error('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      console.log(`Attempting login with email: ${email}`);
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success('Login successful!');
      console.log("Logged in:", userCredential.user);
      
      // Use Next.js router to navigate
      router.push('/dashboard');
    } catch (error: any) {
      console.error("Login error:", error.message, error.code);
      
      // More specific error messages based on Firebase error codes
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
        setEmailError('Invalid email or password');
        toast.error('Invalid email or password');
      } else if (error.code === 'auth/user-not-found') {
        setEmailError('No account found with this email');
        toast.error('No account found with this email');
      } else if (error.code === 'auth/wrong-password') {
        toast.error('Incorrect password');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many failed login attempts. Please try again later');
      } else {
        toast.error(`Login error: ${error.message}`);
      }
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
      
      // Use Next.js router to navigate
      router.push('/dashboard');
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

        <div className="mb-3">
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
            className={`p-3 rounded w-full text-black bg-white border ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && <p className="text-red-300 text-sm mt-1">{emailError}</p>}
        </div>

        {!resetMode && (
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="p-3 rounded w-full text-black bg-white border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
              Don't have an account? <a href="/signup" className="underline">Signup</a>
            </p>
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
