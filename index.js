//import { greet } from "./functons";
//import { b } from "./this"


let 
// person fisrt Name
firstName, 
// person LastName
lastName, 
// langiuage
language;


let person = {
  //first Name
  firstName: "John",
  //last name
  lastName: "Doe"
}

console.log(person)


function greet(name) {
  console.log("hello " + name)
}

greet("Adam");

var greetFunc = function(name){
  console.log("hello " + name)
}

greetFunc("Adam");

// (IIFE) using an imidiatly invoked function expression
var greeting = function(name){
  return "hello " + name;
}("John");

console.log(greeting);


let name = "Alice";

(function(name) {
  let greeting = "Hello "
  console.log(greeting + name);
}(name)); //IIFE