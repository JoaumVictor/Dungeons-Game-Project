const startBtn = document.querySelector('.button-start');
startBtn.addEventListener('click', () => {
  setTimeout(() => {
    window.location.href = '../gameselect/gameStart.html';
  }, 1500);
});

const playThemeSong = () => {
  const audio1 = document.querySelector('.theme-song');
  audio1.play();
  audio1.volume = 0.1;
};
playThemeSong();
