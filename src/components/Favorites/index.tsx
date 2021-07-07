import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useStores } from '../../hooks/useStores';
import { ISort } from '../../interfaces/ISort';
import MovieShowCard from '../MovieShowCard.ts';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import SortIcon from '@material-ui/icons/Sort';
import './index.scss';
const Favorites = observer(() => {
  const { movieShowStore } = useStores();
  useEffect(() => {
    movieShowStore.getAllFavorites();
  }, []);
  const handleSort = (e: any) => {
    e.preventDefault();
    const sortType =
      movieShowStore.sortByMethod.type === 'asc' ? 'desc' : 'asc';
    const sortBy =
      e.currentTarget.id === 'name' ? 'original_title' : 'release_date';
    const sort: ISort = { type: sortType, sortBy: sortBy };
    movieShowStore.sortByMethod = sort;
    movieShowStore.sortFavorites(sort);
  };
  const hasData = movieShowStore.allFavorites.length > 0;
  return (
    <div className="favorite">
      {hasData && <div className="main-title">Favorites</div>}
      {hasData && (
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
      )}
      <div className="movie-show-list">
        {movieShowStore.allFavorites.length > 0 ? (
          movieShowStore.allFavorites.map((movieOrShow) => {
            return (
              <MovieShowCard
                key={movieOrShow.id}
                isFavorite={true}
                movieShow={movieOrShow}
                setFavorite={movieShowStore.setFavorite}
              />
            );
          })
        ) : (
          <div className="main-title">Your list is empy</div>
        )}
      </div>
    </div>
  );
});

export default Favorites;
