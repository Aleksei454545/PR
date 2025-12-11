const $ = (id) => document.getElementById(id);

const $btn = $('btn-kick');
const $btnUlt = $('btn-ult');
const $logs = $('logs');

const $kickLeft = $('kick-left');
const $ultLeft  = $('ult-left');

// --- ЛІМІТИ НАТИСКАНЬ ---
const KICK_LIMIT = 5;  // трохи більше 4 :)
const ULT_LIMIT  = 2;  // як приклад

// Початкові значення виводимо одразу при завантаженні
if ($kickLeft) $kickLeft.textContent = KICK_LIMIT;
if ($ultLeft)  $ultLeft.textContent  = ULT_LIMIT;

const random = (num) => Math.ceil(Math.random() * num);


// --- ГРАВЦІ ТА HP ---

const createPlayer = ({ name, defaultHP, hpId, barId }) => {
  const elHP = $(hpId);
  const elProgressbarHP = $(barId);

  let damageHP = defaultHP;

  const renderHPLife = () => {
    elHP.innerText = `${damageHP} / ${defaultHP}`;
  };

  const renderProgressbarHP = () => {
    const percent = (damageHP / defaultHP) * 100;
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
    get damageHP() {
      return damageHP;
    },
    changeHP,
    renderHP,
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


// --- ЛОГИ БОЮ ---

function makeLogLine({ attacker, target, damage, left, total }) {
  const template = logs[random(logs.length) - 1];
  return (
    template
      .replace('[ПЕРСОНАЖ №1]', attacker)
      .replace('[ПЕРСОНАЖ №2]', target) +
    ` — −${damage} HP, залишок ${target}: ${left} / ${total}`
  );
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
  if (targets.every((p) => p.damageHP === 0)) {
    disableButtons();
    alert('Перемога! Всі вороги повержені!');
  }
}

function enemyCounterAttack() {
  if (!isAlive(mainHero)) return;

  targets.filter(isAlive).forEach((t) => {
    if (!isAlive(mainHero)) return;
    const dmg = random(15);
    mainHero.changeHP(dmg, t.name);
  });
}


// --- ЗАМІКАННЯ ДЛЯ ЛІЧИЛЬНИКІВ ---

function createClickCounter(limit, onChange) {
  let count = 0; // закрита змінна (замикання!)

  return function (buttonName) {
    if (count >= limit) {
      console.log(
        `Кнопка "${buttonName}" більше не активна! Ліміт ${limit} натискань.`
      );
      if (onChange) onChange(0);
      return false;
    }

    count++;
    const left = limit - count;

    console.log(
      `Кнопка "${buttonName}" натиснута ${count} раз(и). Залишилось: ${left}`
    );
    if (onChange) onChange(left);
    return true;
  };
}

// Створюємо замикання для кожної кнопки
const kickCounter = createClickCounter(KICK_LIMIT, (left) => {
  if ($kickLeft) $kickLeft.textContent = left;
});
const ultCounter = createClickCounter(ULT_LIMIT, (left) => {
  if ($ultLeft) $ultLeft.textContent = left;
});


// --- ОБРОБНИКИ КНОПОК З УРАХУВАННЯМ ЛІМІТУ ---

$btn.addEventListener('click', () => {
  if (!isAlive(mainHero)) return;

  // 1) Перевіряємо замиканням, чи ще можна натискати
  const canClick = kickCounter('Thunder Jolt');
  if (!canClick) {
    $btn.disabled = true;
    return;
  }

  // 2) Логіка атаки
  targets.filter(isAlive).forEach((t) => {
    const dmg = random(20);
    t.changeHP(dmg, mainHero.name);
  });

  checkEnd();
  if ($btn.disabled) return;

  enemyCounterAttack();
});

$btnUlt.addEventListener('click', () => {
  if (!isAlive(mainHero)) return;

  const canClick = ultCounter('Ult Kick');
  if (!canClick) {
    $btnUlt.disabled = true;
    return;
  }

  targets.filter(isAlive).forEach((t) => {
    const dmg = random(35);
    t.changeHP(dmg, mainHero.name);
  });

  checkEnd();
  if ($btn.disabled) return;

  enemyCounterAttack();
});


// --- ПОЧАТКОВИЙ РЕНДЕР HP ---
mainHero.renderHP();
enemy.renderHP();
enemy2.renderHP();

