import { Grid } from '@material-ui/core';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../hooks/useStores';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';
import { IMovieShow } from '../../interfaces/IMovieShow';
import MovieShowCard from '../MovieShowCard.ts';
import './index.scss';
const MoviesShows = observer(() => {
  const { movieShowStore } = useStores();
  const data: IMovieShow[] =
    movieShowStore.activeTabSelect === 'Movies'
      ? movieShowStore.allMovies
      : movieShowStore.allShows;

  useEffect(() => {
    movieShowStore.callProperData();
  }, [movieShowStore.activeTabSelect]);

  const handleSort = (e: any) => {
    e.preventDefault();
    movieShowStore.getSortedBy(e.currentTarget.id);
  };
  const checkIsFavorite = (id: number) =>
    movieShowStore.allFavorites.find((item) => item.id === id) ? true : false;

  return (
    <Grid item xs={12} md={8} className="movies-shows">
      <div className="main-title">{movieShowStore.activeTabSelect}</div>
      <div className="flex-row sort">
        <div className="sort-by-name" id="name" onClick={handleSort}>
          <SortByAlphaIcon />
          <span>Sort by name</span>
        </div>
        <div className="sort-by-year" id="date" onClick={handleSort}>
          <SortIcon />
          <span>Sort by year</span>
        </div>
      </div>
      <div className="movie-show-list">
        {data.map((movieOrShow) => {
          return (
            <MovieShowCard
              key={movieOrShow.id}
              isFavorite={checkIsFavorite(movieOrShow.id)}
              movieShow={movieOrShow}
              setFavorite={movieShowStore.setFavorite}
            />
          );
        })}
      </div>
    </Grid>
  );
});

export default MoviesShows;
