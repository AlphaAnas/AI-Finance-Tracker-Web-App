// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };