// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC319RpQK6oaZIKnlS9cQhh87fjJcpHWpI",
  authDomain: "intranet-crc-endurance.firebaseapp.com",
  projectId: "intranet-crc-endurance",
  storageBucket: "intranet-crc-endurance.firebasestorage.app",
  messagingSenderId: "184835526293",
  appId: "1:184835526293:web:3cf2ec876c494f91f4d59c",
  measurementId: "G-Q0ZSJCZCLQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app); 