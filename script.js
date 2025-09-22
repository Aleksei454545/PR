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


const players = [character, enemy, enemy2];


$btn.addEventListener('click', function () {
    console.log('Thunder Jolt!');
    players.forEach(p => changeHP(random(20), p));
});

$btnUlt.addEventListener('click', function () {
    console.log('Ult Kick!');
    players.forEach(p => changeHP(random(35), p));
});

function init() {
    console.log('Start Game!');
    players.forEach(renderHP);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressbarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressbarHP(person) {
    const percent = (person.damageHP / person.defaultHP) * 100;
    person.elProgressbarHP.style.width = percent + '%';


    if (percent > 60) {
        person.elProgressbarHP.className = 'health'; 
    } else if (percent > 20) {
        person.elProgressbarHP.className = 'health low'; 
    } else {
        person.elProgressbarHP.className = 'health critical'; 
    }
}

function changeHP(count, person) {
    if (person.damageHP <= count) {
        person.damageHP = 0;
        renderHP(person);
        alert('Бедный ' + person.name + ' проиграл бой!');
        $btn.disabled = true;
        $btnUlt.disabled = true;
    } else {
        person.damageHP -= count;
        renderHP(person);
    }
}

function random(num) {
    return Math.ceil(Math.random() * num);
}

init();
