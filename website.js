var fs = require("fs");
var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var twitter = require("./twitter-client")();

server.listen(3000);

var broadcast = function (message, data) {
  return io.sockets.emit(message, data);
};

var log = function (message) {
  var date = new Date();
  broadcast("log", { message: message, date: date });
  console.log("[" + date + "]: " + message);
};

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/last_picture.jpg", function (req, res) {
  res.sendFile(__dirname + "/last_picture.jpg");
});

app.post("/tweet", function (req, res) {
  log("Posting to Twitter (@selfieonthewall)…");

  fs.readFile("last_picture.jpg", function (err, picture) {
    if (err) {
      return log("Unable to open picture file.", err);
    }

    twitter.upload("Nice selfie! #GITSOS16", picture, function (err, tweet) {
      if (err) {
        return log("Unable to tweet picture.", err);
      }

      log("Tweeted!");
    });
  });
});

module.exports = { broadcast: broadcast, log: log };
