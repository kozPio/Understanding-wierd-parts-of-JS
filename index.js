//import { greet } from "./functons";
//import { b } from "./this"


function greet(firstName, lastName, language) {
  language = language || 'en';

  if (language === 'en') {
    console.log("hello " + firstName + ' ' + lastName);
  }

  if (language === 'es') {
    console.log("hola " + firstName + ' ' + lastName);
  }
}


function greetEnlish(firstName, lastName) {
  greet(firstName, lastName);
}

function greetSpanish(firstName, lastName) {
  greet(firstName, lastName, 'es');
}

greetEnlish("john", "Doe");
greetSpanish("john", "Doe", "es");


function getPerson() {

  return {
    firstName: "Tony"
  }
}

console.log(getPerson())