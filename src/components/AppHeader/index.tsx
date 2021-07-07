import { AppBar, Button, Link, Toolbar, Typography } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { useStores } from '../../hooks/useStores';
import './index.scss';
export const AppHeader = () => {
  const { userStore } = useStores();
  return (
    <AppBar position="static" className="app-header">
      <Toolbar>
        <Typography variant="h6" className="menu-title">
          <Link href="/movies">MTWT series</Link>
        </Typography>
        <div className="menu-login">
          <Button color="inherit" onClick={userStore.logoutUser}>
            Logout
          </Button>
          <AccountCircle />
        </div>
      </Toolbar>
    </AppBar>
  );
};
