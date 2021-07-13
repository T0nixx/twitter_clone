import firebase from "firebase/app";
import "firebase/firestore";
import firebaseConfig from "./firebase_config";

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
