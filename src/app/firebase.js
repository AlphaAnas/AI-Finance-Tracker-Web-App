// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase app only if it hasn't been initialized already
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// Initialize services
const db = getFirestore(app);
const auth = getAuth(app);

// Configure Google Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  access_type: 'offline'
});

// Configure Facebook Provider
const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({
  'display': 'popup',
  'auth_type': 'reauthenticate',
  'return_scopes': 'true'
});

// Add required scopes
facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Configure auth persistence
auth.useDeviceLanguage();

export { db, auth, googleProvider, facebookProvider };