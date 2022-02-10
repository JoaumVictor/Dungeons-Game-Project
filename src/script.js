import URLS from './img/url.js';

console.log(URLS);

const getChar = async () => {
  const response = await fetch('https://api.open5e.com/classes');
  const data = await response.json();
  return data.results;
};

const player1 = {
  nomeDoPersonagem: 0, // da nome ao seu personagem
  nomeDaRaca: 0, // padrao humano
  nomeDaClasse: 0, //recebe name
  dadoDeVida: 0, // recebe o hit_dice
  habilidadePrimaria: 0, // recebe spellcasting_ability traduzida pro portugues
};

const PLAYER_SELECT = document.querySelector('.player-selection')

const genericElementGenerator = (element, classN, text) => {
  const el = document.createElement(element);
  el.className = classN;
  el.innerText = text;
  return el;
};

const genericImageGenerator = (src) => {
  const img = document.createElement('img');
  img.src = src;
  return img;
}

const renderPlayerOptions = () => {
  const section = document.createElement('section');
  PLAYER_SELECT.appendChild(section);
};

const startBtn = document.querySelector('.button-start');
startBtn.addEventListener('click', () => {
  location.href = './html/gameStart.html';
});

window.onload = async () => {
  const data = await getChar()
  const objData = data.map(element => ({
    nome: '',
    dados: {
      classe: element.name,
      dadoDeVida: element.hit_dice,
      habilidade: element.spellcasting_ability
    }
  }));
}

