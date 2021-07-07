import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useStores } from '../hooks/useStores';
import { Login } from './Login';

interface PublicRouteProps {
  restricted?: boolean;
}

const PublicRoute = (
  props: PublicRouteProps & RouteProps
): React.ReactElement => {
  const { component: Component, ...rest } = props;
  const { userStore } = useStores();

  const render = (props: any) => {
    if (userStore.loggedInUser) {
      return <Redirect to={'/movies'} />;
    }
    return <Login {...props} />;
  };

  return <Route {...rest} render={render} />;
};

export default PublicRoute;
