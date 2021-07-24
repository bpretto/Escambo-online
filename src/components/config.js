import firebase from "firebase";

// sua configuração do Firebase
const app = {
  apiKey: "AIzaSyBBGMEZ2qiyDNvvmi8xGPkEG4Jn-hqtyQE",
    authDomain: "escambo-403d8.firebaseapp.com",
    databaseURL: "https://escambo-403d8-default-rtdb.firebaseio.com",
    projectId: "escambo-403d8",
    storageBucket: "escambo-403d8.appspot.com",
    messagingSenderId: "893469130304",
    appId: "1:893469130304:web:4571aab291261cb991e9a5",
    measurementId: "G-87MRSN3WC5"
};

firebase.initializeApp(app)

export default app;
