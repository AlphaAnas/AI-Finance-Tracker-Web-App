'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, 
  onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/app/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LampContainer } from '@/components/ui/lamp';
import Link from 'next/link';

const provider = new GoogleAuthProvider();

const fadeIn = (direction = "up", delay = 0) => {
  return {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        delay,
        duration: 0.8,
      },
    },
  }
}

export default function LoginPage() {
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
        // Remove the automatic redirect
        // toast.success(`Already logged in as ${user.email}`);
        // router.push('/dashboard');
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

  const signInWithFacebook = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      if (result.user) {
        toast.success("Facebook login successful!");
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Facebook login error:", error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        toast.error("An account already exists with the same email address but different sign-in credentials. Please try a different sign-in method.");
      } else {
        toast.error(error.message || "Failed to login with Facebook");
      }
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
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      {/* Subtle Lamp Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-900/50 to-blue-950/50 z-0" />
      
      {/* Fixed LampContainer */}
      <LampContainer className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="h-full w-full bg-transparent"></div>
      </LampContainer>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("up")}
          className="w-full max-w-md"
        >
          <div className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
            {/* Logo Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#3b82f6]">Expense</h1>
              <p className="text-4xl font-bold text-[#3b82f6] mb-4">TRACKER</p>
              <img src="/logo.png" alt="Logo" className="h-32 mx-auto mb-8" />
              <h2 className="text-4xl font-bold bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-blue-200 mt-2">
                {resetMode ? 'Enter your registered email' : 'Sign in to continue'}
              </p>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full p-3 rounded-lg bg-blue-800/50 border border-blue-400/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  emailError ? 'border-red-500' : ''
                }`}
              />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">{emailError}</p>
              )}
            </div>

            {/* Password Input */}
            {!resetMode && (
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full p-3 rounded-lg bg-blue-800/50 border border-blue-400/20 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300/50 hover:text-blue-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            )}

            {/* Forgot Password Link */}
            {!resetMode && (
              <div className="text-right mb-6">
                <button
                  onClick={() => setResetMode(true)}
                  className="text-blue-300/70 hover:text-blue-300 text-sm"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Login/Reset Button */}
            <Button
              onClick={resetMode ? handlePasswordReset : handleLogin}
              disabled={loading}
              className={`w-full py-6 rounded-lg text-lg font-semibold ${
                loading ? 'bg-blue-600/50 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  {resetMode ? 'Sending...' : 'Logging in...'}
                </div>
              ) : resetMode ? (
                'Send Reset Link'
              ) : (
                'Login'
              )}
            </Button>

            {/* Social Login */}
            {!resetMode && (
              <>
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-blue-400/20" />
                  <span className="mx-4 text-blue-300/50">or</span>
                  <hr className="flex-grow border-blue-400/20" />
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={signInWithGoogle}
                    disabled={loading}
                    className="w-full py-6 rounded-lg text-lg font-semibold bg-white text-blue-900 hover:bg-blue-50"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      className="h-5 w-5 mr-2"
                    />
                    Sign in with Google
                  </Button>

                  <Button
                    onClick={signInWithFacebook}
                    disabled={loading}
                    className="w-full py-6 rounded-lg text-lg font-semibold bg-[#1877F2] text-white hover:bg-[#1865F2]"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      alt="facebook"
                      className="h-5 w-5 mr-2"
                    />
                    Sign in with Facebook
                  </Button>
                </div>
              </>
            )}

            {/* Sign Up Link */}
            {!resetMode && (
              <p className="text-center mt-6 text-blue-300/70">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-300 hover:text-blue-200 underline">
                  Sign up
                </Link>
              </p>
            )}

            {/* Back to Login Link */}
            {resetMode && (
              <p className="text-center mt-6 text-blue-300/70">
                <button
                  onClick={() => setResetMode(false)}
                  className="text-blue-300 hover:text-blue-200 underline"
                >
                  Back to login
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
