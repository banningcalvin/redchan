const express = require('express');
const http = require('http')
const app = express();
const firebase = require('firebase')
const bodyParser = require('body-parser');
const port = 3000;

var server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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

//go to a specific board
app.get("/board/:board", function (req, res) {
    firebase.database().ref('/board/' + req.params.board).once('value').then(function (snapshot) {
        let data = snapshot.val()
        res.render('pages/board', {
            title: "/" + req.params.board + "/ - " + data.title,
            description: data.description,
            posts: data.posts,
            board: req.params.board
        })
    });
});

app.get('/*', function (req, res) {
    res.render('pages/404');
});

/*****************************************************************************/

//set the api token for auth
app.post('/login', function (req, res) {
    if (req.body.token) {
        var credential = firebase.auth.GoogleAuthProvider.credential(req.body.token);
        firebase.auth().signInWithCredential(credential).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            var errorEmail = error.email;
            var errorCredential = error.credential;
            console.log("Error encountered line66: " + errorCode); //+ "\n" + errorEmail + "\n" + errorMessage + "\n" + errorCredential);
        }).then(
            console.log("current: " + firebase.auth().currentUser.email)
        );

        res.json({ tokenReceived: true, userEmail: firebase.auth().currentUser.email })
    } else {
        res.json({ tokenReceived: false })
    }
});

//logout function, 
app.post('/logout', function (req, res) {
    firebase.auth().signOut();
});

//new threads
app.post('/newThread', function (req, res) {
    backURL=req.header('Referer') || '/';
    //redirect user back
    res.redirect(backURL);

    //console.log(req.body.title)
    //console.log(req.body.content)
    //console.log(req.body.board)
    //console.log(req.body)

    setTimeout((a) => console.log('timeout')
        , 3000);

    var credential = firebase.auth.GoogleAuthProvider.credential(req.body.token);
    firebase.auth().signInWithCredential(credential).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var errorEmail = error.email;
        var errorCredential = error.credential;
        console.log("Error newthread: " + errorCode + "\n" + errorEmail + "\n" + errorMessage + "\n" + errorCredential);
    }).then(
        firebase.database().ref('board/' + req.body.board +'/posts/').push({
            title: req.body.title,
            content: req.body.content,
            replies: [],
            user: firebase.auth().currentUser.email,
            votes: 1
        })
    );
});

//new threads
app.post('/newReply', function (req, res) {
    backURL=req.header('Referer') || '/';
    //redirect user back
    res.redirect(backURL);

    //console.log(req.body.post)
    //console.log(req.body.content)
    //console.log(req.body.board)
    //console.log(req.body)

    setTimeout((a) => console.log('timeout')
        , 3000);

    var credential = firebase.auth.GoogleAuthProvider.credential(req.body.token);
    firebase.auth().signInWithCredential(credential).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var errorEmail = error.email;
        var errorCredential = error.credential;
        console.log("Error newreply: " + errorCode + "\n" + errorEmail + "\n" + errorMessage + "\n" + errorCredential);
    }).then(
        firebase.database().ref('board/' + req.body.board + '/posts/' + req.body.post + '/replies/').push({
            content: req.body.content,
            replies: [],
            user: firebase.auth().currentUser.email,
            votes: 1
        })
    );
});

app.listen(port, "localhost")