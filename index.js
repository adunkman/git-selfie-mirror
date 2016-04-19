var _ = require("underscore");
var five = require("johnny-five");
var board = new five.Board();

var webcam = require("./webcam-client")();
var twitter = require("./twitter-client")();
var website = require("./website");

var take = function (edge) {
  console.log("[" + new Date() + "]: " + "Taking picture! " + (edge ? edge : ""));

  webcam.take(function (err, picture) {
    if (err) {
      return console.error("Unable to capture picture.", err);
    }

    console.log("Uploading to Twitter...");

    // twitter.upload("Nice selfie! #GITSOS16", picture, function (err, tweet) {
    //   if (err) {
    //     return console.error("Unable to tweet picture.", err);
    //   }

    //   console.log("Tweeted!");
    // });
    console.log("Skipping twitter upload.");
    console.log("Notifying client...");

    website.broadcast("photo");
  });
};

global.take = take;

board.on("ready", function() {
  console.log("board ready");
  var button = new five.Button(2);
  board.repl.inject({ button: button });

  var isButtonHeld = false;

  var thing = function (edge) {
    return function () {
      return take(edge);
    };
  };

  button.on("hold", _.debounce(thing("leading"), 1000, true));
  button.on("hold", _.debounce(thing("trailing"), 1000, false));

  button.on("down", function () { take("press"); });
});
