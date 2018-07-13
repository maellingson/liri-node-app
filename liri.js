require("dotenv").config();
let keys = require("./keys.js");
var fs = require("fs");

var request = require("request");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Takes in arguments from the terminal and outputs
var command = process.argv[2];
var searchTerm = process.argv[3];
var searchTerm = process.argv.slice(3).join(" ");

//Loops through commands and responses
//Twitter Command
if (command === "my-tweets") {
    var params = { screen_name: 'MCodingbootcamp', count: 20, family: 4 };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (i = 0; i < tweets.length; i++) {
                console.log("Tweet: " + tweets[i].text + "\n" + "Created At: " + tweets[i].created_at + "\n");
            };
        }
        else {
            console.log(error)
        }
    });
}
//Spotify Command
else if (command === "spotify-this-song") {
    if (searchTerm = "") {
        searchTerm = "The Sign";
    }
    spotify.search({ type: "track", query: searchTerm }), function (err, data) {
        if (err) {
            console.log(err);
        }
        var songData = data.tracks.items;
        console.log("Song Name: " + songData[0].name);
        console.log("Artist: " + songData[0].artists[0].name);
        console.log("Preview Url: " + songData[0].preview_url);
        console.log("Album: " + songData[0].album.name);

    };
}

//Movie Command
else if (command === "movie-this") {

    var queryURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + searchTerm

    request(queryURL, function (error, response, body) {
        if (!searchTerm) {
            searchTerm = "Mr. Nobody"
        }
        if (!error) {
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings);
            console.log("Country: " + JSON.parse(body).imdbRating);
            console.log("Language: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });
}
//Do What it Says Command
else if (command === "do-what-it-says") {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");

        if (dataArr[0] === "spotify-this-song") {
            var txtSong = dataArr[1].slice(1, -1);
            spotify(txtSong);
        }
        else if (dataArr[0] === "my-liritweets") {
            var txtTweet = dataArr[1].slice(1, -1);
            twitter(txtTweet);
        }
        else if (dataArr[0] === "movie-this") {
            var txtMovie = dataArr[1].slice(1, -1);
            request(txtMovie);
        }

    })
}