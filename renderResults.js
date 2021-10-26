import { player1, player2 } from "./players.js";
import { createElement, createReloadButton } from "./createElements.js";
import { generateLogs } from "./logs.js";

const $arenas = document.querySelector(".arenas");
const $submitButton = document.querySelector(".button");
const $formFight = document.querySelector(".control");

export const playResult = (name) => {
  const $resultTitle = createElement("div", "loseTitle");
  if (name) {
    $resultTitle.innerText = name + " wins";
  } else {
    $resultTitle.innerText = "draw!";
  }

  return $resultTitle;
};

export const showResult = () => {
  if (player1.hp === 0 || player2.hp === 0) {
    $submitButton.disabled = true;
    $submitButton.innerHTML = "Game is over!";
    $submitButton.style.backgroundColor = "grey";
    $formFight.style.opacity = "0.5";

    createReloadButton().addEventListener("click", () => {
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
};
