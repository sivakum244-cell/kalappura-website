// ============================================================================
// FIREBASE CONFIGURATION
// Used for: Push Notifications, Authentication (future), Firestore (future)
//
// Setup:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project or use existing
// 3. Add a Web app
// 4. Copy the config values below
// 5. Enable services you need (Authentication, Cloud Messaging, etc.)
// ============================================================================

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "",
};

// ============================================================================
// FIREBASE INITIALIZATION (uncomment when ready to use)
// Install: npm install firebase
// ============================================================================

/*
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

// Initialize Firebase (singleton)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

// Messaging (only in browser)
export const getMessagingInstance = () => {
  if (typeof window !== "undefined") {
    return getMessaging(app);
  }
  return null;
};

export default app;
*/

// For now, export a placeholder
export default firebaseConfig;
