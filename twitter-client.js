var Twitter = require("twitter");

module.exports = function () {
  var auth = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  };

  if (!auth.consumer_key || !auth.consumer_secret || !auth.access_token_key || !auth.access_token_secret) {
    throw new Error("Twitter credentials not found in environment: TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN_KEY, TWITTER_ACCESS_TOKEN_SECRET.");
  }

  var client = new Twitter(auth);

  return {
    upload: function (text, picture, callback) {
      client.post('media/upload', { media: picture }, function (err, media) {
        if (err) {
          return callback(err);
        }

        var status = {
          status: text,
          media_ids: media.media_id_string
        }

        client.post('statuses/update', status, callback);
      });
    }
  };
};
