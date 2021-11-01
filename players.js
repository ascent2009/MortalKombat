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

const getPlayer = async () => {
  const body = fetch(
    "https://reactmarathon-api.herokuapp.com/api/mk/player/choose"
  ).then((res) => res.json());
  return body;
};

const p1 = JSON.parse(localStorage.getItem("player1"));
const p2 = await getPlayer();

const player1 = new Player({
  ...p1,
  player: 1,
  rootSelector: "arenas",
});

const player2 = new Player({
  ...p2,
  player: 2,
  rootSelector: "arenas",
});

export { player1, player2 };
