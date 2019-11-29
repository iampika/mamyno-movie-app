import { state } from '../app';
import popularMoviesData from './popularMovies';

const noMovies = document.querySelector('.no-movies');
const error = document.querySelector('.error');

const API_KEY = 'https://www.omdbapi.com/?apikey=bfaa96ab&?type=movie&s=';
const list = document.querySelector('#movies');
const themes = document.querySelector('.themes');
const watchingMovies = document.querySelector('.watching-movies');
const popularMovies = document.querySelector('#popular-movies');

export const generateMovie = (movie, name, button = '') => `
      <li
        class="movies__card fadeInUp"
        style="background-image: url(${movie.Poster})"
      >
        <div>
          <div>
            <span>${movie.Year}</span>
            <h2>
              <a href="/">${movie.Title}</a>
            </h2>
            <p>
              <button data-movieid="${movie.imdbID}" class="button watch-later-button ${button}">${name}</button>
            </p>
          </div>
      </li>
  `;

export const showWatchLaterMovies = () => {
  if (state.watchLaterMovies.length > 0) {
    noMovies.classList.add('none');
    watchingMovies.innerHTML = '';

    state.watchLaterMovies.forEach((movie) => {
      watchingMovies.innerHTML += generateMovie(
        movie,
        'Remove',
        'remove-button',
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

export const showPopularMovies = () => {
  state.popularMovies = popularMoviesData;

  if (state.popularMovies) {
    state.popularMovies.forEach((movie) => {
      popularMovies.innerHTML += generateMovie(
        movie,
        'Watch Later',
        'popular-movies',
      );
    });
  }

  const buttons = document.querySelectorAll('.popular-movies');

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const isMovieExit = !(
        state.watchLaterMovies.filter(
          (movie) => movie.imdbID === button.dataset.movieid,
        ).length > 0
      );

      if (isMovieExit) {
        state.popularMovies.forEach((movie) => {
          if (movie.imdbID === button.dataset.movieid) {
            state.watchLaterMovies.push(movie);
            showWatchLaterMovies();
            localStorage.setItem('state', JSON.stringify(state));
          }
        });
      }
    });
  });
};

export const getMovies = async (value) => {
  const url = API_KEY + value;
  const res = await fetch(url);
  const data = await res.json();
  state.movies = data.Search;
  if (state.movies) {
    list.innerHTML = '';
    themes.style.display = '';
    themes.classList.add('bounceOutRight');
    setTimeout(() => {
      if (state.movies) {
        state.movies.forEach((movie) => {
          list.innerHTML += generateMovie(movie, 'Watch Later');
          themes.style.display = 'none';
        });
      }
      const buttons = document.querySelectorAll('.watch-later-button');

      buttons.forEach((button) => {
        button.addEventListener('click', () => {
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
              }
            });
          }
        });
      });

      error.classList.add('none');
    }, 1000);
  } else {
    error.classList.remove('none');
    error.innerHTML = `
      <p>Please write a valid name</p>
    `;
  }
};
