import { state } from '../app';
import { fetchMovies } from './api';

const error = document.querySelector('.error');
const success = document.querySelector('.success');
const list = document.querySelector('#movies');
const noMovies = document.querySelector('.no-movies');
const watchingMovies = document.querySelector('.watching-movies');
const themes = document.querySelector('.themes');

export const movieGenerator = (movie, buttonName, buttonClass = '') => {
  // Elements
  const li = document.createElement('li');
  const div = document.createElement('div');
  const span = document.createElement('span');
  const h2 = document.createElement('h2');
  const a = document.createElement('a');
  const p = document.createElement('p');
  const button = document.createElement('button');

  // Append elements
  li.appendChild(div);
  div.appendChild(span);
  div.appendChild(h2);
  div.appendChild(p);
  h2.appendChild(a);
  p.appendChild(button);

  // Attributes
  a.href = '/';
  button.setAttribute('data-movieid', movie.imdbID);

  // textContent
  span.textContent = movie.Year;
  a.textContent = movie.Title;
  button.textContent = buttonName;

  // ClassLists
  li.classList.add('movies__card', 'fadeInUp');
  div.classList.add('ml-8');
  if (buttonClass) {
    button.classList.add('button', 'watch-later-button', `${buttonClass}`);
  } else {
    button.classList.add('button', 'watch-later-button');
  }

  // Styles
  li.style.backgroundImage = `url(${movie.Poster})`;

  return li;
};


export const showWatchLaterMovies = () => {
  if (state.watchLaterMovies.length > 0) {
    noMovies.classList.add('none');
    watchingMovies.innerHTML = '';

    state.watchLaterMovies.forEach((movie) => {
      watchingMovies.appendChild(
        movieGenerator(movie, 'Remove', 'remove-button'),
      );
      themes.style.display = 'none';
    });

    const buttons = document.querySelectorAll('.remove-button');

    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        state.watchLaterMovies.forEach((movie) => {
          if (movie.imdbID === button.dataset.movieid) {
            state.watchLaterMovies = state.watchLaterMovies.filter(
              (m) => m.imdbID !== button.dataset.movieid,
            );
            localStorage.setItem('state', JSON.stringify(state));
            showWatchLaterMovies();
          }
        });
      });
    });
  } else {
    noMovies.classList.remove('none');
    watchingMovies.innerHTML = '';
  }
};

export const getMovies = async (value) => {
  const data = await fetchMovies(value);
  state.movies = data.Search;
  if (state.movies) {
    list.innerHTML = '';
    themes.style.display = '';
    themes.classList.add('bounceOutRight');
    setTimeout(() => {
      if (state.movies) {
        state.movies.forEach((movie) => {
          list.appendChild(movieGenerator(movie, 'Watch Later'));
          themes.style.display = 'none';
        });
      }
      const buttons = document.querySelectorAll('.watch-later-button');

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
          error.classList.add('none');
          success.classList.add('none');
          const isMovieExit = !(
            state.watchLaterMovies.filter(
              (movie) => movie.imdbID === button.dataset.movieid,
            ).length > 0
          );

          if (isMovieExit) {
            state.movies.forEach((movie) => {
              if (movie.imdbID === button.dataset.movieid) {
                state.watchLaterMovies.push(movie);
                showWatchLaterMovies();
                localStorage.setItem('state', JSON.stringify(state));
                success.classList.remove('none');
                success.innerHTML = `
                  <p>Successfully added</p>
                `;

                setTimeout(() => {
                  success.classList.add('none');
                }, 2000);
              }
            });
          } else {
            error.classList.remove('none');
            error.innerHTML = `
            <p>Already Added.</p>
            `;
            setTimeout(() => {
              error.classList.add('none');
            }, 2000);
          }
        });
      });

      success.classList.add('none');
      error.classList.add('none');
    }, 1000);
  } else {
    success.classList.add('none');
    error.classList.remove('none');
    error.innerHTML = `
      <p>Please write a valid name</p>
    `;
  }
};
