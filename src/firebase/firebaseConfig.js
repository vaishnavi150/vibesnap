import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB1811cSMnjniIl8S-e5qm0P3ovLKo2yw8",
  authDomain: "vibesnap-788b9.firebaseapp.com",
  projectId: "vibesnap-788b9",
  storageBucket: "vibesnap-788b9.firebasestorage.app",
  messagingSenderId: "875286180565",
  appId: "1:875286180565:web:ccdb2610a6443038a2a85c",
  measurementId: "G-92H760SB0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export {auth}

