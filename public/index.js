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

    function getCookie(name) {
        var re = new RegExp(name + "=([^;]+)");
        var value = re.exec(document.cookie);
        return (value != null) ? unescape(value[1]) : null;
    }

    function authenticate() {
        firebase.auth().currentUser.getIdToken(true)
            .then(function (idToken) {
                //write this token to a cookie so that we can reuse it later
                document.cookie = "token=" + idToken + ";path=/"
            })
            .catch(function (error) {
                console.log("error getting id token")
            });
        //getCookie("token")
        fetch("/login", {
            method: "POST",
            body: JSON.stringify({ token: getCookie("token") }),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(response => response.text())
            .then(result => {
                document.getElementById('loginNotice').innerText = ("Logged in as: " + JSON.parse(result)["userEmail"])
                //console.log(result)
                //alert("Logged in as: " + JSON.parse(result).userEmail + "!")
            });
    }

    //detect initial auth state
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("User logged in, running authenticate()");
            setTimeout(authenticate, 1000);

            //authenticate();
        } else {
            console.log('user not signed (onAuthStateChanged)');
        }
    });
    
});