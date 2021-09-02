
var person = {
  firstName: "Default",
  lastName: "Default",
  getFullName: function() {
    fullName = this.firstName + ' ' + this.lastName;
    return fullName;
  }
};

var john = {
  firstName: "John",
  lastName: "Doe",
};


//never do
john.__proto__ = person;
console.log(john.getFullName());
console.log(john.firstName);

var jane = {
  adress: "11 OkStreet",
  getFullName: function() {
    fullName = this.firstName + ' ' + this.lastName;
    return fullName;
  }
};

// jane.__proto__ = person;

// console.log(jane.getFullName());


var a = {};
var b = function(){};
var c = [];

for (var prop in john) {
  if(john.hasOwnProperty(prop)){
    console.log(prop + ": " + john[prop]);
  }
  
};

var jim = {
 
  getFirstName: function() {
    return this.firstName ;
  }
};
