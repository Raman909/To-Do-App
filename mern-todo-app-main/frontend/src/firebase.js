// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPVNquvb98qIpukczzb7lym2N0fofe1A4",
  authDomain: "to-do-app-77fac.firebaseapp.com",
  projectId: "to-do-app-77fac",
  storageBucket: "to-do-app-77fac.firebasestorage.app",
  messagingSenderId: "368560361014",
  appId: "1:368560361014:web:2b05977623bc420e9e5297",
  measurementId: "G-7C2KHFCSP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, app, analytics };