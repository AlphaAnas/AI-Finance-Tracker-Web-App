// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier  } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOTvHTgbe3vCmyOt-JCHy81JV3Qvt6oLA",
  authDomain: "ai-finance-tracker-bfb8b.firebaseapp.com",
  projectId: "ai-finance-tracker-bfb8b",
  storageBucket: "ai-finance-tracker-bfb8b.firebasestorage.app",
  messagingSenderId: "98030943514",
  appId: "1:98030943514:web:0e5fe97a07b3a9414780a3",
  measurementId: "G-BB314VXLP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const db = getFirestore(app);
export const auth = getAuth(app);
export { RecaptchaVerifier };
export { db };