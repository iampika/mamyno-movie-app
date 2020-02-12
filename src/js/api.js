import 'dotenv/config';

const { API_KEY } = process.env;

export const fetchMovies = async (value) => {
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&?type=movie&s=${value}`;
  const res = await fetch(url);
  return res.json();
};
