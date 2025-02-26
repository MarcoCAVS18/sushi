// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoTaM61c99qviyZw1jO6tItK2mqSob3wM",
  authDomain: "sushi-63bd6.firebaseapp.com",
  projectId: "sushi-63bd6",
  storageBucket: "sushi-63bd6.firebasestorage.app",
  messagingSenderId: "543425094752",
  appId: "1:543425094752:web:8e3e58011de94f346e0f05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };