import Game from "./game.js";

const game = new Game({
  $arenas: document.querySelector(".arenas"),
  $formFight: document.querySelector(".control"),
});

game.start();
