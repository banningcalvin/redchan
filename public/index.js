$(function () {
    // Your web app's Firebase configuration
    var firebase = require('firebase');

    var firebaseConfig = {
        apiKey: "AIzaSyC5A4oZaEJBNyzJdSvX_ST2_pI_-4bXOP4",
        authDomain: "redchan-8d5ab.firebaseapp.com",
        databaseURL: "https://redchan-8d5ab.firebaseio.com",
        projectId: "redchan-8d5ab",
        storageBucket: "redchan-8d5ab.appspot.com",
        messagingSenderId: "575273642415",
        appId: "1:575273642415:web:95ab486312aa6eb4b5e75a"
    };
    // Initialize Firebase
    var app = firebase.initializeApp(firebaseConfig);


    $("#nav").load("nav.html");

    
});