//executes everything in instantHello.js-no complex function present; just a print out
require('./instantHello');
//don`t include .js as file name to have ability to convert those files into folders


//import everything from goodbye.js
//which is 1 function.
//call that function with goodbye()
var goodbye= require('./talk/goodbye');
goodbye();


//there were 2 functions defined in talk/index.js
//let's call them on that require/'talk' module
var talk= require('./talk');
talk.intro();
talk.hello("magda");


//give our module a method ask and pass a variable to another file: question.js
//pass a value to that require module and return a value to print out/console.log
var question=require('./talk/question');
var answer= question.ask("What is the answer to everything?");
console.log(answer);
