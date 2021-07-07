import { createContext } from 'react';
import { MovieShowStore } from '../stores/MovieShowsStore';
import { UserStore } from '../stores/UserStore';

export const rootStoreContext = createContext({
  movieShowStore: new MovieShowStore(),
  userStore: new UserStore(),
});
