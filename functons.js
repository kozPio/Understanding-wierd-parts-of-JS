greet();

export function greet() {
  console.log('hi');
}

greet.language = "english";



let annonymusGreet = function () {
  console.log('hi');
}

annonymusGreet();

function log(a) {
  a()
}

// log({ greeting: 'hi' });

log(function () {
  console.log('nice')
})

//by value (primitive)
var a = 4;
var b;

b = a;

a = 1;

console.log(a);
console.log(b);


//by reference (all objects (including functions))
var c = { greetings: "hi" };
var d;

d = c;

c.greetings = "hello" /// mutate an object


console.log(c);
console.log(d);


// by reference (parameters to functions)
function changeGreeting(obj) {
  obj.greetings = "Hola"; // mutate
};

changeGreeting(d);

console.log(c);
console.log(d);

// equals operator sets up new memory space (new address)
c = { greetings: "howdy" };

console.log(c);
console.log(d);