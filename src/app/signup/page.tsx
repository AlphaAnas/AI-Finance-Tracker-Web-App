'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/app/firebase.js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  const getPasswordStrength = () => {
    if (password.length < 6) return { level: 'Weak', color: 'red' };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 'Medium', color: 'orange' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
      return { level: 'Strong', color: 'green' };
    return { level: 'Medium', color: 'orange' };
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  const handleSignup = async () => {
    if (password !== confirmPassword) return toast.error('Passwords do not match');
    if (!email || !password || !confirmPassword) return toast.error('All fields are required');

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created! Redirecting...');
      setTimeout(() => (window.location.href = '/'), 2000);
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setEmailExists(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        toast.error('Email already exists');
      } else {
        toast.error('Signup failed');
        console.error('Signup error:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#3b82f6]">Expense</h1>
          <p className="text-4xl font-bold text-[#3b82f6] mb-4">TRACKER</p>
          <img src="/logo.png" alt="Logo" className="h-32 mx-auto" />
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-center px-12 py-16">
        <motion.div
          animate={shake ? { x: [0, -10, 10, -10, 10, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-blue-400 p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto"
        >
          <h2 className="text-3xl font-semibold mb-1">Create a new account</h2>
          <p className="mb-6 text-sm">It's quick and easy.</p>

          {/* First Name & Surname */}
          <div className="flex gap-3 mb-3">
            <input type="text" placeholder="First name" className="bg-white text-black p-3 w-full rounded border" />
            <input type="text" placeholder="Surname" className="bg-white text-black p-3 w-full rounded border" />
          </div>

          {/* DOB */}
          <label className="text-white/80 mb-1 block">Date of Birth</label>
          <div className="flex gap-3 mb-3">
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {Array.from({ length: 31 }, (_, i) => <option key={i}>{i + 1}</option>)}
            </select>
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map(m => <option key={m}>{m}</option>)}
            </select>
            <select className="bg-white text-black p-2 rounded w-1/3 border">
              {Array.from({ length: 100 }, (_, i) => <option key={i}>{2025 - i}</option>)}
            </select>
          </div>

          {/* Gender */}
          <label className="text-white/80 mb-1 block">Gender</label>
          <div className="flex gap-6 mb-4">
            {["Female", "Male", "Custom"].map(gender => (
              <label key={gender} className="flex items-center gap-2">
                <input type="radio" name="gender" className="accent-blue-700" />
                {gender}
              </label>
            ))}
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => {
              setEmail(e.target.value);
              setEmailExists(false);
            }}
            className="bg-white text-black p-3 w-full rounded border mb-3"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-white text-black p-3 w-full rounded border mb-1"
          />
          {password && (
            <p className="text-sm mb-2" style={{ color: getPasswordStrength().color }}>
              Strength: {getPasswordStrength().level}
            </p>
          )}

          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="bg-white text-black p-3 w-full rounded border mb-1"
          />
          {confirmPassword && (
            <p className={`text-sm mb-4 ${isPasswordMatch ? 'text-green-200' : 'text-red-200'}`}>
              {isPasswordMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}

          <button
            onClick={handleSignup}
            disabled={emailExists || loading}
            className={`p-3 rounded w-full font-semibold mb-4 ${
              emailExists || loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-white/70 text-center text-sm">
            Already have an account? <a href="/" className="underline">Login here</a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
