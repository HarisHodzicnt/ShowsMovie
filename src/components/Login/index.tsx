import { Button, Input } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';
import { useStores } from '../../hooks/useStores';

export const Login = () => {
  const [loginData, setLoginData] = useState<{
    userName: string;
    password: string;
  }>({ userName: '', password: '' });
  const { userStore } = useStores();
  let history = useHistory();

  const handleInputChange = (
    event: React.ChangeEvent<{ value: string; id: string }>
  ) => {
    const { id, value } = event.target;
    setLoginData({ ...loginData, [id]: value });
  };

  const handleSubmit = (e: any) => {
    userStore.loginUser(loginData);
    history.push('/movies');
  };
  return (
    <div className="login-screen">
      <div className="wrapper">
        <div className="title">Welcome to the MTWT series</div>
        <Input
          className="flex-row"
          id="userName"
          placeholder="Enter your name please ..."
          onChange={handleInputChange}
          value={loginData.userName}
        />
        <Input
          className="flex-row"
          id="password"
          type="password"
          placeholder="Enter your password please ..."
          onChange={handleInputChange}
          value={loginData.password}
        />
        <Button className="flex-row" onClick={handleSubmit}>
          Login
        </Button>
      </div>
    </div>
  );
};
