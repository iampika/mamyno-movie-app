import '../scss/style.scss';
import { getMovies } from './api';
import { showPage1, showPage2 } from './pages';
import {
  changeThemeFive,
  changeThemeFour,
  changeThemeOne,
  changeThemeSix,
  changeThemeThree,
  changeThemeTwo,
} from './theme';

const overlay = document.querySelector('#overlay');
const themeOne = document.querySelector('.theme-one');
const themeTwo = document.querySelector('.theme-two');
const themeThree = document.querySelector('.theme-three');
const themeFour = document.querySelector('.theme-four');
const themeFive = document.querySelector('.theme-five');
const themeSix = document.querySelector('.theme-six');
const username = document.querySelector('.username');
const brand = document.querySelector('.brand');
const heroButton = document.querySelector('#hero-button');
const form = document.querySelector('form');
const input = document.querySelector('#search-input');

const navToggle = () => {
  overlay.classList.toggle('close');
};

const formSubmitted = (e) => {
  e.preventDefault();
  const search = input.value;
  getMovies(search);
  input.blur();
};

export let state = {
  movies: [],
  watchLaterMovies: [],
};

if (JSON.parse(localStorage.getItem('state'))) {
  state = JSON.parse(localStorage.getItem('state'));
}

showPage1();

form.addEventListener('submit', formSubmitted);
brand.addEventListener('click', showPage1);
heroButton.addEventListener('click', showPage2);
username.addEventListener('click', navToggle);
themeOne.addEventListener('click', changeThemeOne);
themeTwo.addEventListener('click', changeThemeTwo);
themeThree.addEventListener('click', changeThemeThree);
themeFour.addEventListener('click', changeThemeFour);
themeFive.addEventListener('click', changeThemeFive);
themeSix.addEventListener('click', changeThemeSix);
