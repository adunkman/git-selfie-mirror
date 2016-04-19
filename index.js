var _ = require("underscore");
var five = require("johnny-five");
var board = new five.Board();

var webcam = require("./webcam-client")();
var website = require("./website");

var take = function (edge) {
  website.log("Taking picture, smile! (" + edge + ")");

  webcam.take(function (err) {
    if (err) {
      return website.log("Unable to capture picture.", err);
    }

    website.log("Photo captured.");
    website.broadcast("photo");
  });
};

board.on("ready", function() {
  website.log("Board ready.");
  var button = new five.Button(2);
  board.repl.inject({ button: button });

  var delayed = function (edge) {
    return function () {
      return take(edge);
    };
  };

  // Support for SPST button
  button.on("hold", _.debounce(delayed("leading"), 1000, true));
  button.on("hold", _.debounce(delayed("trailing"), 1000, false));

  // Support for simple button
  // button.on("down", function () { take("press"); });
});
