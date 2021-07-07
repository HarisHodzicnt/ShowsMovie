import { makeAutoObservable } from 'mobx';
import { IUser } from '../interfaces/IUsers';
import api from '../services';
export class UserStore {
  public loggedInUser: boolean = false;
  public userData: IUser = { username: '', password: '' };

  constructor() {
    makeAutoObservable(this);
    this.loggedInUser = this.checkLoginToken();
  }
  public loginUser = async ({ userName, password }: any) => {
    await api.login(userName, password);
    this.loggedInUser = true;
    this.userData = { username: userName, password: password };
    window.location.href = '/movies';
  };

  public logoutUser = async () => {
    await api.logout(this.userData.username);
    this.loggedInUser = false;
    window.location.href = '/';
  };

  public checkLoginToken = () => {
    const currentUser: string = localStorage.getItem('currentUser') || '{}';
    let isUserLoggedIn: boolean = false;
    if (currentUser) {
      const allUsers: IUser[] = JSON.parse(
        localStorage.getItem('loginData') || '[]'
      );
      const user = allUsers?.find((user) => user.username == currentUser);
      isUserLoggedIn = !!user;
      this.userData = { username: currentUser, password: '' };
    }
    return isUserLoggedIn;
  };
}
