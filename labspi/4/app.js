var PORT = 8008;
var IP = "127.0.0.1";

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);

app.use('/static', express.static(__dirname + '/static/'));

app.get('/olx', function (req, res) {
  res.sendFile(__dirname + '/static/olx.html');
});

app.get('/olx/olxreq/:city/:thing', function (req, res) {

	var html = "";

	http.request({
			hostname: "olx.ua",
			port: 80,
			path: '/' + req.params.city + '/q-' + req.params.thing + '/',
			method: 'GET'
	}, function(response) {

			if(response.statusCode != 200) {
				return res.status(200).json({status: 404});
			}

			response.on('data', function(chunk) { html += chunk; });

			response.on('end', function() {
				res.status(200).json({page: html, status: response.statusCode});
			});

		}
	).end();

});

app.get('/rp5', function (req, res) {
  res.sendFile(__dirname + '/static/rp5.html');
});

app.get('/rp5/getcity/:city', function (req, res) {

	var city = "";

	http.request({
	    hostname: "m.rp5.ua",
	    port: 80,
	    path: '/?lang=en&q=' + req.params.city,
	    method: 'GET'
	}, function(response) {

			response.on('data', function(chunk) { city += chunk; });

			response.on('end', function() {
				res.status(200).json({page: city, status: response.statusCode});
			});

		}
	).end();

});

app.get('/rp5/getweather/:cityQuery', function (req, res) {

	var weather = "";

	http.request({
	    hostname: "m.rp5.ua",
	    port: 80,
	    path: '/' + req.params.cityQuery,
	    method: 'GET'
	}, function(response) {

			response.on('data', function(chunk) { weather += chunk; });

			response.on('end', function() {
				res.status(200).json({page: weather, status: response.statusCode});
			});

		}
	).end();

});


server.listen(PORT, IP, function() {
  console.log('Express server started on port %d.', PORT);
});