function greet(whattosay) {
  return function(name) {
    console.log(whattosay + ' ' + name)
  }
};


var sayHi = greet("Hi");


sayHi("Tony");


function buildFunctions() {

  var arr = [];

  for(var i =0; i < 3; i++){
    //let x = i;
    arr.push(
      (function(j) {  
        return function(){
          console.log(j);
        }  
      })(i)
    )
  }

  return arr;
};



var fs = buildFunctions();


fs[0]();
fs[1]();
fs[2]();


function makeGreeting(language) {
   return function greet(firstName, lastName){

    if (language === 'en') {
      console.log("hello " + firstName + ' ' + lastName);
    }
  
    if (language === 'es') {
      console.log("hola " + firstName + ' ' + lastName);
    }
   }
}


var greetEnlish = makeGreeting('en');
var greetSpanish = makeGreeting('es');

greetEnlish("john", "Doe");
greetSpanish("john", "Doe");


function sayHiLater() {

  var greeting= "Hi! ";

  setInterval(function() {
    console.log(greeting)
  },3000) 
};


sayHiLater();



function tellMeWhenDone(callback) {

  var a = 1000;
  var b = 2000;

  callback();
}


tellMeWhenDone(function(){
  console.log("done")
});


tellMeWhenDone(function(){
  console.log("All done")
});