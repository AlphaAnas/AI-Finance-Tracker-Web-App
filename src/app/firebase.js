// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.FIREBASE_DATABASE_URL // Use the admin database URL
};

// Initialize Firebase app only if it hasn't been initialized already
let app;
try {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('✅ Firebase client initialized successfully');
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

// Configure Facebook Provider with enhanced error handling
const facebookProvider = new FacebookAuthProvider();
try {
  facebookProvider.setCustomParameters({
    'display': 'popup',
    'auth_type': 'rerequest', // Changed from reauthenticate to rerequest for better UX
    'return_scopes': 'true'
  });

  // Add required scopes with error handling
  const requiredScopes = ['email', 'public_profile'];
  requiredScopes.forEach(scope => {
    try {
      facebookProvider.addScope(scope);
    } catch (error) {
      console.error(`Failed to add scope ${scope}:`, error);
    }
  });
} catch (error) {
  console.error("Error configuring Facebook provider:", error);
}

// Configure auth persistence
auth.useDeviceLanguage();

export { db, auth, googleProvider, facebookProvider };