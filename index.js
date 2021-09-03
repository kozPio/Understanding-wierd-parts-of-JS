//import { greet } from "./functons";
//import { b } from "./this";
// "use strict";

let people = [{
  //the John object
  firstName: "John",
  lastName: "Doe",
  addresses: [
    '12 ocland st',
    '14 portland'
  ]
},
{
  //the Jane object
  firstName: "Jane",
  lastName: "Doe",
  addresses: [
    '14 ocland st',
    '18 portland'
  ],
  greet: function(){
    return 'Hi ' + this.firstName
  }

}];

console.log(people);


var person;

persom = {};

console.log(persom)

// function logNewPersonn(){
//   "use strict";
//   let person2;
//   persom2 =  {}
//   console.timeLog(persom2)
// }

// logNewPersonn();


var q = $("ul.people li");
console.log(q)