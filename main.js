const $arenas = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword"],
  attack() {
    console.log(this.name + " " + "Fight...");
  },
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

function randomizeNum() {
  const num = Math.ceil(Math.random() * 20);
  return num;
}

function changeHP(player) {
  const $playerLife = document.querySelector(
    ".player" + player.player + " .life"
  );
  player.hp -= randomizeNum();

  $playerLife.style.width = player.hp + "%";
  if (player.hp <= 0) {
    player.hp = 0;
    $playerLife.style.width = "0%";
    $arenas.append(playResult());
  }

  console.log(player.hp);
}

function playResult() {
  const $resultTitle = createElement("div", "loseTitle");
  if (player1.hp > player2.hp) {
    $resultTitle.innerText = player1.name + " wins";
  } else if (player1.hp < player2.hp) {
    $resultTitle.innerText = player2.name + " wins";
  } else {
    $resultTitle.innerText = "draw!";
  }
  $randomButton.disabled = true;
  $randomButton.innerHTML = "Game is over!";
  $randomButton.style.backgroundColor = "grey";
  return $resultTitle;
}

$randomButton.addEventListener("click", function () {
  changeHP(player1);
  changeHP(player2);
});

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));
