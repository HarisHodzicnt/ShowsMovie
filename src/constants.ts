export const API_URL_MOVIES = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`;
export const API_URL_SHOWS = `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=1`;
export const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export const GENRES_API = `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
export const DISCOVER_API = (
  text: string,
  genre: string,
  year: string,
  type: string,
  typeOfSearch: string,
  sortBy: string
) =>
  `https://api.themoviedb.org/3/${typeOfSearch}/${type}?api_key=${process.env.REACT_APP_API_KEY}&with_genres=${genre}&year=${year}&query=${text}&sort_by=${sortBy}`;

export const MENU_TABS = ['Movies', 'Shows', 'Favorites'];

export const FAKE_IMG =
  'http://lexingtonvenue.com/media/poster-placeholder.jpg';
