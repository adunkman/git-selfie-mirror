var exec = require("child_process").exec;

module.exports = function () {
  return {
    take: function (callback) {
      exec("./imagesnap last_picture.jpg", callback);
    }
  };
};
