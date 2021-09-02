import {scenario, text, sixThousndMostCommon} from './text.js'



let splitedScenario = scenario.split(/\n/);

let temparr= [];



for (let i = 0; i< splitedScenario.length; i++){
  
    if(splitedScenario[i][0] !== '@'){
      temparr.push(splitedScenario[i])
    }
  
  
}

//console.log(temparr)

let str =temparr.join(' ');






 



let arr =text.split(/\t|\n/);
//console.log(arr)
let arrayOfChars = [];

let index = 1;
for (let i = 1; i< arr.length+1; i+=3){
  
  arrayOfChars.push({index, word: arr[i]})
  index++;
}


// console.log(x)
let timesOccuredInScenario = [];

for(let i= 0; i< arrayOfChars.length; i++){
 let occured =countOccurences(str, arrayOfChars[i].word);
  timesOccuredInScenario.push({char: arrayOfChars[i].word, ocur: occured, index: arrayOfChars[i].index})
}

let result = []

for(let i= 0; i< timesOccuredInScenario.length; i++){
  if(timesOccuredInScenario[i].ocur >= 20){
    result.push(timesOccuredInScenario[i])
  }
 }

console.log(result)

function countOccurences(string, word) {
  return string.split(word).length - 1;
};

let arrofsixthousnd = sixThousndMostCommon.split(/\n/);
console.log(arrofsixthousnd)

let timesOccured = []

for(let i= 0; i< arrofsixthousnd.length; i++){
  let occur =countOccurences(str, arrofsixthousnd[i]);
  if(occur >= 20){
      timesOccured.push({cahr: arrofsixthousnd[i], occur, index: i+1})
  }
 }


 console.log(timesOccured)