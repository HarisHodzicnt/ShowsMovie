import { Grid } from '@material-ui/core';
import Filters from '../Filters';
import MoviesShows from '../MoviesShows';
const MainComponent = () => {
  return (
    <Grid container className="main-screen">
      <Filters />
      <MoviesShows />
    </Grid>
  );
};

export default MainComponent;
