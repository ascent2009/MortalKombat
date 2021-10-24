const $arenas = document.querySelector(".arenas");
const $submitButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

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

// массив участвующих в игре
const players = [player1, player2];

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
  console.log($reloadButton);
  return $reloadButton;
}

// функция случайного выбора игроков из массива участвующих
function choosePlayer() {
  const player = players[getRandom(2) - 1];
  return player;
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

$formFight.addEventListener("submit", function (e) {
  e.preventDefault();
  const enemy = enemyAttack();

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

  const chosenPlayer = choosePlayer();
  chosenPlayer.changeHP(getRandom(attack.value));
  chosenPlayer.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $submitButton.disabled = true;
    $submitButton.innerHTML = "Game is over!";
    $submitButton.style.backgroundColor = "grey";
    $formFight.style.opacity = "0.5";

    createReloadButton().addEventListener("click", function () {
      window.location.reload();
      console.log("reload page");
    });
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.append(playResult(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.append(playResult(player1.name));
  } else if (player1.hp === 0 && player1.hp === player2.hp) {
    $arenas.append(playResult());
  }
});
