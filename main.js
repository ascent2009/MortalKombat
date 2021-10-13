const player1 = {
  name: "Scorpion",
  hp: 50,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword"],
  attack() {
    console.log(this.name + " " + "Fight...");
  },
};

const player2 = {
  name: "Sonya",
  hp: 80,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["spear"],
  attack() {
    console.log(this.name + " " + "Fight...");
  },
};

const $arenas = document.querySelector(".arenas");

function createPlayer(className, player) {
  const $player = document.createElement("div");
  $player.classList.add(className);

  const $progressbar = document.createElement("div");
  $progressbar.classList.add("progressbar");

  const $character = document.createElement("div");
  $character.classList.add("character");

  const $life = document.createElement("div");
  $life.classList.add("life");
  $life.style.width = player.hp + "%";

  const $name = document.createElement("div");
  $name.classList.add("name");
  $name.innerHTML = player.name;

  const $img = document.createElement("img");
  $img.src = player.img;

  $arenas.append($player);
  $player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);
}

createPlayer("player1", player1);
createPlayer("player2", player2);
