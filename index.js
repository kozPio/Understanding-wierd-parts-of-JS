//import { greet } from "./functons";
//import { b } from "./this";



function Person(firstName, lastName) {
  console.log(this)
  this.firstName = firstName;
  this.lastName = lastName;

  console.log("This function is invoked")
}

Person.prototype.getFullName = function () {
  return this.firstName + " " + this.lastName
}

var john = new Person("John", "Doe");

console.log(john)

var jane = new Person("Jane", "Doe");


console.log(jane.getFullName());
console.log(jane)

Array.prototype.MyNewFeature = 'cool'

var arr = ['John', "Jane", "Jim"];


for(let prop in arr){
  console.log(prop+ ': '+ arr[prop])
};

// pollyfil
if(!Object.create) {
  Object.create = function(o) {
    if( arguments.length > 1) {
      throw new Error('Object.create implementation' + "Only accepts the first parameter")
    }

    function F(){
      F.prototype =o;
      return new F();
    }
  }
}

var person = {
  firstName: "Deafult",
  lastName: "Deafult",
  greet: function(){
    return "Hi " + this.firstName
  }
}

var jake = Object.create(person);
jake.firstName = "Jake";
jake.lastName = "Doe";
console.log(jake)