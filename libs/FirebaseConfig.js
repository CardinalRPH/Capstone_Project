// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import dotenv from 'dotenv'
dotenv.config()
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.SDK_API_KEY,
  authDomain: process.env.SDK_AUTH_DOMAIN,
  projectId: process.env.SDK_PROJECT_ID,
  storageBucket: process.env.SDK_STORAGE_BUCKET,
  messagingSenderId: process.env.SDK_MESSAGING_SENDER_ID,
  appId: process.env.SDK_APP_ID,
  measurementId: process.env.SDK_MEASUREMENT_ID
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;