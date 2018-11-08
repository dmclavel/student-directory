import firebase from 'firebase';

const dotenv = require('dotenv');
dotenv.load();
const config = {
    apiKey: "AIzaSyBgih9qE3yjjZof2baS1NrqkY95Pc-9o3o",
    authDomain: "student-directory-uplb.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: "student-directory-uplb",
    storageBucket: "student-directory-uplb.appspot.com",
    messagingSenderId: "754904258700"
};

const fire = firebase.initializeApp(config);

export default fire;