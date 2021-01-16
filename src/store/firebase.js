import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/database"
const firebaseConfig = {
    apiKey: "AIzaSyCZhv1sGh4_Tjn9G97bfCisUquDY15K58U",
    authDomain: "cooktionary-33dda.firebaseapp.com",
    projectId: "cooktionary-33dda",
    storageBucket: "cooktionary-33dda.appspot.com",
    messagingSenderId: "541423997366",
    appId: "1:541423997366:web:faec8ddc31224a887e7117"
  };
  firebase.initializeApp(firebaseConfig)
export const provider = new firebase.auth.GoogleAuthProvider();  
export const authh = firebase.auth()
export const database = firebase.database()