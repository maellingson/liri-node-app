require("dotenv").config();
let keys = require("./keys.js");

var request = require("request");
var Twitter = require("twitter");
//var Spotify = require("node-spotify-api");

//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//Takes in arguments from the terminal and outputs
var command = process.argv[2];
// var twitterSearch = (process.argv[3]);
// var spotifySearch = (process.argv[3]);
// var omdbSearch = (process.argv[3]);
// var whatSays = (process.argv[3]);

//Loops through commands and responses
if (command === "my-tweets"){
    console.log("this works");
    var params = {screen_name: 'MCodingbootcamp', family:4};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
  else{
      console.log(error)
  }
});

}
else if (command === "spotify-this-song"){
    console.log(spotifySearch);
}
else if (command === "movie-this"){
    console.log(omdbSearch);
}
else if (command === "do-what-it-says"){
    console.log(whatSays);
}

var params = {screen_name: 'Mcodingbootcamp'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(tweets);
  }
});


