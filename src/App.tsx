import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.scss';
import { Login } from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { MovieShowsContainer } from './containers/MovieShowsCointainer';
import { FavoriteContainer } from './containers/FavoriteContainer';
function App() {
  return (
    <div className="app">
      <Router>
        <Switch>
          <PublicRoute path="/login" exact>
            <Login />
          </PublicRoute>
          <PrivateRoute path="/" exact>
            <MovieShowsContainer />
          </PrivateRoute>
          <PrivateRoute path="/movies" exact>
            <MovieShowsContainer />
          </PrivateRoute>
          <PrivateRoute path="/favorites" exact>
            <FavoriteContainer />
          </PrivateRoute>
        </Switch>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
      />
    </div>
  );
}
export default App;
