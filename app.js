//this will be our server
var express = require("express"),
    fs = require('fs');
 
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

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
	var host = server.address().address
	var port = server.address().port
	console.log("Server has started");
	console.log(host);
	console.log("listening at http://%s%s", host, port);
});

console.log('Express server running at http://localhost:' + port);
