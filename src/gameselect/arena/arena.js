/* eslint-disable import/extensions */
import { habilidades } from '../Dados.js';

let player;
let enemy;
let allEnemys;

// FUNÇÕES GENERICAS
const d = (number) => Math.floor(Math.random() * number) + 1;

const dom = {
  nickPlayer: document.querySelector('.nick-p1'),
  imgPlayer: document.querySelector('.sprite-p1'),
  vidaPlayer: document.querySelector('.player-vida'),
  manaPlayer: document.querySelector('.player-mana'),
  nickEnemy: document.querySelector('.nick-enemy'),
  imgEnemy: document.querySelector('.sprite-enemy'),
  vidaEnemy: document.querySelector('.enemy-vida'),
  buttonsSkills: document.querySelectorAll('.skills-buttons'),
  combatText: document.querySelector('.text-combate'),
  bt1player: document.querySelector('.bt1-player'),
  bt2player: document.querySelector('.bt2-player'),
  bt3player: document.querySelector('.bt3-player'),
  bt1enemy: document.querySelector('.bt1-enemy'),
  bt2enemy: document.querySelector('.bt2-enemy'),
  bt3enemy: document.querySelector('.bt3-enemy'),
  round: document.querySelector('.counter-round'),
};

let enemyPlayer;

const atualizaVida = () => {
  dom.manaPlayer.innerText = player.mana;
  dom.vidaPlayer.innerText = player.vida;
  dom.vidaEnemy.innerText = enemyPlayer.vida;
  if (enemyPlayer.vida <= 0) {
    dom.bt1player.setAttribute('disabled', 'disabled');
    dom.bt2player.setAttribute('disabled', 'disabled');
    dom.bt3player.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      dom.combatText.innerText = 'Parabéns, você  ganhou!';
    }, 3000);
    setTimeout(() => {
      window.location.href = './credits/credits.html';
    }, 7000);
  }
  if (player.vida <= 0) {
    dom.bt1player.setAttribute('disabled', 'disabled');
    dom.bt2player.setAttribute('disabled', 'disabled');
    dom.bt3player.setAttribute('disabled', 'disabled');
    setTimeout(() => {
      dom.combatText.innerText = 'Você foi derrotado';
    }, 3000);
    setTimeout(() => {
      window.location.href = './credits/credits.html';
    }, 7000);
  }
};

const enemyTurn = () => {
  // if (enemyPlayer.vida < 5 && enemy.mana) {

  // };
  // if (enemy.mana) {

  // }
  const ativou = habilidades.ataqueBasico(enemyPlayer, player);
  dom.combatText.innerText = `OPONENTE: ${ativou}`;
  dom.round.innerText += 1;
  atualizaVida();
};

let roundss = 0;

const botoesArena = () => {
  dom.bt1player.addEventListener('click', () => {
    dom.bt1player.toggleAttribute('disabled');
    setTimeout(() => {
      const ativou = habilidades.ataqueBasico(player, enemyPlayer);
      dom.combatText.innerText = ativou;
      roundss += 1;
      dom.round.innerText = roundss;
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      enemyTurn();
      dom.bt1player.toggleAttribute('disabled');
    }, 4000);
  });
  dom.bt2player.addEventListener('click', () => {
    dom.bt2player.toggleAttribute('disabled');
    setTimeout(() => {
      const ativou = habilidades.habilidadeCurar(player);
      dom.combatText.innerText = ativou;
      roundss += 1;
      dom.round.innerText = roundss;
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      enemyTurn();
      dom.bt3player.toggleAttribute('disabled');
    }, 4000);
  });
  dom.bt3player.addEventListener('click', () => {
    dom.bt3player.toggleAttribute('disabled');
    setTimeout(() => {
      const ativou = habilidades.bolaDeFogo(player, enemyPlayer);
      dom.combatText.innerText = ativou;
      roundss += 1;
      dom.round.innerText = roundss;
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      enemyTurn();
      dom.bt3player.toggleAttribute('disabled');
    }, 4000);
  });
  dom.bt1enemy.addEventListener('click', () => {
    dom.bt1enemy.toggleAttribute('disabled');
    setTimeout(() => {
      const ativou = habilidades.ataqueBasico(enemyPlayer, player);
      dom.combatText.innerText = ativou;
      roundss += 1;
      dom.round.innerText = roundss;
      atualizaVida();
      dom.bt1enemy.toggleAttribute('disabled');
    }, 1000);
  });
  dom.bt2enemy.addEventListener('click', () => {
    dom.bt2enemy.toggleAttribute('disabled');
    setTimeout(() => {
      habilidades.habilidadeCurar(enemy);
      atualizaVida();
      dom.bt2enemy.toggleAttribute('disabled');
    }, 1000);
  });
  dom.bt3enemy.addEventListener('click', () => {
    dom.bt3enemy.toggleAttribute('disabled');
    setTimeout(() => {
      habilidades.bolaDeFogo(enemyPlayer, player);
      atualizaVida();
      dom.bt3enemy.toggleAttribute('disabled');
    }, 1000);
  });
};

const carregaPersonagens = () => {
  const randomEnemy = d(10);
  dom.nickPlayer.innerText = player.nome;
  dom.imgPlayer.src = player.skin;
  dom.vidaPlayer.innerText = player.vida;
  dom.manaPlayer.innerText = player.mana;
  dom.nickEnemy.innerText = allEnemys[randomEnemy].classe;
  dom.imgEnemy.src = allEnemys[randomEnemy].skin;
  dom.vidaEnemy.innerText = allEnemys[randomEnemy].vida;
  enemyPlayer = allEnemys[randomEnemy];
};

const playlistMusicTheme = () => {
  const theme1 = document.querySelector('.theme-song');
  theme1.play();
  theme1.volume = 0.1;
};

window.onload = () => {
  player = JSON.parse(localStorage.getItem('player'));
  allEnemys = JSON.parse(localStorage.getItem('enemy'));
  botoesArena();
  playlistMusicTheme();
  carregaPersonagens();
};
