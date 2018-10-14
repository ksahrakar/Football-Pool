const config = {
    apiKey: "AIzaSyDt5x_pqLf1mnSYcnqvB1Jeti1IV-PUs0g",
    authDomain: "thecatch-d2bff.firebaseapp.com",
    databaseURL: "https://thecatch-d2bff.firebaseio.com",
    projectId: "thecatch-d2bff",
    storageBucket: "thecatch-d2bff.appspot.com",
    messagingSenderId: "555051450877"
};
firebase.initializeApp(config);
// var database = firebase.database();
var auth = firebase.auth();
var showData = false;
var userID;
var uname;

const db = firebase.firestore();

db.settings({ timestampsInSnapshots: true });

$("#login").css("display", "block");
$("#main").css("display", "none");

var errorSection = $(".error");
var btnLogin = $("#loginBtn");
var btnLogout = $("#logoutBtn");

//clicking login button
btnLogin.on("click", function (e) {
    e.preventDefault();
    var x = $(".form-email").val();
    var y = $(".form-password").val();
    if ((x == "") || (y == 0)) {
        $(errorSection).html("<p>Please fill out both email/password to use 'The Catch'.</p>");
    } else {
        var emailTxt = $("#emailInput").val().trim();
        var passwordTxt = $("#passwordInput").val().trim();
        var email = emailTxt;
        uname = emailTxt;
        var pass = passwordTxt;
        var auth = firebase.auth();
        if ($("#createAccount").is(":checked")) {
            //creates a new account with username and password
            // console.log("I checked box");
            auth.createUserWithEmailAndPassword(email, pass).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode == 'auth/weak-password') {
                    $(errorSection).html("<p>The password is too weak.</p>");
                } else if (errorCode == 'auth/email-already-in-use') {
                    $(errorSection).html("<p>The email address is already in use by another account.<p>");
                } else if (errorCode) {
                    console.log(errorCode);
                    console.log(errorMessage);
                } else {
                    showData = true;
                    $(errorSection).empty();
                }
                return showData;
                display();
                console.log("A");
                // [END_EXCLUDE]
            });
            // [END authwithemail]
        } else {
            //console.log("i did not check box");
            //logs in with existing user
            auth.signInWithEmailAndPassword(email, pass).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                // [START_EXCLUDE]
                if (errorCode === 'auth/wrong-password') {
                    $(errorSection).html("<p>Wrong Password</p>");
                } else if (errorCode) {
                    console.log(errorMessage);
                } else {
                    $(errorSection).empty();
                    showData = true;
                    new_user(firebaseUser.uid, uname);
                }
                return showData;
                display();
                console.log("B");
            });
        }
    }
});


//displays data on screen...
function display() {
    if (showdata == true) {
        $("#login").css("display", "none");
        $("#main").css("display", "block");
        console.log("message");

    } else {
        $("#login").css("display", "block");
        $("#main").css("display", "none");
    }
};

// Logout Button
btnLogout.on("click", function (e) {
    e.preventDefault();
    firebase.auth().signOut();
    $(errorSection).empty();
    $("#login").css("display", "block");
    $("#main").css("display", "none");
})


// Listen for change in authentication state

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        console.log(firebaseUser);
        userID = firebaseUser.uid;
        new_user(firebaseUser.uid,uname);
        console.log(userID);
        $("#logoutBtn").css("display", "block");
        $("#login").css("display", "none");
        $("#main").css("display", "block");
    } else {
        console.log("not logged in");
        $("#logoutBtn").css("display", "none");
        $("#login").css("display", "block");
        $("#main").css("display", "none");
    }

    return userID;
});


// console.log(firebase.auth());
// startup();



// Calculate curWeek using "moment" library
function getWeek() {
    var now = moment();
    if (now.isBetween("2018-09-04T00:00:01", "2018-09-10T23:59:59")) { return 1 };
    if (now.isBetween("2018-09-11T00:00:01", "2018-09-17T23:59:59")) { return 2 }
    if (now.isBetween("2018-09-18T00:00:01", "2018-09-24T23:59:59")) { return 3 }
    if (now.isBetween("2018-09-25T00:00:01", "2018-10-01T23:59:59")) { return 4 }
    if (now.isBetween("2018-10-02T00:00:01", "2018-10-08T23:59:59")) { return 5 }
    if (now.isBetween("2018-10-09T00:00:01", "2018-10-15T23:59:59")) { return 6 }
    if (now.isBetween("2018-10-16T00:00:01", "2018-10-22T23:59:59")) { return 7 }
    if (now.isBetween("2018-10-23T00:00:01", "2018-10-29T23:59:59")) { return 8 }
    if (now.isBetween("2018-10-30T00:00:01", "2018-11-05T23:59:59")) { return 9 }
    if (now.isBetween("2018-11-06T00:00:01", "2018-11-12T23:59:59")) { return 10 }
    if (now.isBetween("2018-11-13T00:00:01", "2018-11-19T23:59:59")) { return 11 }
    if (now.isBetween("2018-11-20T00:00:01", "2018-11-26T23:59:59")) { return 12 }
    if (now.isBetween("2018-11-27T00:00:01", "2018-12-03T23:59:59")) { return 13 }
    if (now.isBetween("2018-12-04T00:00:01", "2018-12-10T23:59:59")) { return 14 }
    if (now.isBetween("2018-12-11T00:00:01", "2018-12-17T23:59:59")) { return 15 }
    if (now.isBetween("2018-12-18T00:00:01", "2018-12-24T23:59:59")) { return 16 }
    if (now.isBetween("2018-12-25T00:00:01", "2018-12-31T23:59:59")) { return 17 }
}
curWeek = getWeek();




console.log(firebase.auth());
// startup();


// Calculate weekly scores and overall score
var weeklyScores = [];  //GLOBAL
function totalCalc(){
    for (i=0;i<17;i++){
        if (weeklyScores[i]){
            var ttlScore = 0;
            ttlScore = ttlScore + weeklyScores[i];
            return ttlScore;
        } else {
            return;
        }
    }
}

// Calculate weekly score
function winlossTally(){
    var correct = 0;
    var incorrect = 0;
    var ties = 0;
    var points = 0;

    if (pick == game_winner) {  //pull these from db
        correct++;
        points = points+2;
    }else if (pick == "") { //no pick
        points = points--;
    }else if (pick == "T"){ //tie
        ties++;
        points++;
    } else{  // no points for incorrect pick
        incorrect++;
    }
}

// Harvest weekly totals and put in local variable 
function leaders(){
    db.collection("usr").doc(userID).get().then(function(doc) {
        if(doc.exists) {
            for (i=0;i<17;i++){
                var locWkTot;
                if (i<10){locWkTot="week0"+i+"total"}
                else {locWkTot="week"+i+"total"};
                weeklyScores[i] = doc.user_id.$(locWkTot);
            }        
        };
    console.log(weeklyScores);    
    });
}

leaders();