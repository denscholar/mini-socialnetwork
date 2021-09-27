import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyCnxpqQA7w1HeuCSey3YslUzjJmmy3irvE",
    authDomain: "social-media-a5789.firebaseapp.com",
    projectId: "social-media-a5789",
    storageBucket: "social-media-a5789.appspot.com",
    messagingSenderId: "1052691141245",
    appId: "1:1052691141245:web:d667a8f62691e45438d714"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };