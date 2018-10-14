var radio_arry = [];
var totalScore;

db.collection("season2018").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderList(doc);
    })
})

//global vars
var pickTeamsList = $("#pickTeams");
var divEmpty;


//create elements and render list with buttons
function renderList(doc) {
    var status = (doc.data().week_status);
    var div = $("<div>");
    var name = $("<span>");
    var button = $("<button>");

    div.attr("class", doc.id);
    button.attr("name", status);
    button.attr("class", "pickButton");
    button.attr("id", doc.id);
    button.text("Make your picks!")

    name.text(doc.id);

    div.append(name);
    div.append(button);
    div.append("<hr>");

    pickTeamsList.append(div);
}

//on PICK TEAMS button it will empty and display 

$("#pickTeams").on("click", ".pickButton", function () {
    status = $(this).attr("name");
    var weekDoc = $(this).attr("id");
    radio_arry = [];
    db.collection("season2018").doc(weekDoc).collection(weekDoc).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            renderPicks(doc.data());
        })
    })
    console.log(radio_arry);
    divEmpty = weekDoc;
    $("." + divEmpty).empty();
    setTimeout(addButton, 500);
})


function renderPicks(doc) {
    var div = $("<div>");
    var titlep = $("<p>");
    var title = doc.game_number;
    var gameNames = $("<p>");
    var homeName = doc.game_home_name;
    var awayName = doc.game_away_name;
    var home = $("<img src=./assets/images/" + doc.game_home_alias + ".gif>");
    var away = $("<img src=./assets/images/" + doc.game_away_alias + ".gif>");
    var hAbv = teamRecord[doc.game_home_alias].record;
    var aAbv = teamRecord[doc.game_away_alias].record;
    var records = $("<p>");


    home.attr("class", doc.game_number);
    away.attr("class", doc.game_number);
    home.attr("id", doc.game_home_alias);
    away.attr("id", doc.game_away_alias);

    titlep.html("<h2>GAME #" + title + "</h2>")
    gameNames.html("<h3>" + awayName + " <em>VS</em> " + homeName + "</h3>");
    div.attr("class", "newSection");
    records.html("<h4> Record: " + aAbv + "   |   Record: " + hAbv + "</h4>");

    // add radio buttons for user to pick winning team
    if (status === "open") {
        var game_id = "";

        if (doc.game_number < 10) {
            game_id = "game0" + doc.game_number;
        }
        else {
            game_id = "game" + doc.game_number;
        }

        radio_arry.push(game_id);

        var usr_picks = $("<div>");
        usr_picks.addClass("game" + doc.game_number + "pick");

        var pck_in_a = $("<input>");
        pck_in_a.attr("type", "radio");
        pck_in_a.attr("name", game_id);
        pck_in_a.attr("id", doc.game_away_alias);

        var pck_lbl_a = $("<label>");

        pck_lbl_a.attr("for", game_id);
        pck_lbl_a.html("<h4>" + doc.game_away_name + "</h4>");


        var pck_in_b = $("<input>");
        pck_in_b.attr("type", "radio");
        pck_in_b.attr("name", game_id);
        pck_in_b.attr("id", doc.game_home_alias);

        var pck_lbl_b = $("<label>");

        pck_lbl_b.attr("for", game_id);
        pck_lbl_b.html("<h4>" + doc.game_home_name + "</h4>");

        usr_picks.append(pck_in_a, pck_lbl_a, pck_in_b, pck_lbl_b);

    } else {
        var usr_picks = $("<div>");
        usr_picks.text("Week is over you cannot make picks.")
    }



    //start display
    div.append(titlep);
    div.append(away);
    div.append(home);
    div.append(gameNames);
    div.append(records);


    //add odds
    var week = divEmpty;

    if (week === "week01") { week = 1 };
    if (week === "week02") { week = 2 };
    if (week === "week03") { week = 3 };
    if (week === "week04") { week = 4 };
    if (week === "week05") { week = 5 };
    if (week === "week06") { week = 6 };
    if (week === "week07") { week = 7 };
    if (week === "week08") { week = 8 };
    if (week === "week09") { week = 9 };
    if (week === "week10") { week = 10 };
    if (week === "week11") { week = 11 };
    if (week === "week12") { week = 12 };
    if (week === "week13") { week = 13 };
    if (week === "week14") { week = 14 };
    if (week === "week15") { week = 15 };
    if (week === "week16") { week = 16 };
    if (week === "week17") { week = 17 };


    if (curWeek == week) {

        if ((wkGameOdds[doc.game_home_alias] == undefined) || (wkGameOdds[doc.game_away_alias] === undefined)) {
            var odds = $("<p>");
            odds.html("<h4>No Odds</h4>");
            div.append(odds);
        } else {
            var hOdds = wkGameOdds[doc.game_home_alias].odds;
            var aOdds = wkGameOdds[doc.game_away_alias].odds;

            var odds = $("<p>");
            odds.html("<h4> Odds: " + hOdds + "   |   Odds: " + aOdds + "</h4>");
            div.append(odds);
        }

    }

    div.append(usr_picks);
    $("." + divEmpty).append(div);
}


function addButton() {
    var button = $("<button>").text("Submit Picks");
    button.attr("class", divEmpty);
    button.attr("id", "submit");
    $("." + divEmpty).append(button);
    $("." + divEmpty).css("margin-bottom", "70px");
}



$("#pickTeams").on("click", "#submit", function () {

    console.log("testing");
    submit_picks();
    $("." + divEmpty).empty();
    $("." + divEmpty).css("margin-bottom", "0px");

    var div = $("." + divEmpty);
    var name = $("<span>");
    var button = $("<button>");

    div.attr("class", divEmpty);
    button.attr("class", "pickButton");
    button.attr("id", divEmpty);
    button.text("Make your picks!")
    name.text(divEmpty);

    div.append(name);
    div.append(button);
    div.append("<hr>");

});

function submit_picks() {

    for (var i = 0; i < radio_arry.length; i++) {

        var usr_pcks = $("input[name=" + radio_arry[i] + "]:checked").attr("id");
        var game_var = radio_arry[i]
        var doc = {

            userid: userID,
            week: divEmpty,
            game: game_var,
            user_pick: usr_pcks,
            user_points: 0
        }

        db.collection("usr_picks").doc(userID + divEmpty + game_var).set(doc);

    }
}
///loads weekly score board
db.collection("usr").get().then((snapshot) => {
    var retValue = snapshot.docs;
    for (i = 0; i < retValue.length; i++) {
        var userAddr = retValue[i].data();
        var userIDsc = retValue[i].data().userid;

        if (userIDsc == userID) {
            $("#w1").text(userAddr.week01total);
            $("#w2").text(userAddr.week02total);
            $("#w3").text(userAddr.week03total);
            $("#w4").text(userAddr.week04total);
            $("#w5").text(userAddr.week05total);
            $("#w6").text(userAddr.week06total);
            $("#w7").text(userAddr.week07total);
            $("#w8").text(userAddr.week08total);
            $("#w9").text(userAddr.week09total);
            $("#w10").text(userAddr.week10total);
            $("#w11").text(userAddr.week11total);
            $("#w12").text(userAddr.week12total);
            $("#w13").text(userAddr.week13total);
            $("#w14").text(userAddr.week14total);
            $("#w15").text(userAddr.week15total);
            $("#w16").text(userAddr.week16total);
            $("#w17").text(userAddr.week17total);
            totalScore = userAddr.week01total + userAddr.week02total + userAddr.week03total + userAddr.week04total + userAddr.week05total + userAddr.week06total + userAddr.week07total + userAddr.week08total + userAddr.week09total + userAddr.week10total + userAddr.week11total
                + userAddr.week12total + userAddr.week13total + userAddr.week14total + userAddr.week15total + userAddr.week16total + userAddr.week17total;
            $("#wkTot").text(totalScore);
        }
    }

})

db.collection("usr").orderBy("season2018total","desc").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        var uuname = doc.data().username;
        var upoints = doc.data().season2018total;
        leaders(uuname, upoints);
    })
});

function leaders(uuname, upoints){
    var ldrrow = $("<tr>");
    var lduname = $("<td>").text(uuname);
    var ldpoints = $("<td>").text(upoints);

    ldrrow.append(lduname, ldpoints);

    $("#tableLeaders").append(ldrrow);

}