// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, FacebookAuthProvider, TwitterAuthProvider, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDzveThafpvC5UJrcyzrlIzkUNyOp4m3rs",
  authDomain: "blog-website-b3ce7.firebaseapp.com",
  projectId: "blog-website-b3ce7",
  storageBucket: "blog-website-b3ce7.appspot.com",
  messagingSenderId: "190014673396",
  appId: "1:190014673396:web:67fcb3e45d9aa9d13aa9a1",
  measurementId: "G-P3B60YZ248"
};
const app = initializeApp(firebaseConfig);
export  const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const facebookProvider = new FacebookAuthProvider();
export const twitterProvider = new TwitterAuthProvider();
export const googleProvider = new GoogleAuthProvider();


