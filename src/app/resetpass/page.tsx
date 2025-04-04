'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from 'src/app/firebase';
import toast from 'react-hot-toast';

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<'enter' | 'options'>('enter');

  const checkEmail = () => {
    if (!email) return toast.error("Enter your email");
    setStage('options');
  };

  const sendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to email");
    } catch {
      toast.error("Failed to send reset email");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="bg-white rounded-xl shadow p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Your Password</h2>

        {stage === 'enter' ? (
          <>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your registered email" className="p-3 w-full border rounded mb-4" />
            <button onClick={checkEmail} className="w-full bg-blue-600 text-white py-2 rounded">Next</button>
          </>
        ) : (
          <>
            <p className="mb-4 text-center">Choose reset method for <strong>{email}</strong></p>
            <button onClick={sendResetEmail} className="w-full bg-blue-500 text-white py-2 rounded mb-3">Reset via Email</button>
            <button onClick={() => toast("OTP via phone not yet active")} className="w-full bg-gray-400 text-white py-2 rounded">Reset via Phone (Coming Soon)</button>
          </>
        )}
      </div>
    </div>
  );
}
