// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoIzaBa9Uq03BwiCpDbXBfoPKG4xOq-cw",
  authDomain: "covidcard-9ce33.firebaseapp.com",
  projectId: "covidcard-9ce33",
  storageBucket: "covidcard-9ce33.appspot.com",
  messagingSenderId: "718676410532",
  appId: "1:718676410532:web:65cd60e7fbb33ad873a631"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth();

const db = firebase.firestore();

export { auth, db };