
var hotelData = require('../data/hotel-data.json');


//Defined 1st controller
module.exports.hotelsGetAll = function(req, res) {
  console.log('-->GET the hotels');
  res
    .status(200)
    //.json({ "jsondata" : "GET received" });
    .json(hotelData);
};

//Defined 2nd controller
module.exports.hotelsGetOne = function(req, res) {
  var hotelId= req.params.hotelId;
  var thisHotel= hotelData[hotelId];
  console.log('-->GET hotelId= ', hotelId);
  res
    .status(200)
    .json(thisHotel);
};
