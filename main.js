'use strict'
{
const setupBtn = document.getElementById('setup');  const randomBtn = document.getElementById('random');
const clearBtn = document.getElementById('clear');
const ul = document.querySelector('ul');

const boys = [1,3,5,7,9,11,13,15,17,19,21,23,25,27,29,31,33,35];
const girls = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34];
const students =[...boys,...girls];
let shuffledBoys = shuffleArray(boys);
let shuffledGirls = shuffleArray(girls);
let shuffledStudents = shuffleArray(students);


// ページが読み込まれた時のsetup
setupBtn.addEventListener('click', ()=>{
  clear();
  setup();
});

//ランダムボタン
randomBtn.addEventListener('click', ()=>{
  //表示を消す処理が必要
  clearText();
  shuffledBoys = shuffleArray(boys);
  shuffledGirls = shuffleArray(girls);
  random();
});

//クリアボタン
clearBtn.addEventListener('click', ()=>{
  clear();
});

function clear() {
  
  while(ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }
}
// セットアップ　席を作成する
function setup() {
  shuffledStudents.forEach((studentNum) => {
    const li = document.createElement('li');
    ul.appendChild(li);
    const status = ['boy', 'girl'];
    let statusBoy = false;
    li.classList.add(status[0]);
  //クリックするごとにboyかgirlのクラスを与える
    li.addEventListener('click', () => {
      if (statusBoy) {
        li.classList.replace('girl', 'boy');
        statusBoy = !statusBoy //つまりスタータスは女にする
      } else {
        li.classList.replace('boy', 'girl');
        statusBoy = !statusBoy //つまりスタータスは男にする
      }
    });
  });
}

function random() {
  const lists = document.querySelectorAll('li');
  lists.forEach(list => {
    if(list.classList.contains('boy')) {
      list.innerHTML += `<div>${shuffledBoys[0]}</div>`;
      shuffledBoys.shift();
    } else {
      list.innerHTML += `<div>${shuffledGirls[0]}</div>`;
      shuffledGirls.shift();  
    }
  });
}
function clearText() {
  const lists = document.querySelectorAll('li');
  lists.forEach((list) => {
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }
  });
}

//配列をシャッフルする関数
function shuffleArray(sourceArr) {
  const array = sourceArr.concat();
  const arrayLength = array.length;
  for (let i = arrayLength - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]]
  }
  return array;
}

}