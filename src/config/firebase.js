import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB9kmcEj0dZQEP6i0STH85UO0jSEetgmdk",
  authDomain: "cloudkitchen-85e9d.firebaseapp.com",
  projectId: "cloudkitchen-85e9d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
