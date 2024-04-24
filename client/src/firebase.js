// Importing necessary function from the Firebase SDK
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // API key retrieved from environment variables
  authDomain: "interact-auth.firebaseapp.com", // Firebase authentication domain
  projectId: "interact-auth", // Firebase project ID
  storageBucket: "interact-auth.appspot.com", // Firebase storage bucket
  messagingSenderId: "892553369507", // Firebase messaging sender ID
  appId: "1:892553369507:web:e9e9ca686fbf975bf3ac16", // Firebase app ID
};

// Initialize Firebase app with the provided configuration
export const app = initializeApp(firebaseConfig);
