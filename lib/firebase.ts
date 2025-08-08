import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Your Firebase configuration
// Replace these with your actual Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyBkN7OnLAzJjza15OEtRLNY5AeYmVEmUIo",
  authDomain: "vasello-a471e.firebaseapp.com",
  projectId: "vasello-a471e",
  storageBucket: "vasello-a471e.firebasestorage.app",
  messagingSenderId: "511606878288",
  appId: "1:511606878288:web:acdf30b7be42c0349a6155",
};

// Firebase configuration loaded successfully

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Connect to emulators in development
// Temporarily disabled - using real Firebase services
// if (process.env.NODE_ENV === 'development') {
//   try {
//     connectAuthEmulator(auth, 'http://localhost:9099');
//     connectFirestoreEmulator(db, 'localhost', 8080);
//   } catch (error) {
//     console.log('Emulators already connected');
//   }
// }

export default app; 