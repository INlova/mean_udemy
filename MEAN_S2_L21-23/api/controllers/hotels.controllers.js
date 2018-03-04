//get data from a mongoDB
var dbconn = require('../data/dbconnection.js');

//to search mongo doc by id
var ObjectId = require('mongodb').ObjectID;

//get data from json file in the app
var hotelData = require('../data/hotel-data.json');






//1st controller
module.exports.hotelsGetAll = function(req, res) {
  console.log('--GET the hotels');
  console.log(req.query);
  
  
  //Working with MongoDB data
  var db = dbconn.get();  //console.log("db", db);
  var collection = db.collection('hotels');
  
  // //returns ALL mongo docs
  // collection
  //   .find()
  //   .toArray(function(err, docs) {
  //     console.log("Found hotels", docs.length);
  //     res
  //       .status(200)
  //       .json(docs);
  // });
  
  
  //returns a subset of mongo docs
  var offset = 0;
  var count = 5;
  
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  
  
  collection
    .find()
    .skip(offset)
    .limit(count)
    .toArray(function(err, docs) {
      console.log("Found hotels", docs.length);
      res
        .status(200)
        .json(docs);
  }); //default=Found 5 hotels
  

  // //Working with JSON in the app. Return a subset of docs
  // var returnData;
  // returnData= hotelData.slice(offset, offset+count);
  // res
  //   .status(200)
  //   .json(returnData);
};




//2nd controller
// //working with app's json
// module.exports.hotelsGetOne = function(req, res) {
//   var hotelId= req.params.hotelId;
//   var thisHotel= hotelData[hotelId];
//   console.log('--GET hotelId= ', hotelId);
//   res
//     .status(200)
//     .json(thisHotel);
// };


//working with mongoDB
module.exports.hotelsGetOne = function(req, res) {
  var db = dbconn.get();
  var collection = db.collection('hotels');
  var id = req.params.hotelId;
  
  console.log('--GET hotel id', id);

  collection
    .findOne({
      _id : ObjectId(id)
    }, function(err, doc) {
      res
        .status(200)
        .json(doc);
  });
};




//3rd controller
module.exports.hotelsAddOne = function(req, res) {
  console.log("--POST new hotel");
  console.log(req.body);
  res
    .status(200)
    .json(req.body);
};
