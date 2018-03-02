
var hotelData = require('../data/hotel-data.json');


//Defined 1st controller
module.exports.hotelsGetAll = function(req, res) {
  console.log('GET the hotels');
  res
    .status(200)
    //.json({ "jsondata" : "GET received" });
    .json(hotelData);
};
