import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';

var config = {
    apiKey: "your_api_key",
    authDomain: "your_firebase_domain",
    databaseURL: "your_firebase_db_url",
    projectId: "your_firebase_project_id",
    storageBucket: "your_firebase_storage_url",
    messagingSenderId: "your_firebase_messaging_sender_id"
};

firebase.initializeApp(config);
var db = firebase.database();

export var auth = firebase.auth();
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
    'size': 'invisible',
    'callback': function (response) {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        // onSignInSubmit();
        console.log(response);
    }
});

export default db;
export const storage = firebase.storage();