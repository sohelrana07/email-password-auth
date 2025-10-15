// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// DANGER --- DO NOT SHARE CONFIG IN PUBLIC
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_wvMLFwKlc_7VQSbmog9sofrhF2WaqZc",
  authDomain: "email-password-auth-6ad43.firebaseapp.com",
  projectId: "email-password-auth-6ad43",
  storageBucket: "email-password-auth-6ad43.firebasestorage.app",
  messagingSenderId: "918491127379",
  appId: "1:918491127379:web:16511588ada0603d1b70a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
