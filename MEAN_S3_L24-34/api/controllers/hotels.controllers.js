// //get data from a mongoDB via native driver
// var dbconn = require('../data/dbconnection.js');
// //to search mongo doc by id
// var ObjectId = require('mongodb').ObjectID;
// //get data from json file in the app
// var hotelData = require('../data/hotel-data.json');

//get data from a mongoDB via mongoose driver
var mongoose = require('mongoose');
var Hotel = mongoose.model('Hotel');




var runGeoQuery = function(req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  //if in the query string, latitu or longit isNotANumber
  if (isNaN(lng) || isNaN(lat)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, lng, lat must both be numbers"
      });
    return;
  }

  // A geoJSON point
  var point = {
    type : "Point",
    coordinates : [lng, lat]
  };


  var geoOptions = {
    spherical : true,
    maxDistance : 2000,
    num : 5
  };



  //TODO: research geoNear(point, geoOptions, function(err, results, stats)
  Hotel
    .aggregate([{'$geoNear': {
            			'near': point,
            			'spherical': true,
            			'distanceField': 'dist',
            			'maxDistance': 200000,
            			'num' : 5
            			 }
            		}],
        function(err, results) {  //, stats
          if (err){
              console.log("error finding hotels");
              res
                  .status(500)
                  .json(err);
          }else if (results.length === 0){
              res
                  .status(404)
                  .json({
                      "message": "No Hotels Found in this Location"
                  });
          }else{
          console.log('Geo results',results);
          // console.log('Num results', results.length);
          // console.log('Geo stats', stats); //stats is undefined
          res
              .status(200)
              .json(results);
          }
          });

  };



















//1st controller
module.exports.hotelsGetAll = function(req, res) {
  console.log('--GET the hotels');
  console.log(req.query);


  // //Working with MongoDB data via Mongoose driver
  // var mongoose = require('mongoose');
  // var Hotel = mongoose.model('Hotel');



  // //Working with MongoDB data via native driver
  // var db = dbconn.get();  //console.log("db", db);
  // var collection = db.collection('hotels');

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
  var maxCount = 50;

  if (req.query && req.query.lat && req.query.lng) {
  runGeoQuery(req, res);
  return;
  }

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  //if in the query string, offset or count isNotANumber
  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        "message" : "If supplied in querystring, count and offset must both be numbers"
      });
    return;
  }

  //more error trapping
  if (count > maxCount) {
    res
      .status(400)
      .json({
        "message" : "Count limit of " + maxCount + " exceeded"
      });
    return;
  }

  //working with collection via Mongoose driver
  Hotel
    .find()
    .skip(offset)
    .limit(count)
    .exec(function(err, hotels) {
      console.log(err);
      console.log(hotels);
      if (err) {
        console.log("Error finding hotels");
        res
          .status(500)
          .json(err);
      } else {
        console.log("Found hotels", hotels.length);
        res
          .json(hotels);
      }
    });



  //working with collection via native driver
  // collection
  //   .find()
  //   .skip(offset)
  //   .limit(count)
  //   .toArray(function(err, docs) {
  //     console.log("Found hotels", docs.length);
  //     res
  //       .status(200)
  //       .json(docs);
  // }); //default=Found 5 hotels


  // //Working with JSON in the app. Return a subset of docs
  // var returnData;
  // returnData= hotelData.slice(offset, offset+count);
  // res
  //   .status(200)
  //   .json(returnData);
};










//2nd controller
// //--working with app's json
// module.exports.hotelsGetOne = function(req, res) {
//   var hotelId= req.params.hotelId;
//   var thisHotel= hotelData[hotelId];
//   console.log('--GET hotelId= ', hotelId);
//   res
//     .status(200)
//     .json(thisHotel);
// };

//--working with mongoDB
module.exports.hotelsGetOne = function(req, res) {
  //via native driver:
  // var db = dbconn.get();
  // var collection = db.collection('hotels');
  var id = req.params.hotelId;



  // //via Mongoose driver:
  // var mongoose = require('mongoose');
  // var Hotel = mongoose.model('Hotel');


  console.log('--GET hotel id', id);

  //via native driver:
  // collection
  //   .findOne({
  //     _id : ObjectId(id)
  //   }, function(err, doc) {
  //     res
  //       .status(200)
  //       .json(doc);
  // });

  //via mongoose driver:
  // Hotel
  // .findById(id)
  // .exec(function(err, doc) {
  //   res
  //     .status(200)
  //     .json(doc);
  // });

  //error checking
  Hotel
    .findById(id)
    .exec(function(err, doc) {
      var response = {
        status : 200,
        message : doc
      };
      if (err) {
        console.log("Error finding hotel");
        response.status = 500;
        response.message = err;
      } else if(!doc) {
        console.log("HotelId not found in database", id);
        response.status = 404;
        response.message = {
          "message" : "Hotel ID not found " + id
        };
      }
      res
        .status(response.status)
        .json(response.message);
    });



};




//3rd controller:
// //--data grabbed from online form and shown in console
// module.exports.hotelsAddOne = function(req, res) {
//   console.log("--POST new hotel");
//   console.log(req.body);
//   res
//     .status(200)
//     .json(req.body);
// };


//--data saved in mongoDB
module.exports.hotelsAddOne = function(req, res) {
  console.log("--POST new hotel");
  //via native driver:
  // var db = dbconn.get();
  // var collection = db.collection('hotels');
  var newHotel;

  if (req.body && req.body.name && req.body.stars) {
    newHotel = req.body;
    newHotel.stars = parseInt(req.body.stars, 10);
    collection.insertOne(newHotel, function(err, response) {
      //console.log("Hotel added", response);
      console.log("Hotel added", response.ops);
      res
        .status(201)
        .json(response.ops);
    });
  } else {
    console.log("Data missing from body");
    res
      .status(400)
      .json({ message : "Required data missing from body" });
  }
};
