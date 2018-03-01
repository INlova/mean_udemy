var answer = "The answer is 42!";

//there will be method 'ask' coming from app.js
//to supply us with value of 'question'
module.exports.ask =function(question){
  console.log(question);
  return answer;
};
