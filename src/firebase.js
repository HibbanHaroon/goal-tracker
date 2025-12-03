// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { IS_DEV } from "./constants";

/**
 * For signInWithRedirect to work on Vercel:
 * - In development: use Firebase's default authDomain
 * - In production: use the current domain (Vercel) so redirects go through our proxy
 */
const getAuthDomain = () => {
  if (IS_DEV) {
    return process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
  }
  // In production, use the current hostname for redirect to work through Vercel proxy
  return window.location.hostname;
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: getAuthDomain(),
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
