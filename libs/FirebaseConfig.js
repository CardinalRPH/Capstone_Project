// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBngcFu2IOrXBNZudezuETxA5Ztr9Gk-I4",
  authDomain: "cropplanner-4f93b.firebaseapp.com",
  projectId: "cropplanner-4f93b",
  storageBucket: "cropplanner-4f93b.appspot.com",
  messagingSenderId: "26539706014",
  appId: "1:26539706014:web:70bfe584e6a427b0825d8f",
  measurementId: "G-XT8XG8TKED"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;