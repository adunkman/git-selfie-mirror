var five = require("johnny-five");
var http = require("http");
var board = new five.Board();

var webcam = require("./webcam-client")();
var twitter = require("./twitter-client")();

var take = function () {
  console.log("[" + new Date() + "]: " + "Taking picture!");

  webcam.take(function (err, picture) {
    if (err) {
      return console.error("Unable to capture picture.", err);
    }

    console.log("Uploading to Twitter...");

    twitter.upload("Nice selfie! #GITSOS15", picture, function (err, tweet) {
      if (err) {
        return console.error("Unable to tweet picture.", err);
      }

      console.log("Tweeted!");
    });
  });
};

board.on("ready", function() {
  console.log("board ready");
  var button = new five.Button(2);
  board.repl.inject({ button: button });
  button.on("down", take);
});
