const $arenas = document.querySelector(".arenas");

const createElement = (tag, className) => {
  const $tag = document.createElement(tag);
  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
};

const createPlayer = (playerObj) => {
  const { player, name, hp, img } = playerObj;
  const $player = createElement("div", `player${player}`);
  const $progressbar = createElement("div", "progressbar");
  const $character = createElement("div", "character");
  const $life = createElement("div", "life");
  $life.style.width = `${hp}%`;

  const $name = createElement("div", "name");
  $name.innerHTML = name;

  const $img = createElement("img");
  $img.src = img;

  $player.append($progressbar, $character);
  $progressbar.append($life, $name);
  $character.append($img);

  return $player;
};

const createReloadButton = () => {
  const $reloadWrap = document.createElement("div");
  const $reloadButton = document.createElement("button");
  $reloadWrap.classList.add("reloadWrap");
  $reloadButton.classList.add("button");
  $arenas.append($reloadWrap);
  $reloadWrap.append($reloadButton);
  $reloadButton.innerText = "Restart";
  return $reloadButton;
};

export { createElement, createPlayer, createReloadButton };
