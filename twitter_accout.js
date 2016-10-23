var Twitter = require('twitter');
var fs = require('fs');

var client = new Twitter({
  consumer_key: 'K40YLRpsEBGQlzxG2aT8y73zJ',
  consumer_secret: 'LTsK6XULfZhTgjZfvQJfqhKrvQyOCRHeSWG9P2BhKRBHpcDrtr',
  access_token_key: '789778327175168000-Dk3C1ZslHbCho5fFtXSoipPaqzWzsB9',
  access_token_secret: 'ulcGdSq5jLrTepTualBbERRJNv3XHbzsCyIb4Ta8J6awu'
});

module.exports = function(user_name, callback) {

  // console.log('twitter');

  var watson_data = require('./watson_data');

  var params = {screen_name: user_name, count: 200};

  client.get('statuses/user_timeline', params, function (error, tweets, response) {

    if (!error) {

      var profile = {contentItems: []};

      tweets.forEach(function (tweet) {

        var time = new Date(tweet.created_at).getTime();
        var id = tweet.id.toString();

        var new_tweet = {
          "content": tweet.text,
          "contenttype": "text/plain",
          "created": time,
          "id": id,
          "language": "en"
        };

        profile.contentItems.push(new_tweet);

      });

      fs.writeFileSync('./profile_' + params.screen_name + '.json', JSON.stringify(profile, null, 2), 'utf-8');

      // console.log('twitter');
      watson_data(user_name, callback);
    }
  });
};