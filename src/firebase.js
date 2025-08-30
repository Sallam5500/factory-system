// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ أضف Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIVK_c1CLqoJt5SEwcKVQnWNifuhlNkn0",
  authDomain: "yakout-factory-system-26ab5.firebaseapp.com",
  projectId: "yakout-factory-system-26ab5",
  storageBucket: "yakout-factory-system-26ab5.firebasestorage.app",
  messagingSenderId: "1050542415702",
  appId: "1:1050542415702:web:d9eea9599e28ce6496c0f7",
  measurementId: "G-XD8J7MTLP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Auth
export const auth = getAuth(app);

// ✅ Firestore
export const db = getFirestore(app);
