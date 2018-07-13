require("dotenv").config();
let keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var command = process.argv[2];
var searchTerm = process.argv[3];
var searchTerm = process.argv.slice(3).join(" ");

if (command === "spotify-this-song") {
    if (searchTerm = "") {
        searchTerm = "The Sign";
    }
    spotify.search({ type: 'track', query: "landslide" }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var songData = data.tracks.items;
        console.log("Song Name: " + songData[0].name);
        console.log("Artist: " + songData[0].artists[0].name);
        console.log("Preview Url: " + songData[0].preview_url);
        console.log("Album: " + songData[0].album.name);

    });



};
