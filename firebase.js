import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDOXs-PW3aCEY6c7TOt2l_m8qEPpPsvVqw",
    authDomain: "techronx-otp-example.firebaseapp.com",
    databaseURL: "https://techronx-otp-example.firebaseio.com",
    projectId: "techronx-otp-example",
    storageBucket: "techronx-otp-example.appspot.com",
    messagingSenderId: "316009769706",
    appId: "1:316009769706:web:3f40e00ecbcdc295874593"
}

firebase.initializeApp(config);

export default firebase