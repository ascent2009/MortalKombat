import { logs } from "./logs.js";
const $arenas = document.querySelector(".arenas");
const $submitButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];
const log = logs;

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword"],
  attack() {
    console.log(this.name + " " + "Fight...");
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["spear"],
  attack() {
    console.log(this.name + " " + "Fight...");
  },
  changeHP,
  elHP,
  renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(player) {
  const $player = createElement("div", "player" + player.player);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  $life.style.width = player.hp + "%";

  const $name = createElement("div", "name");
  $name.innerHTML = player.name;

  const $img = createElement("img");
  $img.src = player.img;

  $player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);

  return $player;
}

function getRandom(num) {
  const randomNum = Math.ceil(Math.random() * num);
  return randomNum;
}

function changeHP(num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }
  return this.hp;
}

function elHP() {
  const $playerLife = document.querySelector(
    ".player" + this.player + " .life"
  );

  return $playerLife;
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
  return this.elHP();
}

function playResult(name) {
  const $resultTitle = createElement("div", "loseTitle");
  if (name) {
    $resultTitle.innerText = name + " wins";
  } else {
    $resultTitle.innerText = "draw!";
  }

  return $resultTitle;
}

function createReloadButton() {
  const $reloadWrap = document.createElement("div");
  const $reloadButton = document.createElement("button");
  $reloadWrap.classList.add("reloadWrap");
  $reloadButton.classList.add("button");
  $arenas.append($reloadWrap);
  $reloadWrap.append($reloadButton);
  $reloadButton.innerText = "Restart";
  return $reloadButton;
}

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttack() {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  return attack;
}

function showResult() {
  if (player1.hp === 0 || player2.hp === 0) {
    $submitButton.disabled = true;
    $submitButton.innerHTML = "Game is over!";
    $submitButton.style.backgroundColor = "grey";
    $formFight.style.opacity = "0.5";

    createReloadButton().addEventListener("click", function () {
      window.location.reload();
    });
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.append(playResult(player2.name));
    generateLogs("end", player2, player1);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.append(playResult(player1.name));
    generateLogs("end", player1, player2);
  } else if (player1.hp === 0 && player1.hp === player2.hp) {
    $arenas.append(playResult());
    generateLogs("draw");
  }
}

function generateLogs(type, player1, player2) {
  const time = new Date().toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
  });
  let text = "";

  switch (type) {
    case "hit":
      text = `${time} - ${log[type][getRandom(log.hit.length - 1)]
        .replace("[playerKick]", player1.name)
        .replace("[playerDefence]", player2.name)} ${player2.hp - 100}[${
        player2.hp
      }/100]`;
      break;
    case "end":
      text = log[type][getRandom(log.end.length - 1)]
        .replace("[playerWins]", player1.name)
        .replace("[playerLose]", player2.name);
      break;
    case "draw":
      text = "Ничья - это тоже победа!";
      break;
    default:
      text = log[type]
        .replace("[time]", time)
        .replace("[player1]", player1.name)
        .replace("[player2]", player2.name);
  }
  const el = `<p>${text}</p>`;
  $chat.insertAdjacentHTML("afterbegin", el);
}

generateLogs("start", player1, player2);

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player2, player1);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player1, player2);
  }

  showResult();
});
