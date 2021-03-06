import { fullDictionary, sixThousndMostCommon, translation } from "./text";


 var g = G$("John" , "Doe");
 

 g.greet().setLang('es').greet(1);


 $("#login").click(function() {
   var loginGrter = G$("John" , "Doe");

   $("#logindiv").hide();

   loginGrter.setLang($('#lang').val()).HtmlGreeting('#greeting', true).log();
 })

const generateClipboardText = document.querySelector('#generateClipboardText')
const closeModalButton = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay');


let interval = null;

  generateClipboardText.addEventListener('click',  ()  => {

    
    if(interval) {
      clearInterval(interval)
      interval = null;
    }else{
      interval = setInterval(readClipboard, 2000)
    }
  })





  



overlay.addEventListener('click', ()=> {
  const modals = document.querySelectorAll('.modal.active');
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButton.forEach((button)=> {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal')
    closeModal(modal);
  })
});


function openModal(modal, value){
  if(modal == null) return
  
  const bodyModal = document.querySelector('.bodyModal');
  bodyModal.innerHTML = value;
  modal.classList.add('active');
  overlay.classList.add('active');
}


function closeModal(modal){
  if(modal == null) return
  
  modal.classList.remove('active');
  overlay.classList.remove('active');
}


const trans =translation.split(/\r?\n/);


//


let dictionaryArray = fullDictionary.split(/\t|\n/);

let finalArray= [];

for (let i=0; i< dictionaryArray.length; i+=7){ 
  let word = {};
  word.char = dictionaryArray[i];
  word.kana = dictionaryArray[i+1];
  word.meaning = dictionaryArray[i+2];
  word.sentence = dictionaryArray[i+5];
  word.sentenceKana = dictionaryArray[i+6];
  word.occur = 0;

  finalArray.push(word)
}




// New Dictionary




finalArray = finalArray.sort((a, b)=> {
  return b.char.length - a.char.length
})



// for(let i=0; i< finalArray.length; i++){
//   for(let j=0; j< listOfChars.length; j++){
//     if(finalArray[i].char === listOfChars[j].cahr){
//       finalArray[i].occur = listOfChars[j].occur
//     }
//   }
  
// }



// let wordsOccured = [];

// for(let i=0; i< finalArray.length; i++){
//   if(finalArray[i].occur){
//     wordsOccured.push(finalArray[i])
//   }
// }




// let sorted = wordsOccured.sort((a, b) => {
//   return b.occur - a.occur});

  


// for(let i = 0; i<sorted.length; i++){
//   let tr = document.createElement('tr');
//   let trInside = `
//   <tr>
//     <td>${sorted[i].char}</td>
//     <td>${sorted[i].kana}</td>
//     <td>${sorted[i].meaning}</td>
//     <td>${sorted[i].sentence}</td>
//     <td>${sorted[i].sentenceKana}</td>
//     <td>${sorted[i].occur}</td>
//   </tr>
//   `
//   tr.innerHTML= trInside;
//   document.querySelector('#table').appendChild(tr);
// }


let generateTranslation = function(text) {
  let textValue = null;
  if(text){
    textValue = text;
  }else{
    textValue =document.getElementById('text').value
  }
  
  
  let charsInText = findTranslations(textValue);

  let sortedChars = charsInText.sort((a, b) => {
    return a.index - b.index});


  createDescriptions(sortedChars);
}

document.getElementById('button').addEventListener('click', () =>{
  
  generateTranslation();
});

let previousClipboardText = '';


function readClipboard() {
  theClipboard.readText().then(clipText =>{
    if(clipText === previousClipboardText) {
      return
    }
    console.log('changed')
    document.querySelector('#text').innerHTML = clipText;
    generateTranslation(clipText);
    previousClipboardText = clipText;
  })
  
  
}



function splitChar (char, num) {
  let arr = [];
  if(num === 3 || num === 4){
    arr.push(char);
    arr.push(char.substring(0, num-1))
  }else {
    arr.push(char)
  }
  

  return arr
}



function findTranslations(text) {
  let outputArray = []
  let tempText = text;
  let placeholder = '';
  let leftoverWords = [];
  // let index = -1;
  
  
  for(let i = 0; i < finalArray.length; i++) {
    let length =finalArray[i].char.length
    let charArr = splitChar(finalArray[i].char ,length);
    

    for(let j = 0; j<charArr.length; j++){
      let index =tempText.indexOf(charArr[j]) 
      if(index > -1){
        //outputArray.push({...finalArray[i], index})
        placeholder =generatePlaceHolder(length)
        if(j ===0){
          outputArray.push({...finalArray[i], index})
          placeholder =generatePlaceHolder(length)
          tempText = tempText.replace(charArr[0], placeholder);
        }else{
          outputArray.push({...finalArray[i], index, j})
          placeholder =generatePlaceHolder(length-1)
          tempText = tempText.replace(charArr[1], placeholder);
        }
        
        
      }
    }
    
    // i=0
     
  }
  
  for(let n =0; n<tempText.length; n++){
    if(tempText[n] !== '_'){
      leftoverWords.push({index: n, char: tempText[n]})
    }
  }
  let wholeSentence = outputArray.concat(leftoverWords)
  console.log(tempText)
  return wholeSentence;
  
}


function generatePlaceHolder(num) {
  let placeholder = '';
  for(let i=0; i< num; i++){
    placeholder =placeholder.concat('','_')
  }
  return placeholder
};


let moduleArray= []
let colorArray = ['red', 'blue', 'aqua', 'purple', 'crimson', 'orange'];

function juggleColors(word, num) {

  if(word){
    if(num === 5){
      num = 0;
    } else{
      num++;
    }
  }

  return num 
}

function createDescriptions(arrOfChars) {
  let updatedSentence = document.createElement('div');
  moduleArray = [];
  let x = 0;
  updatedSentence.classList.add('sentence');
  const modal = document.querySelector('.modal');
  let insideTableHead =`
  <th>word</th>
  <th>kana</th>
  <th>meaning</th>
  <th>sentence</th>
  <th>sentence with kana</th>
`
for(let i=0; i <arrOfChars.length; i++){
  let div = document.createElement('div');
  let inside = '';

  if(arrOfChars[i].j){
    inside = `
    <p ${arrOfChars[i].meaning && "style=' color: " + colorArray[x] + " ' "}>${arrOfChars[i].char.substring(0, arrOfChars[i].char.length-1)}</p>`
    x =juggleColors(arrOfChars[i].meaning, x);
  }else{
    inside = `
    <p ${arrOfChars[i].meaning && "style=' color:" + colorArray[x] + " ' " }>${arrOfChars[i].char}</p>
    `
    x =juggleColors(arrOfChars[i].meaning, x);
  }
  
  
  div.innerHTML = inside;
  if(arrOfChars[i].meaning) {
    let y = x;
    if(y === 0){
      y= 5;
    }else {
      y-=1;
    }
    console.log(y)
    
    let insideOfTable= 
    `
        <td class="table-td" style=" color: ${colorArray[y]}">${arrOfChars[i].char}</td>
        <td class="table-td" style=" color: ${colorArray[y]}">${arrOfChars[i].kana}</td>
        <td class="table-td" style=" color: ${colorArray[y]}">${arrOfChars[i].meaning}</td>
        <td class="table-td" style=" color: ${colorArray[y]}">${arrOfChars[i].sentence}</td>
        <td class="table-td "style=" color: ${colorArray[y]}">${arrOfChars[i].sentenceKana}</td>
    `
    let insideOfModule= `
    <div class="bodyModal-div">
        <p class="bodyModal-p">Char: ${arrOfChars[i].char}</p>
        <p class="bodyModal-p">Kana: ${arrOfChars[i].kana}</p>
        <p class="bodyModal-p">Meaning: ${arrOfChars[i].meaning}</p>
        <p class="bodyModal-p">Sentence: ${arrOfChars[i].sentence}</p>
        <p class="bodyModal-p">KanaSentence: ${arrOfChars[i].sentenceKana}</p>
    </div>
    `
    div.addEventListener('click', ()=> {
      openModal(modal, insideOfModule)
    })

    if (moduleArray.some(e => e.association === arrOfChars[i].char)) {
      null
    }else {
      moduleArray.push({inside: insideOfTable, association: arrOfChars[i].char })
    }
  }
  
  updatedSentence.appendChild(div);
  
}
  
 document.getElementById('displayText').innerHTML = '';
 document.getElementById('displayText').appendChild(updatedSentence);
 document.querySelector('#table').innerHTML = '';
 let tr2 = document.createElement('tr');
 tr2.innerHTML =  insideTableHead;
 document.querySelector('#table').appendChild(tr2);
 for(let i = 0; i<moduleArray.length; i++){
  let tr = document.createElement('tr');
  tr.innerHTML= moduleArray[i].inside; 
  document.querySelector('#table').appendChild(tr); 
  }
  
  

}
let theClipboard = navigator.clipboard;




//


// let listOfChars= [{cahr: "??????", occur: 223, index: 4}
// ,{cahr: "??????", occur: 27, index: 6}
// ,{cahr: "???", occur: 99, index: 7}
// ,{cahr: "??????", occur: 58, index: 13}
// ,{cahr: "???", occur: 176, index: 16}
// ,{cahr: "???", occur: 244, index: 23}
// ,{cahr: "??????", occur: 35, index: 24}
// ,{cahr: "???", occur: 231, index: 33}
// ,{cahr: "???", occur: 171, index: 36}
// ,{cahr: "??????", occur: 24, index: 40}
// ,{cahr: "???", occur: 177, index: 49}
// ,{cahr: "??????", occur: 251, index: 55}
// ,{cahr: "???", occur: 357, index: 56}
// ,{cahr: "??????", occur: 45, index: 58}
// ,{cahr: "?????????", occur: 39, index: 71}
// ,{cahr: "???", occur: 187, index: 86}
// ,{cahr: "??????", occur: 54, index: 91}
// ,{cahr: "??????", occur: 20, index: 100}
// ,{cahr: "??????", occur: 24, index: 101}
// ,{cahr: "??????", occur: 257, index: 102}
// ,{cahr: "??????", occur: 126, index: 103}
// ,{cahr: "??????", occur: 22, index: 122}
// ,{cahr: "???", occur: 20, index: 129}
// ,{cahr: "?????????", occur: 22, index: 134}
// ,{cahr: "???", occur: 37, index: 135}
// ,{cahr: "??????", occur: 30, index: 147}
// ,{cahr: "??????", occur: 33, index: 151}
// ,{cahr: "???", occur: 65, index: 153},
//  {cahr: "???", occur: 163, index: 157}
// ,{cahr: "???", occur: 82, index: 168},
// {cahr: "???", occur: 34, index: 170},
// {cahr: "???", occur: 21, index: 177},
// {cahr: "?????????", occur: 34, index: 184},
// {cahr: "???", occur: 20, index: 186},{cahr: "???", occur: 88, index: 188},
// {cahr: "???", occur: 34, index: 193},{cahr: "???", occur: 444, index: 207},
// {cahr: "???", occur: 42, index: 209}, {cahr: "??????", occur: 173, index: 210}
// ,{cahr: "??????", occur: 45, index: 212},{cahr: "??????", occur: 49, index: 213},
// {cahr: "?????????", occur: 175, index: 219},{cahr: "???", occur: 53, index: 227},
// {cahr: "?????????", occur: 22, index: 228},{cahr: "?????????", occur: 35, index: 230},
// {cahr: "??????", occur: 97, index: 232},{cahr: "??????", occur: 26, index: 239},
// {cahr: "??????", occur: 26, index: 240}, {cahr: "???", occur: 127, index: 241}
// ,{cahr: "???", occur: 77, index: 242},{cahr: "???", occur: 41, index: 246},
// {cahr: "??????", occur: 123, index: 248},
// {cahr: "??????", occur: 52, index: 252},
// {cahr: "???", occur: 45, index: 254},
// {cahr: "??????", occur: 161, index: 255},
// {cahr: "??????", occur: 20, index: 256},
// {cahr: "??????", occur: 29, index: 259},
// {cahr: "??????", occur: 41, index: 262},
// {cahr: "???", occur: 20, index: 266}
// ,{cahr: "???", occur: 382, index: 268},
// {cahr: "???", occur: 47, index: 274},
// {cahr: "???", occur: 53, index: 275},
// {cahr: "??????", occur: 39, index: 288},
// {cahr: "??????", occur: 302, index: 293},
// {cahr: "??????", occur: 20, index: 294},
// {cahr: "??????", occur: 24, index: 300},
// {cahr: "???", occur: 89, index: 308},
// {cahr: "???", occur: 101, index: 318},
//  {cahr: "???", occur: 27, index: 319}
// ,{cahr: "???", occur: 29, index: 321},
// {cahr: "??????", occur: 34, index: 333},
// {cahr: "???", occur: 60, index: 336},
// {cahr: "???", occur: 36, index: 337},
// {cahr: "???", occur: 40, index: 341},
// {cahr: "??????", occur: 38, index: 349},
// {cahr: "???", occur: 57, index: 350},
// {cahr: "???", occur: 70, index: 374},
// {cahr: "??????", occur: 408, index: 376},
//  {cahr: "???", occur: 557, index: 384}
// ,{cahr: "?????????", occur: 25, index: 385},
// {cahr: "???", occur: 98, index: 390},
// {cahr: "?????????", occur: 21, index: 393},
// {cahr: "??????", occur: 161, index: 399},
// {cahr: "???", occur: 250, index: 403},
// {cahr: "???", occur: 20, index: 441},
// {cahr: "??????", occur: 111, index: 481},
// {cahr: "???", occur: 592, index: 499},
// {cahr: "??????", occur: 32, index: 511}, 
// {cahr: "??????", occur: 116, index: 516}
// ,{cahr: "?????????", occur: 20, index: 533},
// {cahr: "??????", occur: 37, index: 568},
// {cahr: "??????", occur: 24, index: 578},
// {cahr: "???", occur: 41, index: 592},
// {cahr: "???", occur: 30, index: 597},
// {cahr: "???", occur: 107, index: 598},
// {cahr: "??????", occur: 50, index: 618},
// {cahr: "?????????", occur: 58, index: 621},
// {cahr: "???", occur: 48, index: 672},
// {cahr: "?????????", occur: 26, index: 674}
// ,{cahr: "???", occur: 177, index: 690}
// ,{cahr: "??????", occur: 42, index: 703}
// ,{cahr: "??????", occur: 75, index: 758}
// ,{cahr: "?????????", occur: 20, index: 760}
// ,{cahr: "???", occur: 127, index: 778}
// ,{cahr: "??????", occur: 23, index: 784}
// ,{cahr: "???", occur: 42, index: 813}
// ,{cahr: "???", occur: 104, index: 818}
// ,{cahr: "???", occur: 42, index: 819}
// , {cahr: "???", occur: 36, index: 823}
// ,{cahr: "???", occur: 46, index: 831}
// ,{cahr: "??????", occur: 34, index: 833}
// ,{cahr: "????????????", occur: 32, index: 834}
// ,{cahr: "???", occur: 42, index: 846}
// ,{cahr: "????????????", occur: 50, index: 873}
// ,{cahr: "??????", occur: 22, index: 883}
// ,{cahr: "?????????", occur: 33, index: 889}
// ,{cahr: "????????????", occur: 22, index: 905}
// ,{cahr: "???", occur: 41, index: 1001}
// ,{cahr: "???", occur: 42, index: 1047}
// ,{cahr: "??????", occur: 45, index: 1064}
// ,{cahr: "??????", occur: 173, index: 1092}
// ,{cahr: "??????", occur: 23, index: 1121}
// ,{cahr: "??????", occur: 26, index: 1155}
// ,{cahr: "?????????", occur: 32, index: 1164}
// ,{cahr: "??????", occur: 28, index: 1273}
// ,{cahr: "???", occur: 87, index: 1301}
// ,{cahr: "???", occur: 127, index: 1312}
// ,{cahr: "???", occur: 37, index: 1385}
// ,{cahr: "???", occur: 21, index: 1416}
// ,{cahr: "????????????", occur: 29, index: 1467}
// ,{cahr: "???", occur: 55, index: 1473}
// ,{cahr: "??????", occur: 24, index: 1482}
// ,{cahr: "???", occur: 162, index: 1521}
// ,{cahr: "?????????", occur: 29, index: 1522}
// ,{cahr: "???????????????", occur: 33, index: 1535}
// ,{cahr: "???", occur: 31, index: 1566}
// ,{cahr: "???", occur: 692, index: 1575}
// ,{cahr: "???", occur: 686, index: 1577}
// , {cahr: "???", occur: 34, index: 1592}
// ,{cahr: "???", occur: 22, index: 1609}
// ,{cahr: "???", occur: 100, index: 1663}
// ,{cahr: "??????", occur: 20, index: 1666}
// ,{cahr: "?????????", occur: 33, index: 1673}
// ,{cahr: "???", occur: 28, index: 1685}
// ,{cahr: "???", occur: 64, index: 1704}
// ,{cahr: "???", occur: 45, index: 1711}
// ,{cahr: "???", occur: 114, index: 1720}
// ,{cahr: "????????????", occur: 28, index: 1741}
// , {cahr: "??????", occur: 68, index: 1742}
// ,{cahr: "??????", occur: 30, index: 1757}
// ,{cahr: "??????", occur: 31, index: 1770}
// ,{cahr: "???", occur: 36, index: 1772}
// ,{cahr: "??????", occur: 71, index: 1776}
// ,{cahr: "???", occur: 177, index: 1810}
// ,{cahr: "???", occur: 40, index: 1828}
// ,{cahr: "???", occur: 72, index: 1846}
// ,{cahr: "???", occur: 82, index: 1851}
// ,{cahr: "??????", occur: 32, index: 1857}
// , {cahr: "???", occur: 24, index: 1866}
// ,{cahr: "??????", occur: 25, index: 1914}
// ,{cahr: "??????", occur: 20, index: 1953}
// ,{cahr: "???", occur: 49, index: 1954}
// ,{cahr: "???", occur: 151, index: 2012}
// ,{cahr: "??????", occur: 26, index: 2031}
// ,{cahr: "??????", occur: 41, index: 2036}
// ,{cahr: "??????", occur: 22, index: 2053}
// ,{cahr: "???", occur: 133, index: 2100}
// ,{cahr: "??????", occur: 37, index: 2167}
// ,{cahr: "???", occur: 22, index: 2175}
// ,{cahr: "???", occur: 126, index: 2220}
// ,{cahr: "???", occur: 231, index: 2226}
// ,{cahr: "???", occur: 27, index: 2237}
// ,{cahr: "??????", occur: 28, index: 2332}
// ,{cahr: "??????", occur: 39, index: 2358}
// ,{cahr: "???", occur: 22, index: 2392}
// ,{cahr: "???", occur: 20, index: 2442}
// ,{cahr: "???", occur: 29, index: 2471}
// ,{cahr: "??????", occur: 36, index: 2520}
// ,{cahr: "???", occur: 72, index: 2551}
// ,{cahr: "???", occur: 104, index: 2587}
// ,{cahr: "??????", occur: 22, index: 2592}
// ,{cahr: "??????", occur: 26, index: 2658}
// ,{cahr: "??????", occur: 44, index: 2674}
// ,{cahr: "?????????", occur: 35, index: 2734}
// ,{cahr: "?????????", occur: 26, index: 2742}
// ,{cahr: "??????", occur: 68, index: 2827}
// ,{cahr: "???", occur: 72, index: 2945}
// ,{cahr: "???", occur: 27, index: 2947}
// ,{cahr: "??????", occur: 57, index: 2956}
// ,{cahr: "??????", occur: 98, index: 2992}
// ,{cahr: "??????", occur: 55, index: 3018}
// ,{cahr: "???", occur: 42, index: 3037}
// ,{cahr: "???", occur: 45, index: 3045}
// ,{cahr: "???", occur: 64, index: 3053}
// ,{cahr: "??????", occur: 34, index: 3054}
// ,{cahr: "??????", occur: 35, index: 3077}
// ,{cahr: "??????", occur: 54, index: 3102}
// ,{cahr: "???", occur: 47, index: 3150}
// ,{cahr: "???", occur: 31, index: 3251}
// ,{cahr: "??????", occur: 57, index: 3283}
// ,{cahr: "??????", occur: 23, index: 3316}
// ,{cahr: "????????????", occur: 31, index: 3368}
// ,{cahr: "???", occur: 53, index: 3408}
// ,{cahr: "???????????????", occur: 23, index: 3411}
// ,{cahr: "????????????", occur: 22, index: 3442}
// ,{cahr: "???", occur: 70, index: 3486}
// ,{cahr: "??????", occur: 98, index: 3573}
// ,{cahr: "??????", occur: 21, index: 3719}
// ,{cahr: "??????", occur: 34, index: 3735}
// ,{cahr: "??????", occur: 25, index: 3809}
// ,{cahr: "???", occur: 127, index: 3865}
// ,{cahr: "???", occur: 44, index: 4013}
// ,{cahr: "??????", occur: 1372, index: 4159}
// ,{cahr: "???", occur: 571, index: 4293}
// ,{cahr: "???", occur: 177, index: 4299}
// ,{cahr: "???", occur: 244, index: 4302}
// ,{cahr: "???", occur: 70, index: 4391}
// ,{cahr: "???", occur: 35, index: 4448}
// ,{cahr: "???", occur: 78, index: 4498}
// ,{cahr: "??????", occur: 27, index: 4508}
// ,{cahr: "??????", occur: 30, index: 4516}
// ,{cahr: "???", occur: 46, index: 4517}
// ,{cahr: "???", occur: 47, index: 4538}
// ,{cahr: "???", occur: 48, index: 4563}
// ,{cahr: "???", occur: 83, index: 4580}
// ,{cahr: "???", occur: 222, index: 4592}
// ,{cahr: "???", occur: 70, index: 4781}
// ,{cahr: "??????", occur: 155, index: 4826}
// ,{cahr: "??????", occur: 60, index: 4831}
// ,{cahr: "??????", occur: 52, index: 4844}
// ,{cahr: "????????????", occur: 36, index: 4865}
// ,{cahr: "???", occur: 49, index: 4923}
// ,{cahr: "??????", occur: 35, index: 4949}
// ,{cahr: "??????", occur: 70, index: 4984}
// ,{cahr: "???", occur: 40, index: 5025}
// ,{cahr: "???", occur: 21, index: 5035}
// ,{cahr: "?????????", occur: 37, index: 5040}
// ,{cahr: "???", occur: 42, index: 5123}
// ,{cahr: "????????????", occur: 21, index: 5129}
// ,{cahr: "????????????", occur: 33, index: 5178}
// ,{cahr: "???", occur: 36, index: 5182}
// ,{cahr: "???", occur: 127, index: 5192}
// ,{cahr: "??????", occur: 23, index: 5219}
// ,{cahr: "???", occur: 48, index: 5277}
// ,{cahr: "???", occur: 41, index: 5284}
// ,{cahr: "???", occur: 37, index: 5304}
// ,{cahr: "???", occur: 63, index: 5308}
// ,{cahr: "??????", occur: 75, index: 5346}
// ,{cahr: "???", occur: 231, index: 5405}
// ,{cahr: "???", occur: 663, index: 5445}
// ,{cahr: "???", occur: 74, index: 5518}
// ,{cahr: "???", occur: 21, index: 5540}
// ,{cahr: "???", occur: 61, index: 5544}
// ,{cahr: "???", occur: 23, index: 5735}
// ,{cahr: "???", occur: 26, index: 5835}
// ,{cahr: "???", occur: 25, index: 5879}
// ,{cahr: "???", occur: 68, index: 5963}]



// //console.log(listOfChars)



// let final = [];
 
// for (let i=0; i< listOfChars.length; i++){ 
//   listOfChars[i].translation =trans[listOfChars[i].index-1]
// }


// //console.log(listOfChars)

// let x = listOfChars.sort((a, b) => {
//   return b.occur - a.occur});
