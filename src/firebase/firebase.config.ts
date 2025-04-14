// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBbqCEe3QfX7sNoaigoaOKRCGbpbcbIMw",
  authDomain: "vazifa-uchunusercrud.firebaseapp.com",
  projectId: "vazifa-uchunusercrud",
  storageBucket: "vazifa-uchunusercrud.firebasestorage.app",
  messagingSenderId: "746952975940",
  appId: "1:746952975940:web:0286784fb01d3d8b30fe11",
  databaseURL: "https://vazifa-uchunusercrud-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const database = getDatabase(app);
