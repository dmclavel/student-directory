import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
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
 dsn: process.env.REACT_APP_SENTRY_DSN,
    maxBreadcrumbs: 50,
    debug: true,
    beforeSend (event) {
     if (event.exception)
         sentry.showReportDialog();
     return event;
    }
});

const app = (
    <Router>
        <App />
    </Router>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
