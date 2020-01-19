'use strict'
{
const setupBtn = document.getElementById('setup');  const randomBtn = document.getElementById('random');
const clearBtn = document.getElementById('clear');
const ul = document.querySelector('ul');

const studentsArray = [
  {id: 1, gender: 'girl'},
  {id: 2, gender: 'boy'},
  {id: 3, gender: 'girl'},
  {id: 4, gender: 'boy'},
  {id: 5, gender: 'girl'},
  {id: 6, gender: 'boy'},
  {id: 7, gender: 'girl'},
  {id: 8, gender: 'boy'},
  {id: 9, gender: 'girl'},
  {id: 10, gender: 'boy'},
];

const girls = studentsArray.filter((student) => student.gender === 'girl');
console.log(girls);
const boys = studentsArray.filter((student) => student.gender === 'boy');
console.log(boys);
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
 ul.innerHTML = '';
}

// セットアップ　席を作成する
function setup() {
  shuffledStudents.forEach(() => {
    const li = document.createElement('li');
    ul.appendChild(li);
    li.dataset.toggle = 'tooltip';
    li.dataset.placement = 'top';
    li.title = 'Click to change the gender.';
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
      // クラスにboyが付いている場合
      if(list.classList.contains('boy')) {
        // shuffledBoysが空なのかどうか判定
          if(shuffledBoys[0] !== undefined) {
          list.innerHTML += `<div>${ shuffledBoys[0].id }</div>`;
          shuffledBoys.shift();
        } else { //shuffledBoysが空なら×を表示する
          list.innerHTML += `<div>×</div>`;
        }
      }
      // クラスにgirlが付いている場合
      if(list.classList.contains('girl')) {
        // shuffledgirlsが空なのかどうか判定
          if(shuffledGirls[0] !== undefined) {
          list.innerHTML += `<div>${ shuffledGirls[0].id }</div>`;
          shuffledGirls.shift();
        } else { //shuffledGirlsが空なら×を表示する
          list.innerHTML += `<div>×</div>`;
        }
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

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
}