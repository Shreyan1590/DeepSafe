// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUyxrtUDrIdWD0WeZAHCf3ye_rS7RxZLY",
  authDomain: "deepsafe-hack.firebaseapp.com",
  projectId: "deepsafe-hack",
  storageBucket: "deepsafe-hack.appspot.com",
  messagingSenderId: "200519422683",
  appId: "1:200519422683:web:260440dabe47328ca4b2fe",
  measurementId: "G-T06BF2FRR5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
