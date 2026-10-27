/**
 * @file config.js
 * @description StayFinder Firebase Client Configuration Module.
 * Initializes Firebase App, Firebase Authentication, Cloud Firestore, and Firebase Storage.
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "[GCP_API_KEY]",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Check if a real, non-placeholder API key is configured
export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== "[GCP_API_KEY]" &&
  firebaseConfig.apiKey.length > 10 &&
  firebaseConfig.projectId
);

let app = null;
let auth = null;
let db = null;
let storage = null;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  if (isFirebaseConfigured) {
    console.info("[StayFinder Firebase] Connected to project:", firebaseConfig.projectId);
  } else {
    console.info("[StayFinder Firebase] Initialized with demo fallback (Add valid GCP API key to .env for live cloud sync).");
  }
} catch (error) {
  console.warn("[StayFinder Firebase] Initialization note:", error.message);
}

export { app, auth, db, storage };
export default app;
