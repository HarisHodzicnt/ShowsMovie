import { CssBaseline } from '@material-ui/core';
import { AppHeader } from '../../components/AppHeader';
import Favorites from '../../components/Favorites';

export const FavoriteContainer = () => {
  return (
    <>
      <CssBaseline />
      <AppHeader />
      <Favorites />
    </>
  );
};
