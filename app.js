const express = require('express');
const http = require('http')
const app = express();
const firebase = require('firebase')
const port = 3000;

var server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

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
var fb = firebase.initializeApp(firebaseConfig);
var database = firebase.database();

//homepage
app.get('/', function (req, res) {
    res.render('pages/index');
});

//loginpage
app.get('/login', function (req, res) {
    res.render('pages/login');
});

//logout
app.get('/logout', function (req, res) {
    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
    signOut();
});

//go to a specific board
app.get("/board/:board", function (req, res) {
    firebase.database().ref('/board/' + req.params.board).once('value').then(function (snapshot) {
        //console.log(snapshot.val())
        //res.send(`get /board/${req.params.board} ${snapshot.val()}`);
        let data = snapshot.val()
        res.render('pages/board', {
            title: "/" + req.params.board + "/ - " + data.title,
            description: data.description,
            posts: data.posts
        })
    });
});

app.get('/*', function (req, res) {
    res.render('pages/404');
});


app.listen(port, "localhost")