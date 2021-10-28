import getRandom from "./utils.js";

const $formFight = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ["head", "body", "foot"];

const enemyAttack = () => {
  const hitEn = ATTACK[getRandom(3) - 1];
  const defenceEn = ATTACK[getRandom(3) - 1];
  return {
    valueEn: getRandom(HIT[hitEn]),
    hitEn,
    defenceEn,
  };
};

const playerAttack = () => {
  const attack = {};
  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.valuePl = getRandom(HIT[item.value]);
      attack.hitPl = item.value;
    }
    if (item.checked && item.name === "defence") {
      attack.defencePl = item.value;
    }
    item.checked = false;
  }

  return attack;
};

export { enemyAttack, playerAttack };
