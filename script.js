const $btn = document.getElementById('btn-kick');
const $btnUlt = document.getElementById('btn-ult');

const character = {
  name: 'Pikachu',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-character'),
  elProgressbarHP: document.getElementById('progressbar-character'),
};

const enemy = {
  name: 'Charmander',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy'),
  elProgressbarHP: document.getElementById('progressbar-enemy'),
};

const enemy2 = {
  name: 'Bulbasaur',
  defaultHP: 100,
  damageHP: 100,
  elHP: document.getElementById('health-enemy2'),
  elProgressbarHP: document.getElementById('progressbar-enemy2'),
};

function renderHP() {
  this.renderHPLife();
  this.renderProgressbarHP();
}

function renderHPLife() {
  this.elHP.innerText = `${this.damageHP} / ${this.defaultHP}`;
}

function renderProgressbarHP() {
  const percent = (this.damageHP / this.defaultHP) * 100;
  this.elProgressbarHP.style.width = percent + '%';

  if (percent > 60) {
    this.elProgressbarHP.className = 'health';
  } else if (percent > 20) {
    this.elProgressbarHP.className = 'health low';
  } else {
    this.elProgressbarHP.className = 'health critical';
  }
}

function changeHP(count) {
  if (this.damageHP <= count) {
    this.damageHP = 0;
    this.renderHP();
    alert('Бідний ' + this.name + ' програв бій!');
    $btn.disabled = true;
    $btnUlt.disabled = true;
  } else {
    this.damageHP -= count;
    this.renderHP();
  }
}

const sharedMethods = { renderHP, renderHPLife, renderProgressbarHP, changeHP };
Object.assign(character, sharedMethods);
Object.assign(enemy, sharedMethods);
Object.assign(enemy2, sharedMethods);

const players = [character, enemy, enemy2];

$btn.addEventListener('click', function () {
  console.log('Thunder Jolt!');
  players.forEach(p => p.changeHP(random(20)));
});

$btnUlt.addEventListener('click', function () {
  console.log('Ult Kick!');
  players.forEach(p => p.changeHP(random(35)));
});

function init() {
  console.log('Start Game!');
  players.forEach(p => p.renderHP());
}

function random(num) {
  return Math.ceil(Math.random() * num);
}

init();
