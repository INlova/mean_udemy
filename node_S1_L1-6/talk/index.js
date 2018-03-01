var filename= "index.js";


var hello =function(name){
  console.log("hello "+ name);
};

var intro =function(){
  console.log("i am a node file called "+ filename);
};


//export only certain functions as methods
//=export a js object to return our functions
module.exports ={
  hello: hello,
  intro: intro
};
