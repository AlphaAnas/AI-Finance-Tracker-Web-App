'use client';

import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail, 
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  EmailAuthProvider,
  AuthError,
  FacebookAuthProvider
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '@/app/firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LampContainer } from '@/components/ui/lamp';
import Link from 'next/link';
import Image from 'next/image';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { UserData } from '@/app/api/profile/userDataService';
import { db } from '@/app/firebase';
import axios from 'axios';

// Animation variants
const fadeIn = (direction: "up" | "down" | "left" | "right" = "up", delay: number = 0) => {
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
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [emailValidation, setEmailValidation] = useState({ isValid: false, message: '', checking: false });
  const router = useRouter();

  // Reset any error when email or password changes
  useEffect(() => {
    setEmailError('');
  }, [email, password]);

  // Check if the user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User already logged in:", user.email);
      }
    });

    return () => unsubscribe();
  }, [router]);

  // Validate email format
  const isValidEmail = (email: string): boolean => {
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
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      toast.success('Login successful!');
      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      console.error("Login error:", authError.message, authError.code);
      
      switch (authError.code) {
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
          setEmailError('Invalid email or password');
          toast.error('Invalid email or password');
          break;
        case 'auth/user-not-found':
          setEmailError('No account found with this email');
          toast.error('No account found with this email');
          break;
        case 'auth/wrong-password':
          toast.error('Incorrect password');
          break;
        case 'auth/too-many-requests':
          toast.error('Too many failed login attempts. Please try again later');
          break;
        default:
          toast.error('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      // Clear any previous errors
      setEmailError('');
      
      // Try signing in with Google
      const result = await signInWithPopup(auth, googleProvider)
        .catch((error) => {
          if (error.code === 'auth/popup-closed-by-user') {
            throw new Error('Sign-in cancelled by user');
          }
          throw error;
        });

      // Get the credential
      const credential = GoogleAuthProvider.credentialFromResult(result);
      
      if (!credential) {
        throw new Error('Failed to get credential from Google');
      }

      // Check if user exists in Firestore
      const userDoc = await getDoc(doc(db, 'users', result.user.uid));
      
      if (!userDoc.exists()) {
        // Create new user document in Firestore
        const userData: UserData = {
          uid: result.user.uid,
          email: result.user.email || '',
          firstName: result.user.displayName?.split(' ')[0] || '',
          surname: result.user.displayName?.split(' ').slice(1).join(' ') || '',
          currentBalance: 0,
          createdAt: new Date().toISOString(),
          emailValidated: true,
        };

        await setDoc(doc(db, 'users', result.user.uid), userData);
      }

      toast.success('Google login successful!');
      router.push('/dashboard');
    } catch (error) {
      const authError = error as AuthError;
      console.error("Google login error:", authError);
      
      if (authError.message === 'Sign-in cancelled by user') {
        // User cancelled, don't show error
        console.log('Sign-in cancelled by user');
        return;
      }
      
      if (authError.code === 'auth/account-exists-with-different-credential') {
        const email = authError.customData?.email;
        if (email) {
          const methods = await fetchSignInMethodsForEmail(auth, email);
          toast.error(`This email is already used with ${methods[0]}. Please use that method to sign in.`);
        }
      } else if (authError.code === 'auth/internal-error') {
        toast.error('An error occurred. Please try again or use a different sign-in method.');
      } else if (authError.code === 'auth/popup-blocked') {
        toast.error('Sign-in popup was blocked. Please allow popups for this site.');
      } else if (authError.code === 'auth/cancelled-popup-request') {
        // Multiple popups were opened, no need to show error
        console.log('Sign-in cancelled due to multiple popups');
      } else if (authError.code === 'auth/network-request-failed') {
        toast.error('Network error. Please check your internet connection and try again.');
      } else {
        toast.error('Failed to sign in with Google. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const signInWithFacebook = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      toast.success("Facebook login successful!");
      router.push("/dashboard");
    } catch (error) {
      const authError = error as AuthError;
      console.error("Facebook login error:", authError);
      
      if (authError.code === 'auth/account-exists-with-different-credential') {
        try {
          // Get the email from the error
          const email = authError.customData?.email;
          if (email) {
            // Get existing providers for this email
            const methods = await fetchSignInMethodsForEmail(auth, email);
            
            if (methods.includes('google.com')) {
              // If the user has previously signed in with Google, prompt them to sign in with Google
              toast.error('This email is associated with a Google account. Please sign in with Google.');
              
              // You can optionally trigger Google sign-in automatically
              try {
                const googleResult = await signInWithPopup(auth, googleProvider);
                if (googleResult.user) {
                  // Now link the Facebook credential to this account
                  const facebookCredential = FacebookAuthProvider.credentialFromError(authError);
                  if (facebookCredential) {
                    await linkWithCredential(googleResult.user, facebookCredential);
                    toast.success('Successfully linked Facebook account!');
                    router.push('/dashboard');
                  }
                }
              } catch (linkError) {
                console.error("Error linking accounts:", linkError);
                toast.error('Failed to link accounts. Please try again.');
              }
            } else if (methods.includes('password')) {
              // If the user has previously signed in with email/password
              toast.error('This email is associated with an email/password account. Please sign in with email and password.');
            } else {
              toast.error(`This email is already associated with ${methods[0]}. Please use that sign-in method.`);
            }
          }
        } catch (innerError) {
          console.error("Error handling credential conflict:", innerError);
          toast.error("An error occurred while handling authentication. Please try a different sign-in method.");
        }
      } else if (authError.code === 'auth/popup-closed-by-user') {
        // User closed the popup, no need to show error
        console.log('Login cancelled by user');
      } else if (authError.code === 'auth/cancelled-popup-request') {
        // Multiple popups were opened, no need to show error
        console.log('Login cancelled due to multiple popups');
      } else if (authError.code === 'auth/popup-blocked') {
        toast.error('Login popup was blocked. Please allow popups for this site.');
      } else {
        toast.error('Facebook login failed. Please try again or use a different sign-in method.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email');
      toast.error('Please enter a valid email');
      return;
    }
    
    setLoading(true);
    try {
      const isValid = await validateEmail(email);
      if (!isValid) {
        setLoading(false);
        return;
      }

      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      toast.success("Password reset link sent to your email");
      setResetMode(false); // Return to login mode after successful reset request
    } catch (error) {
      const authError = error as AuthError;
      console.error("Password reset error:", authError);
      if (authError.code === 'auth/user-not-found') {
        toast.error("Please enter a valid email");
      } else {
        toast.error("Failed to send reset link. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = async (email: string) => {
    if (!email) return false;
    
    try {
      // First check if email format is valid
      const validationResponse = await axios.post('/api/validate-email', { email });
      if (!validationResponse.data.isValid) {
        toast.error(validationResponse.data.message);
        return false;
      }

      // Then check if email exists in our system
      const existsResponse = await axios.post('/api/check-email-exists', { email });
      if (!existsResponse.data.exists) {
        toast.error(existsResponse.data.message);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Email validation error:', error);
      toast.error('Error validating email');
      return false;
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden relative bg-gradient-to-b from-blue-950 via-blue-900 to-blue-950 text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/50 via-blue-900/50 to-blue-950/50 z-0" />
      
      <LampContainer className="fixed top-0 left-0 w-full h-full -z-10 opacity-30">
        <div className="h-full w-full bg-transparent"></div>
      </LampContainer>

      <div className="relative z-10 flex-1 flex items-center justify-center p-4">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeIn("up")}
          className="w-full max-w-md"
        >
          <div className="bg-blue-900/80 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-[#3b82f6]">Expense</h1>
              <p className="text-4xl font-bold text-[#3b82f6] mb-4">TRACKER</p>
              <div className="relative h-32 w-32 mx-auto mb-8">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={128}
                  height={128}
                  className="object-contain"
                  priority
                />
        </div>
              <h2 className="text-4xl font-bold bg-gradient-to-br from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Welcome Back
              </h2>
              <p className="text-blue-200 mt-2">
                {resetMode ? 'Enter your registered email' : 'Sign in to continue'}
              </p>
      </div>

            <div className="mb-4">
        <input
          type="email"
                placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                className={`w-full p-3 rounded-lg bg-blue-800/50 border ${
                  emailError ? 'border-red-500' : 'border-blue-400/20'
                } text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
              {emailError && (
                <p className="text-red-400 text-sm mt-1">{emailError}</p>
              )}
            </div>

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
                    <Image
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="google"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
              Sign in with Google
                  </Button>

                  <Button
                    onClick={signInWithFacebook}
                    disabled={loading}
                    className="w-full py-6 rounded-lg text-lg font-semibold bg-[#1877F2] text-white hover:bg-[#1865F2]"
                  >
                    <Image
                      src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                      alt="facebook"
                      width={20}
                      height={20}
                      className="mr-2"
                    />
              Sign in with Facebook
                  </Button>
                </div>
          </>
        )}

            {!resetMode && (
              <p className="text-center mt-6 text-blue-300/70">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-300 hover:text-blue-200 underline">
                  Sign up
                </Link>
              </p>
            )}

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