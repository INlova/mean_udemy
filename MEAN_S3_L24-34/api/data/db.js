//using mongoose 'driver' to connection to 'meanhotel' mongo db
var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/meanhotel';
mongoose.connect(dburl);


//monitor connection events
mongoose.connection.on('connected', function() {
  console.log('Mongoose connected to ' + dburl);
});
mongoose.connection.on('error', function(err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
  console.log('Mongoose disconnected');
});
