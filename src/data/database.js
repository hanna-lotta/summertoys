// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdZO9Pe_DdLl20y7GSVjY0UfecGNxrhY0",
  authDomain: "toysapp-79ba4.firebaseapp.com",
  projectId: "toysapp-79ba4",
  storageBucket: "toysapp-79ba4.firebasestorage.app",
  messagingSenderId: "953986407195",
  appId: "1:953986407195:web:a876fff89933cf155691be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }