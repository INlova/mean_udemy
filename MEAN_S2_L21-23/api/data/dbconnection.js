var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/meanhotel';

var _connection = null;

var open = function() {
  MongoClient.connect(dburl, function(err, database) {
    if (err) {
      console.log("DB connection failed");
      return;
    }
    _connection = database.db('meanhotel');
    console.log("DB connection open");
  });
};

var get = function() {
  return _connection;
};

module.exports = {
  open : open,
  get : get
};
