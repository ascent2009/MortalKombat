function changeHP(num) {
  this.hp -= num;

  if (this.hp <= 0) {
    this.hp = 0;
  }
  return this.hp;
}

function elHP() {
  const $playerLife = document.querySelector(`.player${this.player} .life`);

  return $playerLife;
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
  return this.elHP();
}

export { changeHP, elHP, renderHP };
