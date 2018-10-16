import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyDJ8qp2D8mupTsTS6zmpGXUeN9BDxMtYdQ",
    authDomain: "balaji-store.firebaseapp.com",
    databaseURL: "https://balaji-store.firebaseio.com",
    projectId: "balaji-store",
    storageBucket: "balaji-store.appspot.com",
    messagingSenderId: "388232322676"
};

firebase.initializeApp(config);
var db = firebase.database();

export var auth = firebase.auth();
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
//     'size': 'invisible',
//     'callback': function (response) {
//         // reCAPTCHA solved, allow signInWithPhoneNumber.
//         // onSignInSubmit();
//         console.log(response);
//     }
// });

export default db;