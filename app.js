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


// let listOfChars= [{cahr: "これ", occur: 223, index: 4}
// ,{cahr: "あれ", occur: 27, index: 6}
// ,{cahr: "先", occur: 99, index: 7}
// ,{cahr: "ここ", occur: 58, index: 13}
// ,{cahr: "手", occur: 176, index: 16}
// ,{cahr: "私", occur: 244, index: 23}
// ,{cahr: "好き", occur: 35, index: 24}
// ,{cahr: "上", occur: 231, index: 33}
// ,{cahr: "口", occur: 171, index: 36}
// ,{cahr: "後ろ", occur: 24, index: 40}
// ,{cahr: "何", occur: 177, index: 49}
// ,{cahr: "それ", occur: 251, index: 55}
// ,{cahr: "男", occur: 357, index: 56}
// ,{cahr: "こう", occur: 45, index: 58}
// ,{cahr: "もっと", occur: 39, index: 71}
// ,{cahr: "前", occur: 187, index: 86}
// ,{cahr: "熱い", occur: 54, index: 91}
// ,{cahr: "悪い", occur: 20, index: 100}
// ,{cahr: "思う", occur: 24, index: 101}
// ,{cahr: "そう", occur: 257, index: 102}
// ,{cahr: "どう", occur: 126, index: 103}
// ,{cahr: "強い", occur: 22, index: 122}
// ,{cahr: "二", occur: 20, index: 129}
// ,{cahr: "本当に", occur: 22, index: 134}
// ,{cahr: "他", occur: 37, index: 135}
// ,{cahr: "そこ", occur: 30, index: 147}
// ,{cahr: "出る", occur: 33, index: 151}
// ,{cahr: "時", occur: 65, index: 153},
//  {cahr: "一", occur: 163, index: 157}
// ,{cahr: "後", occur: 82, index: 168},
// {cahr: "色", occur: 34, index: 170},
// {cahr: "左", occur: 21, index: 177},
// {cahr: "ところ", occur: 34, index: 184},
// {cahr: "家", occur: 20, index: 186},{cahr: "服", occur: 88, index: 188},
// {cahr: "母", occur: 34, index: 193},{cahr: "女", occur: 444, index: 207},
// {cahr: "今", occur: 42, index: 209}, {cahr: "もう", occur: 173, index: 210}
// ,{cahr: "よく", occur: 45, index: 212},{cahr: "彼女", occur: 49, index: 213},
// {cahr: "気持ち", occur: 175, index: 219},{cahr: "足", occur: 53, index: 227},
// {cahr: "出来る", occur: 22, index: 228},{cahr: "いつも", occur: 35, index: 230},
// {cahr: "いつ", occur: 97, index: 232},{cahr: "来る", occur: 26, index: 239},
// {cahr: "良い", occur: 26, index: 240}, {cahr: "方", occur: 127, index: 241}
// ,{cahr: "目", occur: 77, index: 242},{cahr: "日", occur: 41, index: 246},
// {cahr: "自分", occur: 123, index: 248},
// {cahr: "違う", occur: 52, index: 252},
// {cahr: "別", occur: 45, index: 254},
// {cahr: "なる", occur: 161, index: 255},
// {cahr: "ため", occur: 20, index: 256},
// {cahr: "出す", occur: 29, index: 259},
// {cahr: "少し", occur: 41, index: 262},
// {cahr: "水", occur: 20, index: 266}
// ,{cahr: "気", occur: 382, index: 268},
// {cahr: "首", occur: 47, index: 274},
// {cahr: "頭", occur: 53, index: 275},
// {cahr: "どこ", occur: 39, index: 288},
// {cahr: "する", occur: 302, index: 293},
// {cahr: "やる", occur: 20, index: 294},
// {cahr: "戻る", occur: 24, index: 300},
// {cahr: "本", occur: 89, index: 308},
// {cahr: "人", occur: 101, index: 318},
//  {cahr: "夫", occur: 27, index: 319}
// ,{cahr: "誰", occur: 29, index: 321},
// {cahr: "言葉", occur: 34, index: 333},
// {cahr: "胸", occur: 60, index: 336},
// {cahr: "腰", occur: 36, index: 337},
// {cahr: "背", occur: 40, index: 341},
// {cahr: "言う", occur: 38, index: 349},
// {cahr: "彼", occur: 57, index: 350},
// {cahr: "下", occur: 70, index: 374},
// {cahr: "よう", occur: 408, index: 376},
//  {cahr: "体", occur: 557, index: 384}
// ,{cahr: "大丈夫", occur: 25, index: 385},
// {cahr: "顔", occur: 98, index: 390},
// {cahr: "欲しい", occur: 21, index: 393},
// {cahr: "なる", occur: 161, index: 399},
// {cahr: "分", occur: 250, index: 403},
// {cahr: "家", occur: 20, index: 441},
// {cahr: "パン", occur: 111, index: 481},
// {cahr: "子", occur: 592, index: 499},
// {cahr: "仕方", occur: 32, index: 511}, 
// {cahr: "まま", occur: 116, index: 516}
// ,{cahr: "つもり", occur: 20, index: 533},
// {cahr: "無理", occur: 37, index: 568},
// {cahr: "何度", occur: 24, index: 578},
// {cahr: "日", occur: 41, index: 592},
// {cahr: "外", occur: 30, index: 597},
// {cahr: "熱", occur: 107, index: 598},
// {cahr: "考え", occur: 50, index: 618},
// {cahr: "女の子", occur: 58, index: 621},
// {cahr: "可", occur: 48, index: 672},
// {cahr: "クラス", occur: 26, index: 674}
// ,{cahr: "何", occur: 177, index: 690}
// ,{cahr: "本当", occur: 42, index: 703}
// ,{cahr: "もし", occur: 75, index: 758}
// ,{cahr: "きっと", occur: 20, index: 760}
// ,{cahr: "方", occur: 127, index: 778}
// ,{cahr: "早く", occur: 23, index: 784}
// ,{cahr: "音", occur: 42, index: 813}
// ,{cahr: "変", occur: 104, index: 818}
// ,{cahr: "音", occur: 42, index: 819}
// , {cahr: "薬", occur: 36, index: 823}
// ,{cahr: "話", occur: 46, index: 831}
// ,{cahr: "全然", occur: 34, index: 833}
// ,{cahr: "こんなに", occur: 32, index: 834}
// ,{cahr: "白", occur: 42, index: 846}
// ,{cahr: "やっぱり", occur: 50, index: 873}
// ,{cahr: "教室", occur: 22, index: 883}
// ,{cahr: "ずっと", occur: 33, index: 889}
// ,{cahr: "どんどん", occur: 22, index: 905}
// ,{cahr: "物", occur: 41, index: 1001}
// ,{cahr: "赤", occur: 42, index: 1047}
// ,{cahr: "よく", occur: 45, index: 1064}
// ,{cahr: "もう", occur: 173, index: 1092}
// ,{cahr: "以上", occur: 23, index: 1121}
// ,{cahr: "良い", occur: 26, index: 1155}
// ,{cahr: "さっき", occur: 32, index: 1164}
// ,{cahr: "何か", occur: 28, index: 1273}
// ,{cahr: "指", occur: 87, index: 1301}
// ,{cahr: "間", occur: 127, index: 1312}
// ,{cahr: "他", occur: 37, index: 1385}
// ,{cahr: "裏", occur: 21, index: 1416}
// ,{cahr: "ちょっと", occur: 29, index: 1467}
// ,{cahr: "味", occur: 55, index: 1473}
// ,{cahr: "確か", occur: 24, index: 1482}
// ,{cahr: "愛", occur: 162, index: 1521}
// ,{cahr: "可愛い", occur: 29, index: 1522}
// ,{cahr: "恥ずかしい", occur: 33, index: 1535}
// ,{cahr: "肉", occur: 31, index: 1566}
// ,{cahr: "花", occur: 692, index: 1575}
// ,{cahr: "桜", occur: 686, index: 1577}
// , {cahr: "葉", occur: 34, index: 1592}
// ,{cahr: "血", occur: 22, index: 1609}
// ,{cahr: "声", occur: 100, index: 1663}
// ,{cahr: "やる", occur: 20, index: 1666}
// ,{cahr: "激しい", occur: 33, index: 1673}
// ,{cahr: "急", occur: 28, index: 1685}
// ,{cahr: "嫌", occur: 64, index: 1704}
// ,{cahr: "姿", occur: 45, index: 1711}
// ,{cahr: "奥", occur: 114, index: 1720}
// ,{cahr: "シャワー", occur: 28, index: 1741}
// , {cahr: "ただ", occur: 68, index: 1742}
// ,{cahr: "まく", occur: 30, index: 1757}
// ,{cahr: "くし", occur: 31, index: 1770}
// ,{cahr: "舌", occur: 36, index: 1772}
// ,{cahr: "より", occur: 71, index: 1776}
// ,{cahr: "中", occur: 177, index: 1810}
// ,{cahr: "壁", occur: 40, index: 1828}
// ,{cahr: "力", occur: 72, index: 1846}
// ,{cahr: "後", occur: 82, index: 1851}
// ,{cahr: "我慢", occur: 32, index: 1857}
// , {cahr: "頃", occur: 24, index: 1866}
// ,{cahr: "丈夫", occur: 25, index: 1914}
// ,{cahr: "合う", occur: 20, index: 1953}
// ,{cahr: "穴", occur: 49, index: 1954}
// ,{cahr: "大", occur: 151, index: 2012}
// ,{cahr: "たこ", occur: 26, index: 2031}
// ,{cahr: "女子", occur: 41, index: 2036}
// ,{cahr: "気分", occur: 22, index: 2053}
// ,{cahr: "事", occur: 133, index: 2100}
// ,{cahr: "無理", occur: 37, index: 2167}
// ,{cahr: "用", occur: 22, index: 2175}
// ,{cahr: "内", occur: 126, index: 2220}
// ,{cahr: "上", occur: 231, index: 2226}
// ,{cahr: "能", occur: 27, index: 2237}
// ,{cahr: "何か", occur: 28, index: 2332}
// ,{cahr: "勝手", occur: 39, index: 2358}
// ,{cahr: "差", occur: 22, index: 2392}
// ,{cahr: "計", occur: 20, index: 2442}
// ,{cahr: "量", occur: 29, index: 2471}
// ,{cahr: "覚え", occur: 36, index: 2520}
// ,{cahr: "生", occur: 72, index: 2551}
// ,{cahr: "欲", occur: 104, index: 2587}
// ,{cahr: "画面", occur: 22, index: 2592}
// ,{cahr: "始め", occur: 26, index: 2658}
// ,{cahr: "制服", occur: 44, index: 2674}
// ,{cahr: "いつも", occur: 35, index: 2734}
// ,{cahr: "クラス", occur: 26, index: 2742}
// ,{cahr: "ただ", occur: 68, index: 2827}
// ,{cahr: "生", occur: 72, index: 2945}
// ,{cahr: "能", occur: 27, index: 2947}
// ,{cahr: "まれ", occur: 57, index: 2956}
// ,{cahr: "お前", occur: 98, index: 2992}
// ,{cahr: "つい", occur: 55, index: 3018}
// ,{cahr: "対", occur: 42, index: 3037}
// ,{cahr: "行", occur: 45, index: 3045}
// ,{cahr: "性", occur: 64, index: 3053}
// ,{cahr: "別に", occur: 34, index: 3054}
// ,{cahr: "男子", occur: 35, index: 3077}
// ,{cahr: "思い", occur: 54, index: 3102}
// ,{cahr: "面", occur: 47, index: 3150}
// ,{cahr: "原", occur: 31, index: 3251}
// ,{cahr: "意識", occur: 57, index: 3283}
// ,{cahr: "反応", occur: 23, index: 3316}
// ,{cahr: "ますます", occur: 31, index: 3368}
// ,{cahr: "頭", occur: 53, index: 3408}
// ,{cahr: "たまらない", occur: 23, index: 3411}
// ,{cahr: "どんどん", occur: 22, index: 3442}
// ,{cahr: "下", occur: 70, index: 3486}
// ,{cahr: "感じ", occur: 98, index: 3573}
// ,{cahr: "さす", occur: 21, index: 3719}
// ,{cahr: "感覚", occur: 34, index: 3735}
// ,{cahr: "振り", occur: 25, index: 3809}
// ,{cahr: "間", occur: 127, index: 3865}
// ,{cahr: "注", occur: 44, index: 4013}
// ,{cahr: "ああ", occur: 1372, index: 4159}
// ,{cahr: "身", occur: 571, index: 4293}
// ,{cahr: "中", occur: 177, index: 4299}
// ,{cahr: "私", occur: 244, index: 4302}
// ,{cahr: "恥", occur: 70, index: 4391}
// ,{cahr: "楽", occur: 35, index: 4448}
// ,{cahr: "心", occur: 78, index: 4498}
// ,{cahr: "キス", occur: 27, index: 4508}
// ,{cahr: "まく", occur: 30, index: 4516}
// ,{cahr: "実", occur: 46, index: 4517}
// ,{cahr: "根", occur: 47, index: 4538}
// ,{cahr: "息", occur: 48, index: 4563}
// ,{cahr: "腹", occur: 83, index: 4580}
// ,{cahr: "液", occur: 222, index: 4592}
// ,{cahr: "下", occur: 70, index: 4781}
// ,{cahr: "いか", occur: 155, index: 4826}
// ,{cahr: "刺激", occur: 60, index: 4831}
// ,{cahr: "興奮", occur: 52, index: 4844}
// ,{cahr: "たっぷり", occur: 36, index: 4865}
// ,{cahr: "弾", occur: 49, index: 4923}
// ,{cahr: "絶対", occur: 35, index: 4949}
// ,{cahr: "勢い", occur: 70, index: 4984}
// ,{cahr: "端", occur: 40, index: 5025}
// ,{cahr: "枝", occur: 21, index: 5035}
// ,{cahr: "着替え", occur: 37, index: 5040}
// ,{cahr: "音", occur: 42, index: 5123}
// ,{cahr: "いけない", occur: 21, index: 5129}
// ,{cahr: "いきなり", occur: 33, index: 5178}
// ,{cahr: "唇", occur: 36, index: 5182}
// ,{cahr: "間", occur: 127, index: 5192}
// ,{cahr: "あり", occur: 23, index: 5219}
// ,{cahr: "悪", occur: 48, index: 5277}
// ,{cahr: "日", occur: 41, index: 5284}
// ,{cahr: "筋", occur: 37, index: 5304}
// ,{cahr: "小", occur: 63, index: 5308}
// ,{cahr: "妊娠", occur: 75, index: 5346}
// ,{cahr: "上", occur: 231, index: 5405}
// ,{cahr: "俺", occur: 663, index: 5445}
// ,{cahr: "元", occur: 74, index: 5518}
// ,{cahr: "波", occur: 21, index: 5540}
// ,{cahr: "陰", occur: 61, index: 5544}
// ,{cahr: "裸", occur: 23, index: 5735}
// ,{cahr: "地", occur: 26, index: 5835}
// ,{cahr: "砂", occur: 25, index: 5879}
// ,{cahr: "股", occur: 68, index: 5963}]



// //console.log(listOfChars)



// let final = [];
 
// for (let i=0; i< listOfChars.length; i++){ 
//   listOfChars[i].translation =trans[listOfChars[i].index-1]
// }


// //console.log(listOfChars)

// let x = listOfChars.sort((a, b) => {
//   return b.occur - a.occur});
