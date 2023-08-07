import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC8oXS7QA4XSseYlzmSqUHYXVojK0E_94E",
    authDomain: "memo-care.firebaseapp.com",
    projectId: "memo-care",
    storageBucket: "memo-care.appspot.com",
    messagingSenderId: "864657199343",
    appId: "1:864657199343:web:300c2c440a2039cd204b1a",
    measurementId: "G-LZPBX2HBEX"
  };

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);
