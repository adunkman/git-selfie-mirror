var app = require("express")();
var server = require("http").Server(app);
var io = require("socket.io")(server);

server.listen(3000);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/last_picture.jpg", function (req, res) {
  res.sendFile(__dirname + "/last_picture.jpg");
});

app.get("/ping", function (req, res) {
  global.take();
  res.end("pong");
});

module.exports = {
  broadcast: function (message) {
    return io.sockets.emit(message);
  }
};
