const audio1 = document.querySelector('.theme-song');
const playThemeSong = () => {
  audio1.play();
  audio1.volume = 0.1;
};
playThemeSong();

const startBtn = document.querySelector('.button-start');
startBtn.addEventListener('click', () => {
  const audioClick = document.querySelector('.theme-song-button');
  audio1.pause();
  audioClick.play();
  audioClick.volume = 0.1;
  setTimeout(() => {
    window.location.href = 'pages/gameselect/gameStart.html';
  }, 1500);
});

window.onload = () => {
  console.log('Index carregado!')
}
