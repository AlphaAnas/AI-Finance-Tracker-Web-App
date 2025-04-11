'use client';

import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'src/app/firebase.js';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Calendar } from 'lucide-react';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [dob, setDob] = useState({ day: '1', month: 'Jan', year: '2000' });
  const [gender, setGender] = useState('');
  const [emailExists, setEmailExists] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [emailValidation, setEmailValidation] = useState({ isValid: false, message: '' });
  const [isValidating, setIsValidating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Get current date for date validation
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // Generate years array (from current year to 100 years ago)
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  
  // Generate months array
  const months = [
    { value: 'Jan', days: 31 },
    { value: 'Feb', days: 28 },
    { value: 'Mar', days: 31 },
    { value: 'Apr', days: 30 },
    { value: 'May', days: 31 },
    { value: 'Jun', days: 30 },
    { value: 'Jul', days: 31 },
    { value: 'Aug', days: 31 },
    { value: 'Sep', days: 30 },
    { value: 'Oct', days: 31 },
    { value: 'Nov', days: 30 },
    { value: 'Dec', days: 31 }
  ];

  // Update days based on selected month and year
  const getDaysInMonth = (month: string, year: string) => {
    const monthIndex = months.findIndex(m => m.value === month);
    const isLeapYear = parseInt(year) % 4 === 0;
    const days = month === 'Feb' && isLeapYear ? 29 : months[monthIndex].days;
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  // Email validation effect
  useEffect(() => {
    const validateEmail = async () => {
      if (!email) {
        setEmailValidation({ isValid: false, message: '' });
        return;
      }

      setIsValidating(true);
      try {
        const response = await fetch('/api/validate-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        setEmailValidation(data);
      } catch (error) {
        console.error('Email validation error:', error);
        setEmailValidation({ 
          isValid: false, 
          message: 'Error validating email' 
        });
      } finally {
        setIsValidating(false);
      }
    };

    // Debounce the validation
    const timeoutId = setTimeout(validateEmail, 500);
    return () => clearTimeout(timeoutId);
  }, [email]);

  const getPasswordStrength = () => {
    if (password.length < 6) return { level: 'Weak', color: 'red' };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { level: 'Medium', color: 'orange' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password) && /[^A-Za-z0-9]/.test(password))
      return { level: 'Strong', color: 'green' };
    return { level: 'Medium', color: 'orange' };
  };

  const isPasswordMatch = password && confirmPassword && password === confirmPassword;

  const handleDateChange = (type: 'day' | 'month' | 'year', value: string) => {
    const newDob = { ...dob, [type]: value };
    
    // Validate date
    const selectedDate = new Date(
      parseInt(newDob.year),
      months.findIndex(m => m.value === newDob.month),
      parseInt(newDob.day)
    );

    if (selectedDate > currentDate) {
      toast.error('Please select a date in the past');
      return;
    }

    setDob(newDob);
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!email || !password || !confirmPassword || !firstName || !surname || !gender) {
      toast.error('All fields are required');
      return;
    }
    if (!emailValidation.isValid) {
      toast.error(emailValidation.message || 'Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await fetch('/api/save-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          email,
          firstName,
          surname,
          dob: `${dob.day} ${dob.month} ${dob.year}`,
          gender,
          createdAt: new Date().toISOString(),
        }),
      });

      toast.success('Account created! Redirecting...');
      setTimeout(() => (window.location.href = '/login'), 2000);
    } catch (error: any) {
      console.error('Signup error:', error);
      if (error.code === 'auth/email-already-in-use') {
        setEmailExists(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
        toast.error('Email already exists');
      } else {
        toast.error('Signup failed');
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
          <div className="relative mb-4">
            <label className="text-white/80 mb-1 block">Date of Birth</label>
            <div 
              className="flex items-center gap-2 bg-white text-black p-3 rounded border cursor-pointer"
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <Calendar className="w-5 h-5 text-blue-500" />
              <span>{`${dob.day} ${dob.month} ${dob.year}`}</span>
            </div>
            
            {showDatePicker && (
              <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-lg w-full">
                <div className="flex gap-2 mb-2">
                  <select 
                    value={dob.day}
                    onChange={(e) => handleDateChange('day', e.target.value)}
                    className="bg-white text-black p-2 rounded w-1/3 border"
                  >
                    {getDaysInMonth(dob.month, dob.year).map(day => (
                      <option key={day} value={day}>{day}</option>
                    ))}
                  </select>
                  <select 
                    value={dob.month}
                    onChange={(e) => handleDateChange('month', e.target.value)}
                    className="bg-white text-black p-2 rounded w-1/3 border"
                  >
                    {months.map(month => (
                      <option key={month.value} value={month.value}>{month.value}</option>
                    ))}
                  </select>
                  <select 
                    value={dob.year}
                    onChange={(e) => handleDateChange('year', e.target.value)}
                    className="bg-white text-black p-2 rounded w-1/3 border"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={() => setShowDatePicker(false)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                  Done
                </button>
              </div>
            )}
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
              onChange={e => {
                setEmail(e.target.value);
                setEmailExists(false);
              }}
              className={`bg-white text-black p-3 w-full rounded border ${
                email && !emailValidation.isValid ? 'border-red-500' : ''
              }`}
            />
            {isValidating && (
              <p className="text-sm mt-1 text-white/70">Validating email...</p>
            )}
            {email && !isValidating && emailValidation.message && (
              <p className={`text-sm mt-1 ${
                emailValidation.isValid ? 'text-green-200' : 'text-red-200'
              }`}>
                {emailValidation.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="bg-white text-black p-3 w-full rounded border pr-10"
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
              onChange={e => setConfirmPassword(e.target.value)}
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
            disabled={emailExists || loading || !emailValidation.isValid}
            className={`p-3 rounded w-full font-semibold mb-4 ${
              emailExists || loading || !emailValidation.isValid ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
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
