import { createPlayer } from "./createElements.js";
import { player1, player2 } from "./players.js";
import { enemyAttack, playerAttack } from "./playerAction.js";
import { showResult } from "./renderResults.js";
import { generateLogs } from "./logs.js";

const $arenas = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");

generateLogs("start", player1, player2);

$arenas.append(createPlayer(player1));
$arenas.append(createPlayer(player2));

$formFight.addEventListener("submit", (e) => {
  e.preventDefault();
  const enemy = enemyAttack();
  const player = playerAttack();
  const { hitEn, defenceEn, valueEn } = enemy;
  const { hitPl, defencePl, valuePl } = player;

  if (defencePl !== hitEn) {
    player1.changeHP(valueEn);
    player1.renderHP();
    generateLogs("hit", player2, player1);
  }

  if (defenceEn !== hitPl) {
    player2.changeHP(valuePl);
    player2.renderHP();
    generateLogs("hit", player1, player2);
  }

  showResult();
});
