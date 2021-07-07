import StarIcon from '@material-ui/icons/Star';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import { IMovieShow } from '../../interfaces/IMovieShow';
import './index.scss';
import { FAKE_IMG, IMG_URL } from '../../constants';
interface MovieShowCardProps {
  movieShow: IMovieShow;
  setFavorite: (movieOrShow: IMovieShow) => Promise<void>;
  isFavorite: boolean;
}

const MovieShowCard = (props: MovieShowCardProps) => {
  const { movieShow, isFavorite, setFavorite } = props;
  const url = `${IMG_URL}${movieShow.poster_path}`;

  const handleFavorites = (movieOrShow: IMovieShow) => () =>
    setFavorite(movieOrShow);

  return (
    <div key={movieShow.id} className="movie-show-card">
      <div className="poster-wrapper">
        <img src={movieShow.poster_path ? url : FAKE_IMG} />
      </div>
      <div className="content">
        <div className="header">
          <div className="title">
            {movieShow.original_title || movieShow.name}
          </div>
          <div className="rate">
            <StarIcon />
            {movieShow.vote_average}
          </div>
        </div>
        <div className="overview">{movieShow.overview}</div>
        <div className="footer">
          <div className="favorites" onClick={handleFavorites(movieShow)}>
            <BookmarksIcon
              className={`${isFavorite ? 'green-svg' : 'navy-svg'}`}
            />
            {!isFavorite ? 'Add to' : 'Remove from'} Favorites
          </div>
          <div className="date">
            {movieShow.release_date || movieShow.first_air_date}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieShowCard;
