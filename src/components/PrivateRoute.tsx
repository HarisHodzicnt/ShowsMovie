import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useStores } from '../hooks/useStores';

function PrivateRoute(props: any): React.ReactElement {
  const { children, ...rest } = props;
  const { userStore } = useStores();
  const render = (props: any) => {
    if (!userStore.loggedInUser) {
      return <Redirect to={'/login'} />;
    }
    return children;
  };

  return <Route {...rest} render={render} />;
}

export default PrivateRoute;
