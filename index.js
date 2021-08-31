//import { greet } from "./functons";
//import { b } from "./this"

function mapForEach(arr, fnc) {
  var newArr= [];

  for(var i = 0 ; i < arr.length; i++){
    newArr.push(
      fnc(arr[i])
    );
  }

  return newArr
}


var arr1 = [1,2,3];
console.log(arr1);


var arr2= mapForEach(arr1, function(item) {
  return item * 3
})


function muliplyByTen(num){
  return num * 10
}

console.log(arr2);

console.log(mapForEach(arr1, muliplyByTen ));


var arr3= mapForEach(arr1, function(item) {
  return item > 2 ? item : null
})

console.log(arr3);

function checkLimiter( limiter, item) {
  console.log(item)
  return item > limiter
}

function check(limiter){
  return checkLimiter.bind(this, limiter);
} 

arr4 = mapForEach(arr2, check(5));

console.log(arr4)