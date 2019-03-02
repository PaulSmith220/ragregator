import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import GoogleAPIScript from './utils/GoogleAPIScript';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

GoogleAPIScript.Create(() => {
    console.log('injected');
    const { gapi } = window;
    gapi.load('client:auth2', () => {
        console.log('auth2');
    });
});
