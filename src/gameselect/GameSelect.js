import URLS from '../img/url.js'

const getChar = async (classe) => {
  const response = await fetch(`https://api.open5e.com/classes/${classe}`);
  const data = await response.json();
  console.log(data);
  return data;
};

const getCharacter = () => {
  const charName = document.querySelector('#char-name').value
  document.querySelector('.btn-final')
}

const selectSkin = (event) => {
  const element = document.querySelector('.selected-skin');
  if (element) element.classList.remove('selected-skin');
  event.target.classList.add('selected-skin')
}

const createImage = (src) => {
  const img = document.createElement('img');
  img.src = src
  img.className = 'spriteView'
  img.addEventListener('click', selectSkin);
  return img
}

const spritesRender = (name) => {
  const imageContainer = document.querySelector('.class-image');
  imageContainer.innerHTML = '';
  Object.values(URLS[name]).forEach((url) => {
    imageContainer.appendChild(createImage(url));
  })
}

const discRender = (obj) => {
  const discription = document.querySelector('.description');
  discription.innerHTML = (`
    <p>Classe: ${obj.name}</p>
    <p>Dado de Vida: ${obj.hit_dice}</p>
    <p>Pontos fortes: ${obj.prof_saving_throws}</p>
  `);
}

const click = async (el) => {
  const className = el.lastElementChild.innerText.toLowerCase()
  const characterSelected = await getChar(className);
  spritesRender(className);
  discRender(characterSelected)
}

const button = document.querySelectorAll('.button');
[...button].forEach((el) => {
  el.addEventListener('click', () => click(el));
});

const confirm = () => {

  alert('GG')
}

document.querySelector('.btn-final').addEventListener('click', confirm)
