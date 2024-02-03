// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "itp-project-d4f86.firebaseapp.com",
  projectId: "itp-project-d4f86",
  storageBucket: "itp-project-d4f86.appspot.com",
  messagingSenderId: "833562986860",
  appId: "1:833562986860:web:705a6caa760ab396f10b49"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);