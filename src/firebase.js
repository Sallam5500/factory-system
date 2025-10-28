// src/firebase.js
import { initializeApp } from "firebase/app";
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
