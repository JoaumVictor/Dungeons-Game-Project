/* eslint-disable import/extensions */
import { habilidades } from '../../dados/dados.js';

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
  roundBackground: document.querySelector('.combat-info'),  
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
      window.location.href = '../credits/credits.html';
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
      window.location.href = '../credits/credits.html';
    }, 7000);
  }
};

let contadorDeMana = 0;

const recuperaMana = () => {
  contadorDeMana += 1;
  if (contadorDeMana > 1) {
    player.mana += 1;
    enemy.mana += 1;
    contadorDeMana = 0;
  }
};

const turnoCor = (recebido) => {
  const verde = 'rgb(59, 192, 81)';
  const vermelho = 'rgb(156, 7, 7)';
  if (recebido === 'player') {
    console.log('terminou o turno do oponente, e a cor ficou verde');
    return dom.roundBackground.style.backgroundColor = verde;
  }
  console.log('terminou o turno do player, e a cor ficou vermelha');
  return dom.roundBackground.style.backgroundColor = vermelho;
}

const trocaTurno = () => {
  roundss += 1;
  dom.round.innerText = roundss;
};

const desativaB = () => {
  [...dom.buttonsSkills].forEach(alvo => {
    alvo.toggleAttribute('disabled');
  });
}

const msgTurno = () => {
  dom.combatText.innerText = 'Seu turno!';
};

const enemyTurn = () => {
  const ativou = habilidades.ataqueBasico(enemyPlayer, player);
  dom.combatText.innerText = `OPONENTE: ${ativou}`;
  atualizaVida();
  setTimeout(() => {
    trocaTurno();
    turnoCor('player');
    if (enemyPlayer.vida > 0) {
    msgTurno();
    };
    desativaB();
  }, 4000);
  trocaturno();
};

let roundss = 1;

const botoesArena = () => {
  dom.bt1player.addEventListener('click', () => {
    desativaB();
    setTimeout(() => {
      const ativou = habilidades.ataqueBasico(player, enemyPlayer);
      dom.combatText.innerText = ativou;
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      trocaTurno();
      turnoCor('enemy');
      enemyTurn();
    }, 4000);
  });

  dom.bt2player.addEventListener('click', () => {
    desativaB();
    setTimeout(() => {
      const ativou = habilidades.habilidadeCurar(player);
      dom.combatText.innerText = ativou;
      trocaturno();
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      turnoCor('enemy');
      enemyTurn();
    }, 4000);
  });

  dom.bt3player.addEventListener('click', () => {
    desativaB();
    setTimeout(() => {
      const ativou = habilidades.bolaDeFogo(player, enemyPlayer);
      dom.combatText.innerText = ativou;
      roundss += 1;
      dom.round.innerText = roundss;
      atualizaVida();
    }, 1000);
    setTimeout(() => {
      turnoCor('enemy');
      enemyTurn();
    }, 4000);
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

const mensagemBeta = () => {
  dom.combatText.innerText = 'Obrigado por testar a beta 1.0';
};

window.onload = () => {
  player = JSON.parse(localStorage.getItem('player'));
  allEnemys = JSON.parse(localStorage.getItem('enemy'));
  botoesArena();
  playlistMusicTheme();
  carregaPersonagens();
  msgTurno();
  mensagemBeta();
};
