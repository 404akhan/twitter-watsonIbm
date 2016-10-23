var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res
    .send('hello');
});

app.get('/:user', function (req, res) {
  var user = require('./formatted_' + req.params.user + '.json');

  res
    .json(user);
});

app.listen(process.env.PORT || 3000);