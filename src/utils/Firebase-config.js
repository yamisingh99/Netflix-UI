
import {getAuth} from "firebase/auth";
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCxhmTpdtWybejYaDN8iqIB9Davr4p1Ntk",
  authDomain: "signup-form-f69d8.firebaseapp.com",
  projectId: "signup-form-f69d8",
  storageBucket: "signup-form-f69d8.appspot.com",
  messagingSenderId: "130381217731",
  appId: "1:130381217731:web:4085ebc91fe771ffde0776"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export {app,auth};