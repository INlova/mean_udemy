var mongoose = require('mongoose');

//define a basic schema
var hotelSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  stars : {
    type : Number,
    min : 0,
    max : 5,
    default : 0
  },
  services : [String],
  description: String,
  photos: [String],
  currency: String,
});


//copile schema into a model
mongoose.model('Hotel', hotelSchema,'hotels');
