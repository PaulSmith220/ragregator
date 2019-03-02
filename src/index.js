import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GoogleAPIScript from './utils/GoogleAPIScript';
import GoogleDriveAccessRequest from './utils/GoogleDriveAccessRequest';

ReactDOM.render(<App />, document.getElementById('root'));

GoogleAPIScript.Create()
    .then(() => {
        console.log('injected');
        const { gapi } = window;
        gapi.load('client:auth2', () => {
            console.log('auth2');
            GoogleDriveAccessRequest.SignIn(gapi, )
        });
    });
