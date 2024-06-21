// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe7JvF_h1HVFBebTUed1-5SXRoDKs82Uc",
  authDomain: "buildmyproject-46cb1.firebaseapp.com",
  projectId: "buildmyproject-46cb1",
  storageBucket: "buildmyproject-46cb1.appspot.com",
  messagingSenderId: "960191584494",
  appId: "1:960191584494:web:3882053bc9b6647ee57bff"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;