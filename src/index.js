import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// const algoliasearch = require('algoliasearch');
// const firebase = require('firebase/app');
// require('firebase/database');
// require('firebase/auth');
// console.log = function () {};
const dotenv = require('dotenv');
const sentry = require('@sentry/browser');
// const auth = firebase.auth();

// load values from the .env file in this directory into process.env
dotenv.load();
sentry.init({ //calling sentry.init even before the React App is rendered
 dsn: "https://e132f6143b2d4956b4d107e1975a6914@sentry.io/1296134",
    maxBreadcrumbs: 50,
    debug: true,
    beforeSend (event) {
     if (event.exception)
         sentry.showReportDialog();
     return event;
    }
});

// const database = firebase.database();

// // configure algolia
// const algolia = algoliasearch(
//   process.env.REACT_APP_ALGOLIA_APP_ID,
//   process.env.REACT_APP_ALGOLIA_API_KEY
// );
// const index = algolia.initIndex(process.env.REACT_APP_ALGOLIA_INDEX_NAME);

// // Get all students from Firebase
// database.ref('/').once('value', studentData => {
//     // Build an array of all records to push to Algolia
//     const records = [];

//     studentData.forEach(student => {
//       // get the key and data from the snapshot
//       const childKey = student.key;
//       const childData = student.val();
//       // We set the Algolia objectID as the Firebase .key
//       childData.objectID = childKey;
//       // Add object for indexing
//       records.push(childData);
//     });

  
//     // Add or update new objects
//     index
//       .saveObjects(records)
//       .then(() => {
        
//       })
//       .catch(error => {
//         console.error('Error when importing student/s into Algolia', error);
//       });
//   });

// const studentsRef = database.ref('/');
// studentsRef.on('child_added', addOrUpdateIndexRecord);
// studentsRef.on('child_changed', addOrUpdateIndexRecord);
// studentsRef.on('child_removed', deleteIndexRecord);

// function addOrUpdateIndexRecord(student) {
//   // Get Firebase object
//   const record = student.val();
//   // Specify Algolia's objectID using the Firebase object key
//   record.objectID = student.key;
//   // Add or update object
//   index
//     .saveObject(record)
//     .then(() => {
//       // console.log('Firebase object indexed in Algolia', record.objectID);
//     })
//     .catch(error => {
//       console.error('Error when indexing student into Algolia', error);
//       // process.exit(1);
//     });
// }

// function deleteIndexRecord(student) {
//   // Get Algolia's objectID from the Firebase object key
//   const objectID = student.key;
//   // Remove the object from Algolia
//   index
//     .deleteObject(objectID)
//     .then(() => {
//       // console.log('Firebase object deleted from Algolia', objectID);
//     })
//     .catch(error => {
//       console.error('Error when deleting student from Algolia', error);
//       // process.exit(1);
//     });
// }

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
