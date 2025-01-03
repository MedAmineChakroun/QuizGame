// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import getAuth

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbP5MZgo-1dcE8L-wrXvnRGAGa7MapieM",
  authDomain: "quizgame-b5036.firebaseapp.com",
  projectId: "quizgame-b5036",
  storageBucket: "quizgame-b5036.appspot.com", // Corrected the typo here
  messagingSenderId: "357172790041",
  appId: "1:357172790041:web:b080962a5985d9ada3bb88",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Export Firebase Auth instance
export const auth = getAuth(app);
