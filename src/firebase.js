import firebase from 'firebase/app';
import 'firebase/messaging';

//TODO: ADD YOUR CONFIG HERE
var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

export const getToken = (setTokenFound) => {
    //TODO: add your vapid key - you will find it in project settings -> cloud messaging tab ->
    // WEB Push Certificates at the bottom of the page
    return messaging.getToken({vapidKey: 'ADD YOUR KEY HERE'})
        .then((currentToken) => {
            if (currentToken) {
                console.log('current token for client: ', currentToken);
                setTokenFound(true);
                // Track the token -> client mapping, by sending to backend server
                // show on the UI that permission is secured
            } else {
                console.log('No registration token available. Request permission to generate one.');
                setTokenFound(false);
                // shows on the UI that permission is required
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token. ', err);
            // catch error while creating client token
        });
}

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            console.log('sth')
            resolve(payload);
        });
    });
