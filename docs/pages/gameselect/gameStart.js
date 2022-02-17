/* eslint-disable import/extensions */
import URLS from '../../dados/gifs.js';
import { fichaEmBranco, atributos } from '../../dados/dados.js';

let characterSelected;

const themeSong = () => {
  const audio2 = document.querySelector('.champion-selected');
  audio2.play();
  audio2.volume = 0.1;
};
themeSong();

const getChar = (classe) =>
  fetch(`https://api.open5e.com/classes/${classe}`)
    .then((response) => response.json())
    .then((data) => data);

const getOponents = () =>
  fetch('https://api.open5e.com/classes')
    .then((response) => response.json())
    .then((data) => data.results);

const confirmBtn = document.querySelector('.confirm-btn');
const charName = document.querySelector('#char-name');
charName.addEventListener('input', () => {
  if (!charName.hasAttribute('disabled')) {
    confirmBtn.setAttribute('disabled', '');
  }
  if (charName.value.length > 2) confirmBtn.toggleAttribute('disabled');
});

const selectSkin = (event) => {
  const audio1 = document.querySelector('.chose-character');
  audio1.play();
  audio1.volume = 0.2;
  const element = document.querySelector('.selected-skin');
  if (element) element.classList.remove('selected-skin');
  event.target.classList.add('selected-skin');
};

const createImage = (src) => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'spriteView';
  img.addEventListener('click', selectSkin);
  return img;
};

const spritesRender = (name) => {
  const imageContainer = document.querySelector('.class-image');
  imageContainer.innerHTML = '';
  Object.values(URLS[name]).forEach((url) => {
    imageContainer.appendChild(createImage(url));
  });
};

const discRender = (obj) => {
  const discription = document.querySelector('.description');
  discription.innerHTML = `
    <p>Classe: ${obj.name}</p>
    <p>Dado de Vida: ${obj.hit_dice}</p>
    <p>Pontos fortes: ${obj.prof_saving_throws}</p>
  `;
};

const click = async (el) => {
  const audio1 = document.querySelector('.chose-character');
  audio1.play();
  audio1.volume = 0.1;
  const className = el.lastElementChild.innerText.toLowerCase();
  characterSelected = await getChar(className);
  spritesRender(className);
  discRender(characterSelected);
};

// http://localhost:5500/src/index/index.html

const buttonClass = document.querySelectorAll('.button');
[...buttonClass].forEach((el) => {
  el.addEventListener('click', () => click(el));
});

const getLife = (dado, prof) => {
  const regex = /\d+$/g;
  const dadoValue = Number(dado.match(regex));
  console.log('Calculou a vida');
  return (dadoValue + prof) * 3;
};

const randomSkin = () => Math.floor(Math.random() * 2) + 1;

const enemys = async () => {
  const response = await getOponents();
  const oponent = response.filter(({ name }) => name !== 'Bard');
  const saida = oponent.map((el) => {
    const enemy = { ...fichaEmBranco };
    enemy.nome = el.name;
    enemy.classe = el.name;
    enemy.dadoDeVida = el.hit_dice;
    enemy.atributos = atributos[el.name];
    enemy.vida = getLife(enemy.dadoDeVida, enemy.proficiencia);
    enemy.vidaMaxima = enemy.vida;
    enemy.classeDeArmadura = 10 + enemy.atributos.constituicao;
    enemy.skin = Object.values(URLS[enemy.classe.toLocaleLowerCase()])[randomSkin()];
    return enemy;
  });
  return saida;
};

const player1 = () => {
  const { name: nome, hit_dice: dado } = characterSelected;
  const player = { ...fichaEmBranco };
  const nomeDoPlayer = document.querySelector('#char-name').value;
  const aparencia = document.querySelector('.selected-skin').src;
  player.nome = nomeDoPlayer;
  player.skin = aparencia;
  player.dadoDeVida = dado;
  player.classe = nome;
  player.atributos = atributos[nome];
  player.vida = getLife(dado, player.proficiencia);
  player.vidaMaxima = player.vida;
  player.classeDeArmadura = 10 + player.atributos.constituicao;
  localStorage.setItem('player', JSON.stringify(player));
};

const trocaPagina = () => {
  setTimeout(async () => {
    localStorage.setItem('enemy', JSON.stringify(await enemys()));
    player1();
    window.location.href = '../arena/arena.html';
  }, 1000);
};

const confirm = async () => {
  const confirmButton = document.querySelector('.confirm-button');
  const audio2 = document.querySelector('.champion-selected');
  audio2.pause();
  confirmButton.play();
  confirmButton.volume = 0.1;
  trocaPagina();
};

confirmBtn.addEventListener('click', confirm);

window.onload = () => {
  console.log('A página da seleção de campeões carregou!');
}

export default { getChar, getOponents };
