var express = require('express');
var app = express();
var path =require('path');

//Define port for express to run on
app.set('port', 3000);

//Middleware to console log every request
app.use(function(req,res,next){
	console.log(req.method, req.url);
	next();
});

//Set static directory= simplest middleware comes with express
app.use(express.static(path.join(__dirname, 'public')));

//Middleware for dealing with Forms that are POSTed
var bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

//Use '/api/routes' as a middleware:
var routes = require('./api/routes');
app.use('/api', routes);




//Make express server listen for requests
var server= app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Magic happens on port '+ port);
});
