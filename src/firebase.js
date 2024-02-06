// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIh1DFeckIGyMjbcHn-BHE8TRpjag2Psc",
  authDomain: "goal-tracker-0001.firebaseapp.com",
  projectId: "goal-tracker-0001",
  storageBucket: "goal-tracker-0001.appspot.com",
  messagingSenderId: "514651992485",
  appId: "1:514651992485:web:a54713f21c07cd1c59384c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
