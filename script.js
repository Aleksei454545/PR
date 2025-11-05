const $ = (id) => document.getElementById(id);
const $btn = $('btn-kick');
const $btnUlt = $('btn-ult');
const $logs = $('logs');


const random = (num) => Math.ceil(Math.random() * num);


const createPlayer = ({ name, defaultHP, hpId, barId }) => {
  const elHP = $(hpId);
  const elProgressbarHP = $(barId);

  let damageHP = defaultHP;

  const renderHPLife = () => {
    elHP.innerText = `${damageHP} / ${defaultHP}`;
  };

  const renderProgressbarHP = () => {
    const percent = damageHP / defaultHP * 100;
    elProgressbarHP.style.width = percent + '%';

    if (percent > 60) elProgressbarHP.className = 'health';
    else if (percent > 20) elProgressbarHP.className = 'health low';
    else elProgressbarHP.className = 'health critical';
  };

  const renderHP = () => {
    renderHPLife();
    renderProgressbarHP();
  };

  const changeHP = (count, attackerName) => {
    const prevHP = damageHP;

    if (damageHP <= count) {
      damageHP = 0;
      printLog({
        attacker: attackerName,
        target: name,
        damage: prevHP,
        left: 0,
        total: defaultHP
      });
      renderHP();
      alert(`${name} повержен!`);
      disableButtons();
    } else {
      damageHP -= count;
      printLog({
        attacker: attackerName,
        target: name,
        damage: count,
        left: damageHP,
        total: defaultHP
      });
      renderHP();
    }
  };

  return {
    name,
    defaultHP,
    get damageHP() { return damageHP; },
    changeHP,
    renderHP
  };
};


const mainHero = createPlayer({
  name: 'Pikachu',
  defaultHP: 100,
  hpId: 'health-character',
  barId: 'progressbar-character',
});

const enemy = createPlayer({
  name: 'Charmander',
  defaultHP: 100,
  hpId: 'health-enemy',
  barId: 'progressbar-enemy',
});

const enemy2 = createPlayer({
  name: 'Bulbasaur',
  defaultHP: 100,
  hpId: 'health-enemy2',
  barId: 'progressbar-enemy2',
});

const targets = [enemy, enemy2];

// Лог
function makeLogLine({ attacker, target, damage, left, total }) {
  const template = logs[random(logs.length) - 1];
  return template
    .replace('[ПЕРСОНАЖ №1]', attacker)
    .replace('[ПЕРСОНАЖ №2]', target)
    + ` — −${damage} HP, залишок ${target}: ${left} / ${total}`;
}

function printLog(data) {
  const p = document.createElement('p');
  p.innerText = makeLogLine(data);
  $logs.prepend(p);
}


const isAlive = (p) => p.damageHP > 0;

function disableButtons() {
  $btn.disabled = true;
  $btnUlt.disabled = true;
}

function checkEnd() {
  if (targets.every(p => p.damageHP === 0)) {
    disableButtons();
    alert('Перемога! Всі вороги повержені!');
  }
}


function enemyCounterAttack() {
  if (!isAlive(mainHero)) return;

  targets.filter(isAlive).forEach(t => {
    if (!isAlive(mainHero)) return;
    const dmg = random(15);
    mainHero.changeHP(dmg, t.name);
  });
}


$btn.addEventListener('click', () => {
  if (!isAlive(mainHero)) return;

  targets.filter(isAlive).forEach(t => {
    const dmg = random(20);
    t.changeHP(dmg, mainHero.name);
  });

  checkEnd();
  if ($btn.disabled) return;

  enemyCounterAttack();
});

// Ульта
$btnUlt.addEventListener('click', () => {
  if (!isAlive(mainHero)) return;

  targets.filter(isAlive).forEach(t => {
    const dmg = random(35);
    t.changeHP(dmg, mainHero.name);
  });

  checkEnd();
  if ($btn.disabled) return;

  enemyCounterAttack();
});


mainHero.renderHP();
enemy.renderHP();
enemy2.renderHP();
