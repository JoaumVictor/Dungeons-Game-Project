/* eslint-disable import/extensions */
let player;
let allEnemys;

// FUNÇÕES GENERICAS
const d = (number) => Math.floor(Math.random() * number) + 1;

const dom = {
  nickPlayer: document.querySelector('.nick-p1'),
  imgPlayer: document.querySelector('.sprite-p1'),
  vidaPlayer: document.querySelector('.player-vida'),
  nickEnemy: document.querySelector('.nick-enemy'),
  imgEnemy: document.querySelector('.sprite-enemy'),
  vidaEnemy: document.querySelector('.enemy-vida'),
  buttonsSkils: document.querySelectorAll('.skils-buttons'),
  combatText: document.querySelector('.text-combate'),
};

[...dom.buttonsSkils].forEach((el) =>
  el.addEventListener('click', (e) => {
    if (e.target === dom.buttonsSkils[0]) {
      dom.combatText.innerText = 'DIO BRANDO';
    }
  })
);

const carregaPersonagens = () => {
  const randomEnemy = d(10);
  dom.nickPlayer.innerText = player.nome;
  dom.imgPlayer.src = player.skin;
  dom.vidaPlayer.innerText = player.vida;
  dom.nickEnemy.innerText = allEnemys[randomEnemy].classe;
  dom.imgEnemy.src = allEnemys[randomEnemy].skin;
  dom.vidaEnemy.innerText = allEnemys[randomEnemy].vida;
};

const playlistMusicTheme = () => {
  const theme1 = document.querySelector('.theme-song');
  theme1.play();
  theme1.volume = 0.1;
};

window.onload = () => {
  player = JSON.parse(localStorage.getItem('player'));
  allEnemys = JSON.parse(localStorage.getItem('enemy'));
  playlistMusicTheme();
  carregaPersonagens();
};
