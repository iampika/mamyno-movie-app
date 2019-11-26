import {
  fadeInUpAnimation,
  rubberBandAnimation,
  toggleAnimation,
} from './animation';

const headerSvg = document.querySelector('#header-svg');
const heroButton = document.querySelector('#hero-button');
const bodyWrap = document.querySelector('.body-wrap');
const fab = document.querySelectorAll('.fab');
const input = document.querySelector('#search-input');
const watchingCircle = document.querySelectorAll('.watching-circle');
const h3 = document.querySelectorAll('h3');
const heroTitle = document.querySelectorAll('.hero-title');
const heroParagraph = document.querySelectorAll('.hero-paragraph');
const brand = document.querySelector('#brand');
const username = document.querySelector('#username');
const noMovies = document.querySelector('.no-movies');

export const changeThemeColor = (color1, color2, color3, color4) => {
  headerSvg.style.fill = color1;
  heroButton.style.background = `linear-gradient(65deg, ${color2} 0, ${color3} 100%)`;
  bodyWrap.style.background = color4;
  input.style.borderColor = color1;
  input.style.backgroundColor = color4;
  input.style.placeholderColor = color2;
  brand.style.color = color2;
  username.style.color = color2;
  noMovies.style.color = color2;
  watchingCircle.forEach((circle) => {
    circle.style.borderColor = color1;
  });
  h3.forEach((h) => {
    h.style.color = color2;
  });
  heroTitle.forEach((title) => {
    title.style.color = color2;
  });
  heroParagraph.forEach((paragraph) => {
    paragraph.style.color = color2;
  });
  fab.forEach((ele) => {
    ele.style.color = color2;
  });
};

const removeInputPlaceholderColor = () => {
  [1, 2, 3, 4, 5, 6].forEach((num) => {
    input.classList.remove(`color${num}`);
  });
};

export const changeThemeOne = () => {
  toggleAnimation();
  changeThemeColor('#c4c6ff', '#5d55fa', '#7069fa', '#e0e8f9');
  removeInputPlaceholderColor();
  input.classList.add('color1');
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const changeThemeTwo = () => {
  toggleAnimation();
  changeThemeColor('#b6e0fe', '#2680c2', '#4098d7', '#dceefb');
  removeInputPlaceholderColor();
  input.classList.add('color2');
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const changeThemeThree = () => {
  toggleAnimation();
  changeThemeColor('#fce588', '#de911d', '#f0b429', '#fffbea');
  removeInputPlaceholderColor();
  input.classList.add('color3');
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const changeThemeFour = () => {
  toggleAnimation();
  changeThemeColor('#ffb088', '#f35627', '#f9703e', '#ffe8de');
  removeInputPlaceholderColor();
  input.classList.add('color4');
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const changeThemeFive = () => {
  toggleAnimation();
  changeThemeColor('#ffb8d2', '#ad2167', '#c42d78', '#ffe0f0');
  removeInputPlaceholderColor();
  input.classList.add('color5');
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const changeThemeSix = () => {
  toggleAnimation();
  changeThemeColor('#caff84', '#5cb70b', '#6cd410', '#f8ffed');
  removeInputPlaceholderColor();
  input.classList.add('color6');
  rubberBandAnimation();
  fadeInUpAnimation();
};
