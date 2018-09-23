import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');
const firebase = require('firebase');

// load values from the .env file in this directory into process.env
dotenv.load();

// configure firebase
firebase.initializeApp({
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

const database = firebase.database();

// configure algolia
const algolia = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.REACT_APP_ALGOLIA_API_KEY
);
const index = algolia.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

// Get all students from Firebase
database.ref('/').once('value', studentData => {
    // Build an array of all records to push to Algolia
    const records = [];

    studentData.forEach(student => {
      // get the key and data from the snapshot
      const childKey = student.key;
      const childData = student.val();
      // We set the Algolia objectID as the Firebase .key
      childData.objectID = childKey;
      // Add object for indexing
      records.push(childData);
    });

  
    // Add or update new objects
    index
      .saveObjects(records)
      .then(() => {
        
      })
      .catch(error => {
        console.error('Error when importing student/s into Algolia', error);
      });
  });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
