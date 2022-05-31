// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxfTSGxvrrFpp_QW58Sio8CGtEISuytb8",
  authDomain: "tweet-back-machine.firebaseapp.com",
  projectId: "tweet-back-machine",
  storageBucket: "tweet-back-machine.appspot.com",
  messagingSenderId: "694195763083",
  appId: "1:694195763083:web:68d4d0e8c4ce470e34618e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
