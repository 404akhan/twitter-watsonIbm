var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res
    .send('hello');
});

app.get('/:user', function (req, res) {
  try {
    var user = require('./formatted_' + req.params.user + '.json');

    res
      .json(user);
  } catch(e) {
    res
      .json({error: "error"});
  }
});

app.get('/reg/:user', function (req, res) {

  var user_name = req.params.user;

  var twitter_account = require('./twitter_accout');

  var callback = function() {

    try {
      var user = require('./formatted_' + req.params.user + '.json');

      res
        .json(user);
    } catch(e) {
      res
        .json({error: "error"});
    }

  };

  twitter_account(user_name, callback);

});

app.get('/msgs/:user', function(req, res) {

  var user_name = req.params.user;

  var profile = require('./watson_data_' + user_name + '.json');

  var msgs = require('./get_messages')(profile);

  res
    .json(msgs);

});

var server = app.listen(process.env.PORT || 3000);

server.timeout = 100000;