'use client';

<<<<<<< Updated upstream
export default function Signup() {
=======
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from 'src/app/firebase.js'; // Import Firestore for saving data
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [dob, setDob] = useState('');
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
    // Check for future date for DOB
    const selectedDate = new Date(dob);
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      toast.error('Date of birth cannot be in the future');
      return;
    }

    if (password !== confirmPassword) return toast.error('Passwords do not match');
    if (!email || !password || !confirmPassword || !phone || !location || !dob) return toast.error('All fields are required');

    setLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Account created! Redirecting...');

      // Save additional details in Firestore
      const userRef = doc(db, "users", userCredential.user.uid); // Create a document for the user
      await setDoc(userRef, {
        fullName: `${email}`,
        email: email,
        phone: phone,
        location: location,
        dob: dob,
      });

      setTimeout(() => (window.location.href = '/'), 2000); // line changed
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

>>>>>>> Stashed changes
  return (
    <div className="flex min-h-screen">
      {/* Logo Section */}
      <div className="flex-1 bg-white flex items-center justify-center">
        <div className="flex flex-col items-center text-center">
          <h1 className="text-4xl font-bold text-[#3b82f6] mb-1">Expense</h1>
          <p className="text-4xl font-bold text-[#3b82f6] mb-4">TRACKER</p>
          <img src="/logo.png" alt="Logo" className="h-32" />
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="flex-1 bg-blue-500 text-white flex flex-col justify-center px-12 py-16">
        <div className="bg-blue-400 p-8 rounded-xl shadow-lg w-full max-w-xl mx-auto">
          <h2 className="text-3xl font-semibold mb-1">Create a new account</h2>
          <p className="mb-6 text-sm">It's quick and easy.</p>

          <div className="flex gap-3 mb-3">
            <input type="text" placeholder="First name" className="bg-white text-black p-3 w-full rounded border" />
            <input type="text" placeholder="Surname" className="bg-white text-black p-3 w-full rounded border" />
          </div>

          <label className="text-white/80 mb-1 block">Date of Birth</label>
          <div className="flex gap-3 mb-3">
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              max={new Date().toISOString().split("T")[0]} // Prevent future dates
              className="bg-white text-black p-2 rounded w-1/3 border"
            />
          </div>

<<<<<<< Updated upstream
=======
          {/* Phone Number */}
          <input
            type="text"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="bg-white text-black p-3 w-full rounded border mb-3"
          />

          {/* Location */}
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="bg-white text-black p-3 w-full rounded border mb-3"
          />

          {/* Gender */}
>>>>>>> Stashed changes
          <label className="text-white/80 mb-1 block">Gender</label>
          <div className="flex gap-6 mb-4">
            {["Female", "Male", "Custom"].map(gender => (
              <label key={gender} className="flex items-center gap-2">
                <input type="radio" name="gender" className="accent-blue-700" />
                {gender}
              </label>
            ))}
          </div>

          <input
            type="email"
            placeholder="Mobile number or email"
            className="bg-white text-black p-3 w-full rounded border mb-3"
          />
          <input
            type="password"
            placeholder="New password"
            className="bg-white text-black p-3 w-full rounded border mb-5"
          />

          <button className="bg-green-600 hover:bg-green-700 p-3 rounded w-full text-white font-semibold mb-4">
            Sign Up
          </button>

          <p className="text-white/70 text-center text-sm">
            Already have an account? <a href="/" className="underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
}
