import { fadeInUpAnimation, rubberBandAnimation } from './animation';
import { showWatchLaterMovies } from './helpers';

const page1 = document.querySelector('.page-1');
const page2 = document.querySelectorAll('.page-2');
const themes = document.querySelector('.themes');
const movies = document.querySelector('.movies');

export const showPage1 = () => {
  page1.style.display = '';
  page2.forEach((page) => {
    page.style.display = 'none';
  });
  setTimeout(() => {
    themes.style.display = '';
  }, 0);
  rubberBandAnimation();
  fadeInUpAnimation();
};

export const showPage2 = () => {
  showWatchLaterMovies();
  page1.style.display = 'none';
  page2.forEach((page) => {
    page.style.display = '';
  });

  if (!(movies.innerHTML === '')) {
    setTimeout(() => {
      themes.style.display = 'none';
    }, 0);
  }

  rubberBandAnimation();
  fadeInUpAnimation();
};
