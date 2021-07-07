import { makeAutoObservable } from 'mobx';
import { toast } from 'react-toastify';
import { IFilter } from '../interfaces/IFilters';
import { IGenre } from '../interfaces/IGenre';
import { IMovieShow } from '../interfaces/IMovieShow';
import { ISort } from '../interfaces/ISort';
import api from '../services';
import { UserStore } from './UserStore';
export class MovieShowStore {
  public userStore: UserStore = new UserStore();
  public allMovies: IMovieShow[] = [];
  public allShows: IMovieShow[] = [];
  public allFavorites: IMovieShow[] = [];
  public allGeneres: IGenre[] = [];
  public activeTabSelect: 'Movies' | 'Shows' | 'Favorites' = 'Movies';
  public setActiveTabSelect = (state: 'Movies' | 'Shows' | 'Favorites') =>
    (this.activeTabSelect = state);
  public sortByMethod: ISort = { type: 'desc', sortBy: 'release_date' };

  public filters: IFilter = { name: '', genre: [], year: '' };

  constructor() {
    makeAutoObservable(this);
  }

  public setFilters = (filters: IFilter) => (this.filters = filters);

  public getSortedBy = (sortBy: 'name' | 'date') => {
    const type = this.sortByMethod.type === 'asc' ? 'desc' : 'asc';
    const sort: ISort =
      sortBy === 'name'
        ? { type: type, sortBy: 'original_title' }
        : { type: type, sortBy: 'release_date' };
    this.sortByMethod = sort;
    this.getFilteredMoviesShows(
      this.filters.genre.join(','),
      this.filters.year,
      this.filters.name
    );
  };
  public callProperData = () => {
    this.getAllFavorites();
    switch (this.activeTabSelect) {
      case 'Movies':
        this.getAllMovies();
        break;
      case 'Shows':
        this.getAllTvShows();
        break;
    }
  };
  public getAllMovies = async () => {
    const movies = await api.getPopularMovies();
    if (movies) {
      this.allMovies = movies;
      toast.success('getAllMovies', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  public getAllTvShows = async () => {
    const shows = await api.getPopularTvShows();
    if (shows) {
      this.allShows = shows;
      toast.success('getAllShows', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  public getAllGenres = async () => {
    const genres = await api.getAllGenres();
    if (genres) {
      this.allGeneres = genres;
      toast.success('getAllGenres', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  public setFavorite = async (movieOrSerie: IMovieShow) => {
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const prevFav = await this.getAllFavorites();
    const checkIFExists = prevFav.find(
      (item: IMovieShow) => item.id === movieOrSerie.id
    );
    if (checkIFExists) {
      //remove item from favorites
      const filteredList = prevFav.filter(
        (item: IMovieShow) => item.id !== movieOrSerie.id
      );
      this.allFavorites = [...filteredList];
    } else {
      this.allFavorites = [...prevFav, movieOrSerie];
    }
    localStorage.setItem(
      'favorites',
      JSON.stringify({
        ...favoriteList,
        [this.userStore.userData.username]: this.allFavorites,
      })
    );
    toast.success('Successfully added to the favorites.', {
      position: toast.POSITION.BOTTOM_CENTER,
    });
  };

  public getAllFavorites = async () => {
    const favoriteList = JSON.parse(localStorage.getItem('favorites') || '{}');
    const favoritesCurrentLoggedIn: IMovieShow[] =
      favoriteList[this.userStore.userData.username] || [];
    this.allFavorites = favoritesCurrentLoggedIn;
    return favoritesCurrentLoggedIn;
  };

  public sortFavorites = async (sortBy: ISort) => {
    const favorites = await this.getAllFavorites();
    const sortByTitle = (a: IMovieShow, b: IMovieShow) => {
      const aString = a.original_title || a.name || '';
      const bString = b.original_title || b.name || '';
      return aString.localeCompare(bString);
    };
    const sortByDate = (a: IMovieShow, b: IMovieShow) =>
      new Date(a.release_date).getTime() - new Date(b.release_date).getTime();
    let sortedFavorites: IMovieShow[] = [];
    if (sortBy.sortBy === 'original_title') {
      sortedFavorites = favorites
        .slice()
        .sort((a: IMovieShow, b: IMovieShow) =>
          sortBy.type === 'asc' ? sortByTitle(a, b) : sortByTitle(b, a)
        );
    } else {
      sortedFavorites = favorites
        .slice()
        .sort((a: IMovieShow, b: IMovieShow) =>
          sortBy.type === 'asc' ? sortByDate(a, b) : sortByDate(b, a)
        );
    }
    this.allFavorites = sortedFavorites;
  };

  public getFilteredMoviesShows = async (
    genre: string,
    year: string,
    text: string
  ) => {
    const genreList = genre.split(',');
    //getting genres by name to get ids for API
    const filteredGenre =
      this.allGeneres.filter((item) => genreList.includes(item.name)) || null;
    const genreIds = filteredGenre.map((genre) => genre.id).join(',');

    // choosing what to search movies or shows
    const type =
      this.activeTabSelect === 'Movies'
        ? 'movie'
        : this.activeTabSelect === 'Shows'
        ? 'tv'
        : '';

    //sort by, original_title.asc
    const sortBy = `${this.sortByMethod.sortBy}.${this.sortByMethod.type}`;
    const filteredMovieOrShow = await api.getFilteredMoviesShows(
      genreIds,
      year,
      text,
      type,
      sortBy
    );
    if (filteredMovieOrShow) {
      if (this.activeTabSelect === 'Movies') {
        this.allMovies = filteredMovieOrShow;
      } else if (this.activeTabSelect === 'Shows') {
        this.allShows = filteredMovieOrShow;
      }
      toast.success('getFilteredMoveis', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
}
