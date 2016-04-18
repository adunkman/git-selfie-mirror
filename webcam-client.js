var exec = require("child_process").exec;
var fs = require("fs");

module.exports = function () {
  return {
    take: function (callback) {
      var filename = "last_picture.jpg";

      exec("./imagesnap " + filename, function (err) {
        if (err) {
          return callback(err);
        }

        fs.readFile(filename, callback);
      });
    }
  };
};
