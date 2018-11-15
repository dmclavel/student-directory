import firebase from 'firebase';

const dotenv = require('dotenv');
dotenv.load();
const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "student-directory-uplb.firebaseapp.com",
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

const fire = firebase.initializeApp(config);

export default fire;