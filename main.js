'use strict'
{
const setupBtn = document.getElementById('setup'); 
const randomBtn = document.getElementById('random');
const clearBtn = document.getElementById('clear');
const ul = document.querySelector('ul');
const studentsNumInput = document.getElementById('studentsNum');
let studentsArray = [];
// ページが読み込まれた時のdefault設定を作成
generateStudents();
let girls = studentsArray.filter((student) => student.gender === 'girl');
let boys = studentsArray.filter((student) => student.gender === 'boy');
let students =[...boys,...girls];
let shuffledBoys = shuffleArray(boys);
let shuffledGirls = shuffleArray(girls);
let shuffledStudents = shuffleArray(students);

//生徒の数を入れた時の変化をチェックする処理
studentsNumInput.addEventListener('change', (event) => {
  generateStudents(event.target.value);
  // 各変数の値の更新
  girls = studentsArray.filter((student) => student.gender === 'girl');
  boys = studentsArray.filter((student) => student.gender === 'boy');
  students =[...boys,...girls];
  shuffledStudents = shuffleArray(students);
});
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
  shuffledStudents = shuffleArray(students);
  random();
});

//クリアボタン
clearBtn.addEventListener('click', ()=>{
  clear();
});

//生徒情報を作成する関数
function generateStudents() {
  const studentsNum = studentsNumInput.value;
  studentsArray = [];
  for( let i = 1; i <= studentsNum; i++) {
    // 性別をランダムに決める為の配列
    const genders = [ "boy", "girl" ] ;
    // 性別をランダムに決める処理
    const gender = genders[ Math.floor( Math.random() * genders.length ) ] ;
    //生徒のオブジェクトを動的に生成する
    const student = {
      id: i,
      gender,
    }
    studentsArray.push(student);
  }
  return studentsArray;
}

function clear() {
  ul.innerHTML = '';
}

// セットアップ　席を作成する
function setup() {
  shuffledStudents.forEach(() => {
    const li = document.createElement('li');
    const status = ['boy', 'girl'];
    let statusBoy = false;
    ul.appendChild(li);
    li.dataset.toggle = 'tooltip';
    li.dataset.placement = 'top';
    li.title = 'Click to change the gender.';
    li.classList.add(status[0]);
    //ツールチップ処理
    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });
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
    list.innerHTML = '';
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