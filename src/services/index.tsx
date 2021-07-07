import axios from 'axios';
import {
  API_URL_MOVIES,
  API_URL_SHOWS,
  DISCOVER_API,
  GENRES_API,
} from '../constants';
import { IGenre } from '../interfaces/IGenre';
import { IMovieShow } from '../interfaces/IMovieShow';
import { IUser } from '../interfaces/IUsers';
class Api {
  public getPopularMovies = async (): Promise<IMovieShow[]> => {
    const { data } = await axios.get(API_URL_MOVIES);
    return data.results;
  };

  public getPopularTvShows = async (): Promise<IMovieShow[]> => {
    const { data } = await axios.get(API_URL_SHOWS);
    return data.results;
  };

  public getFilteredMoviesShows = async (
    genre: string,
    year: string,
    text: string,
    type: string,
    sortBy: string
  ): Promise<IMovieShow[]> => {
    const { data } = await axios.get(
      DISCOVER_API(
        text,
        genre,
        year,
        type,
        text ? 'search' : 'discover',
        sortBy
      )
    );
    return data.results;
  };

  public getAllGenres = async (): Promise<IGenre[]> => {
    const { data } = await axios.get(GENRES_API);
    return data.genres;
  };

  public login = async (userName: string, password: string) => {
    const allUsers: IUser[] = JSON.parse(
      localStorage.getItem('loginData') || '[]'
    );
    const hasAccount = allUsers.find(
      (user) => user.username == userName && user.password == password
    );
    if (!hasAccount) {
      localStorage.setItem(
        'loginData',
        JSON.stringify([...allUsers, { username: userName, password }])
      );
    }
    localStorage.setItem('currentUser', userName);
    return true;
  };

  public logout = async (userName: string) => {
    const allUsers: IUser[] = JSON.parse(
      localStorage.getItem('loginData') || '[]'
    );
    const filteredUsers = allUsers.filter((user) => user.username !== userName);
    localStorage.setItem('loginData', JSON.stringify(filteredUsers));
    localStorage.removeItem('currentUser');
    return true;
  };
}

const api = new Api();
export default api;
