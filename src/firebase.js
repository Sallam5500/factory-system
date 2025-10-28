// src/firebase.js
import { initializeApp } from "firebase/app";
<<<<<<< HEAD
import { getFirestore } from "firebase/firestore";

// إعدادات مشروعك من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA5HiVxwnExc40B04VW37JqgQ60Yy1bDRU",
  authDomain: "yakoot-system.firebaseapp.com",
  projectId: "yakoot-system",
  storageBucket: "yakoot-system.appspot.com",
  messagingSenderId: "579138921153",
  appId: "1:579138921153:web:0d5bbcc0ce627902266a40",
  measurementId: "G-5J2WXWE36H",
};

// ✅ أولًا: تهيئة Firebase
const app = initializeApp(firebaseConfig);

// ✅ ثانيًا: إنشاء اتصال بقاعدة البيانات Firestore
const db = getFirestore(app);

// ✅ ثالثًا: التصدير
export { db, app };
=======
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
>>>>>>> 350325d8e15b32a7db7a380c842fdc5ef847a422
