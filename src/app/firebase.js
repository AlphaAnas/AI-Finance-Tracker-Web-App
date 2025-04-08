// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };
const firebaseConfig = {
  apiKey: "AIzaSyDOTvHTgbe3vCmyOt-JCHy81JV3Qvt6oLA",
  authDomain: "ai-finance-tracker-bfb8b.firebaseapp.com",
  databaseURL: "https://ai-finance-tracker-bfb8b-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ai-finance-tracker-bfb8b",
  storageBucket: "ai-finance-tracker-bfb8b.firebasestorage.app",
  messagingSenderId: "98030943514",
  appId: "1:98030943514:web:0e5fe97a07b3a9414780a3",
  measurementId: "G-BB314VXLP6"
};


// Initialize Firebase app only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };