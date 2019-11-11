$(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyC5A4oZaEJBNyzJdSvX_ST2_pI_-4bXOP4",
        authDomain: "redchan-8d5ab.firebaseapp.com",
        databaseURL: "https://redchan-8d5ab.firebaseio.com",
        projectId: "redchan-8d5ab",
        storageBucket: "redchan-8d5ab.appspot.com",
        messagingSenderId: "575273642415",
        appId: "1:575273642415:web:95ab486312aa6eb4b5e75a"
    };

    var fb = firebase.initializeApp(firebaseConfig);
    var db = firebase.database();

    /*     function isUserEqual(googleUser, firebaseUser) {
            if (firebaseUser) {
                var providerData = firebaseUser.providerData;
                for (var i = 0; i < providerData.length; i++) {
                    if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                        providerData[i].uid === googleUser.getBasicProfile().getId()) {
                        // We don't need to reauth the Firebase connection.
                        return true;
                    }
                }
            }
            return false;
        } */

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            console.log("user is logged in currently" + displayName + email + emailVerified)
            // ...
        } else {
            // User is signed out.
            // ...
            console.log("user ain't logged in jack")
        }
    });
});