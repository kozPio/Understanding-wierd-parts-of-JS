var person = {
  firstName: "John",
  lastName: "Doe",
  getFullName: function() {
    fullName = this.firstName + ' ' + this.lastName;
    return fullName;
  }
};

var logName = function(lang1, lang2){

  console.log("Logged: " + this.getFullName());
  console.log("Arguments " + lang1 + " " + lang2)
  console.log("----------")
}


var logPersonName = logName.bind(person);


logPersonName("en");


logName.call(person, "es", "en");
logName.apply(person, ["es", "en"]);


(function(lang1, lang2){

  console.log("Logged: " + this.getFullName());
  console.log("Arguments " + lang1 + " " + lang2)
  console.log("----------")
}).apply(person, ["en", "es"])


var person2 = {
  firstName: "Jamie",
  lastName: "Peterson",
  
};




//function borrowing
console.log(person.getFullName.apply(person2));


//function currying
function multiply(a, b) {
  return a*b;
}

var multiplyByTwo = multiply.bind(this, 2);

console.log(multiplyByTwo(3));


var multiplyByThree = multiply.bind(this, 3);

console.log(multiplyByThree(3));