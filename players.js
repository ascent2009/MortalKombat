import { changeHP, elHP, renderHP } from "./HPcontrol.js";

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }
  attack = () => console.log(this.name + " " + "Fight...");
  changeHP = changeHP;
  elHP = elHP;
  renderHP = renderHP;
}

class Player1 extends Player {
  constructor(props) {
    super(props);
  }
}

const player1 = new Player({
  player: 1,
  name: "Scorpion",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
  weapon: ["sword"],
});

const player2 = new Player1({
  player: 2,
  name: "Sonya",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/sonya.gif",
  weapon: ["spear"],
});

export { player1, player2 };
