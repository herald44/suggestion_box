import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCNSZ0DpuYWoro8wra1M8dtItJFAZ0RBAA",

  authDomain: "suggestion-app-789f2.firebaseapp.com",

  projectId: "suggestion-app-789f2",

  storageBucket: "suggestion-app-789f2.appspot.com",

  messagingSenderId: "1097150865632",

  appId: "1:1097150865632:web:a0c36f8ceb12ff9ed97085",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
