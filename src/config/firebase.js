// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBV3_oboBT8fudBA5xv5p4wNSiUAlTaGV4",
  authDomain: "insurance-domain-a4f74.firebaseapp.com",
  projectId: "insurance-domain-a4f74",
  storageBucket: "insurance-domain-a4f74.appspot.com",
  messagingSenderId: "821282447952",
  appId: "1:821282447952:web:d435ce2552ad2a3ffba755"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider };