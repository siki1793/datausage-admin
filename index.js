//this will be our server
var express = require("express"),
    fs = require('fs'),
    port = process.env.PORT || 2595;
 
var app = express();
app.use(express.logger());
app.use(express.json());
app.use(express.urlencoded());
app.set("view options", {
    layout: false
});
app.use(express.static(__dirname + '/public'));
 
app.get('/', function (req, res) {
    res.render('public/index.html');
});

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log("Express is working on port " + port);
});

console.log('Express server running at http://localhost:' + port);
