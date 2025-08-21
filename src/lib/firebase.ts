
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUyxrtUDrIdWD0WeZAHCf3ye_rS7RxZLY",
  authDomain: "deepsafe-hack.firebaseapp.com",
  projectId: "deepsafe-hack",
  storageBucket: "deepsafe-hack.appspot.com",
  messagingSenderId: "200519422683",
  appId: "1:200519422683:web:260440dabe47328ca4b2fe",
  measurementId: "G-T06BF2FRR5"
};

// Initialize Firebase for SSR and client-side
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize Analytics only on the client side
if (typeof window !== 'undefined') {
    getAnalytics(app);
}

export { app, auth, db };
