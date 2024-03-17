const firebase = require('firebase-admin');
const key = require('../firebaseKey.json');

const initiateDBConnection = async() => {
    try{
        firebase.initializeApp({credential: firebase.credential.cert(key)});
        console.log('Connected to firebase DB.');
    }catch(error) {
        console.log(error);
    }
};

module.exports = initiateDBConnection;