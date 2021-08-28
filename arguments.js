var arr = [
  1,
  false,
  {
    name: 'Adam',
    address: "Poland"
  },
  function (name) {
    var greeting = "hello "
    console.log(greeting + name)
  },
  "hello"

];


console.log(arr)

arr[3](arr[2].name)


function greet(firstName, lastName, language = 'en') {

  language = language || 'en'

  if (arguments.length === 0) {
    console.log('missing arguments')
    console.log("---------")
    return
  }
  console.log(firstName)
  console.log(lastName)
  console.log(arguments)
  console.log(`Argument 2 ${arguments[2]}`)
  console.log(language)
  console.log("---------")

}

greet();
greet("Adam");
greet("Adam", "Doe");
greet("Adam", "Doe", "es")