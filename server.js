var express = require('express');
var app = express();
var port = 8000;

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.redirect('/index.html');
})

app.listen(port)
console.log('App is running at port: ' + port);