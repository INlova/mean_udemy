var express = require('express');
var app = express();
var path =require('path');
var path =require('path');

//Define port for express to run on
app.set('port', 3000);


// Add middleware to console log every request
app.use(function(req,res,next){
	console.log(req.method, req.url);
	next();
});


//Use '/api/routes' as a middleware:
var routes = require('./api/routes');
app.use('/api', routes);


//Set static directory= simplest middleware comes with express
app.use(express.static(path.join(__dirname, 'public')));


//Make express server listen for requests
var server= app.listen(app.get('port'), function(){
  var port = server.address().port;
  console.log('Magic happens on port '+ port);
});
