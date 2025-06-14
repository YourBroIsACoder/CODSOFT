// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD4ujWHI0ofEmkcCNV6NVJejTJ3y7CHXng",
  authDomain: "e-commerce-32443.firebaseapp.com",
  projectId: "e-commerce-32443",
  storageBucket: "e-commerce-32443.firebasestorage.app",
  messagingSenderId: "419627332666",
  appId: "1:419627332666:web:cb435c6a81ff55a73af103",
  measurementId: "G-3QJH9HYDYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const auth = getAuth(app); 

export { auth }; 