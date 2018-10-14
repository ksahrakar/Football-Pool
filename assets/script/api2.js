var week = curWeek.toString();
var apikey = "ac3cad31a30047cb96196832877aaad8";
var api2_url = "https://api.fantasydata.net/v3/nfl/odds/JSON/GameOddsByWeek/2018/" + week;
var api3_url = "https://api.fantasydata.net/v3/nfl/stats/JSON/Standings/2018";


var teamRecord = {

};

$(function () {
    $.ajax({
        url: api3_url,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
        },
        type: "GET",
        data: "{body}",
    }).done(function (data) {
        //console.log(data);
        for (var i = 0; i < data.length; i++) {
            var tmRecord = {
                team: "",
                record: "",
            };

            if (data[i].Team === "JAX") { data[i].Team = "JAC" };
            if (data[i].Team === "LAR") { data[i].Team = "LA" };


            tmRecord.team = (data[i].Team);
            var wins = (data[i].Wins).toString();
            var losses = (data[i].Losses).toString();
            var ties = (data[i].Ties).toString();

            tmRecord.record = wins + "-" + losses + "-" + ties;
            teamRecord[tmRecord.team] = {
                record: tmRecord.record,
            }
        }
        console.log(teamRecord);

    })
});

var wkGameOdds = {

};

$(function () {

    $.ajax({
        url: api2_url,
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", apikey);
        },
        type: "GET",
        data: "{body}",
    }).done(function (data) {
        console.log(data);
        for (var i = 0; i < data.length; i++) {
            var gameStats = {
                hTeam: "",
                aTeam: "",
                hTeamOdds: 0,
                aTeamOdds: 0
            };
            if (data[i].HomeTeamName === "JAX") { data[i].HomeTeamName = "JAC" };
            if (data[i].AwayTeamName === "LAR") { data[i].AwayTeamName = "LA" };
            if (data[i].HomeTeamName === "LAR") { data[i].HomeTeamName = "LA" };
            if (data[i].AwayTeamName === "JAX") { data[i].AwayTeamName = "JAC" };

            gameStats.hTeam = (data[i].HomeTeamName);
            gameStats.aTeam = (data[i].AwayTeamName);


            if (data[i].PregameOdds["0"] === undefined) {
                console.log("skipped");
            } else {
                gameStats.hTeamOdds = (data[i].PregameOdds["0"].HomeMoneyLine);
                gameStats.aTeamOdds = (data[i].PregameOdds["0"].AwayMoneyLine);
                wkGameOdds[gameStats.hTeam] = {
                    odds: gameStats.hTeamOdds
                }
                wkGameOdds[gameStats.aTeam] = {
                    odds: gameStats.aTeamOdds
                }
            }
        }
        console.log(wkGameOdds);
    })
});