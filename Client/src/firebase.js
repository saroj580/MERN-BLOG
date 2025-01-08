// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-a6f3f.firebaseapp.com",
  projectId: "mern-blog-a6f3f",
  storageBucket: "mern-blog-a6f3f.firebasestorage.app",
  messagingSenderId: "1006745058060",
  appId: "1:1006745058060:web:9d5a07ecb8dd62de1f2729"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);