'use client';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState({ day: '', month: '', year: '' });
  const [emailValidation, setEmailValidation] = useState({ isValid: false, message: '', checking: false });
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentDate = new Date();

  const months = [
    { value: 'Jan', label: 'January', days: 31 },
    { value: 'Feb', label: 'February', days: 28 },
    { value: 'Mar', label: 'March', days: 31 },
    { value: 'Apr', label: 'April', days: 30 },
    { value: 'May', label: 'May', days: 31 },
    { value: 'Jun', label: 'June', days: 30 },
    { value: 'Jul', label: 'July', days: 31 },
    { value: 'Aug', label: 'August', days: 31 },
    { value: 'Sep', label: 'September', days: 30 },
    { value: 'Oct', label: 'October', days: 31 },
    { value: 'Nov', label: 'November', days: 30 },
    { value: 'Dec', label: 'December', days: 31 }
  ];

  const getDaysInMonth = (month: string, year: string) => {
    const monthObj = months.find(m => m.value === month);
    if (!monthObj) return [];
    const isLeap = month === 'Feb' && parseInt(year) % 4 === 0;
    const days = isLeap ? 29 : monthObj.days;
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const handleDateChange = (type: 'day' | 'month' | 'year', value: string) => {
    const newDob = { ...dob, [type]: value };

    // If year is selected, check if it's a future year
    if (type === 'year' && value) {
      const selectedYear = parseInt(value);
      const currentYear = currentDate.getFullYear();
      if (selectedYear > currentYear) {
        toast.error('Please select a year in the past');
        return;
      }
    }

    // If month is selected, check if it's a future month for the current year
    if (type === 'month' && value && newDob.year === currentDate.getFullYear().toString()) {
      const selectedMonth = months.findIndex(m => m.value === value);
      const currentMonth = currentDate.getMonth();
      if (selectedMonth > currentMonth) {
        toast.error('Please select a month in the past');
        return;
      }
    }

    // If all date components are selected, validate the complete date
    if (newDob.day && newDob.month && newDob.year) {
      const selectedDate = new Date(
        parseInt(newDob.year),
        months.findIndex(m => m.value === newDob.month),
        parseInt(newDob.day)
      );

      if (selectedDate > currentDate) {
        toast.error('Please select a date in the past');
        return;
      }
    }

    setDob(newDob);
  };

  const getPasswordStrength = () => {
    if (!password) return { level: '', color: '' };
    if (password.length < 6) return { level: 'Weak', color: 'red' };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 'Medium', color: 'orange' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
      return { level: 'Strong', color: 'green' };
    return { level: 'Medium', color: 'orange' };
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  const handleSignup = async () => {
    try {
      // Validate all fields
      if (!firstName.trim() || !surname.trim()) {
        toast.error('Please enter your full name');
        return;
      }

      if (!gender) {
        toast.error('Please select your gender');
        return;
      }

      if (!dob.day || !dob.month || !dob.year) {
        toast.error('Please enter a valid date of birth');
        return;
      }

      if (!email || !emailValidation.isValid) {
        toast.error('Please enter a valid email address');
        return;
      }

      if (!password || password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }

      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      const passwordStrength = getPasswordStrength();
      if (passwordStrength.level === 'Weak') {
        toast.error('Please choose a stronger password');
        return;
      }

      setLoading(true);

      // Create user in Firebase
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save additional user data
      const userData = {
        uid: user.uid,
        email,
        firstName: firstName.trim(),
        surname: surname.trim(),
        dob: `${dob.day} ${dob.month} ${dob.year}`,
        gender,
        createdAt: new Date().toISOString(),
        emailValidated: emailValidation.isValid,
      };

      const response = await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Failed to save user data');
      }

      toast.success('Account created successfully!');
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);

    } catch (error: any) {
      console.error('Signup error:', error);
      
      const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'This email is already registered',
        'auth/invalid-email': 'Invalid email address',
        'auth/weak-password': 'Password is too weak',
      };
      
      const errorMessage = errorMessages[error?.code] || 'Failed to create account. Please try again.';

      if (error.code === 'auth/email-already-in-use') {
        setEmailExists(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const validateEmail = async () => {
      if (!email) {
        setEmailValidation({ isValid: false, message: '', checking: false });
        return;
      }

      setEmailValidation(prev => ({ ...prev, checking: true }));
      
      try {
        const response = await fetch('/api/validate-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setEmailValidation({ ...data, checking: false });
      } catch (error) {
        console.error('Email validation error:', error);
        // Fall back to basic validation
        const basicRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = basicRegex.test(email);
        
        setEmailValidation({ 
          isValid, 
          message: isValid ? 'Email format looks valid (validation service unavailable)' : 'Invalid email format',
          checking: false
        });
      }
    };

    // Debounce email validation to avoid excessive API calls
    const timeoutId = setTimeout(validateEmail, 800);
    return () => clearTimeout(timeoutId);
  }, [email]);

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
            <input 
              type="text" 
              placeholder="First name" 
              value={firstName} 
              onChange={(e) => setFirstName(e.target.value)} 
              className="bg-white text-black p-3 w-full rounded border" 
            />
            <input 
              type="text" 
              placeholder="Surname" 
              value={surname} 
              onChange={(e) => setSurname(e.target.value)} 
              className="bg-white text-black p-3 w-full rounded border" 
            />
          </div>

          {/* DOB */}
          <label className="text-white/80 mb-1 block">Date of Birth</label>
          <div className="flex gap-3 mb-3">
            <select 
              value={dob.day} 
              onChange={(e) => handleDateChange('day', e.target.value)} 
              className="bg-white text-black p-2 rounded w-1/3 border"
            >
              <option value="">Day</option>
              {getDaysInMonth(dob.month, dob.year).map(day => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select 
              value={dob.month} 
              onChange={(e) => handleDateChange('month', e.target.value)} 
              className="bg-white text-black p-2 rounded w-1/3 border"
            >
              <option value="">Month</option>
              {months.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            <select 
              value={dob.year} 
              onChange={(e) => handleDateChange('year', e.target.value)} 
              className="bg-white text-black p-2 rounded w-1/3 border"
            >
              <option value="">Year</option>
              {Array.from({ length: 100 }, (_, i) => (
                <option key={2025 - i} value={2025 - i}>{2025 - i}</option>
              ))}
            </select>
          </div>

          {/* Gender */}
          <label className="text-white/80 mb-1 block">Gender</label>
          <div className="flex gap-6 mb-4">
            {["Female", "Male", "Custom"].map(g => (
              <label key={g} className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="gender" 
                  value={g} 
                  checked={gender === g} 
                  onChange={(e) => setGender(e.target.value)} 
                  className="accent-blue-700" 
                />
                {g}
              </label>
            ))}
          </div>

          {/* Email */}
          <div className="mb-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailExists(false);
              }}
              className="bg-white text-black p-3 w-full rounded border"
            />
            {emailValidation.checking && (
              <p className="text-white/80 text-sm mt-1">Validating email...</p>
            )}
            {!emailValidation.checking && email && emailValidation.message && (
              <p className={`text-sm mt-1 ${emailValidation.isValid ? 'text-green-200' : 'text-red-200'}`}>
                {emailValidation.message}
              </p>
            )}
            {emailExists && (
              <p className="text-red-200 text-sm mt-1">
                This email is already registered. Please use a different email.
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white text-black p-3 w-full rounded border mb-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {password && (
            <p className="text-sm mb-2" style={{ color: getPasswordStrength().color }}>
              Strength: {getPasswordStrength().level}
            </p>
          )}

          <div className="relative mb-3">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-white text-black p-3 w-full rounded border pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {confirmPassword && (
            <p className={`text-sm mb-4 ${isPasswordMatch ? 'text-green-200' : 'text-red-200'}`}>
              {isPasswordMatch ? "Passwords match" : "Passwords do not match"}
            </p>
          )}

          <button
            onClick={handleSignup}
            disabled={!!(emailExists || loading || (email && !emailValidation.isValid && !emailValidation.checking))}
            className={`p-3 rounded w-full font-semibold mb-4 ${
              emailExists || loading || (email && !emailValidation.isValid && !emailValidation.checking) ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>

          <p className="text-white/70 text-center text-sm">
            Already have an account? <a href="/login" className="underline">Login here</a>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}