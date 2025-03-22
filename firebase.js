// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjhDTdiE1UGHfzJdoUkifoPfLnt-rBIVU",
  authDomain: "kingo-auth.firebaseapp.com",
  projectId: "kingo-auth",
  storageBucket: "kingo-auth.appspot.com",
  messagingSenderId: "614152835115",
  appId: "1:614152835115:web:2e8b0b52a3e4d0f4e69a6e",
  measurementId: "G-J16CX025R5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const  auth = getAuth(app)
 export{auth}