import { action, makeAutoObservable, runInAction } from 'mobx';

import AuthService from '../services/AuthService';
import LoginService from '../services/LoginService';
import ProfileService from '../services/ProfileService';
import { openNotificationWithIcon } from '../utils/Notification';

/**
 * Classe responsável por verificar autenticação do usuário.
 */
class AuthStore {
  isAdmin = false;

  isAuthenticated = false;

  profile = {};

  constructor() {
    makeAutoObservable(this, {
      login: action,
      logout: action,
      getIsAdmin: action,
      userIsAdmin: action,
      verifyIsAuthenticated: action,
    });
  }

  async getIsAdmin() {
    try {
      const response = await AuthService.userIsAdmin();
      this.isAdmin = response.data.is_admin;
    } catch (error) {
      console.error('Algum erro ocorreu!');
    }
  }

  async getUser() {
    try {
      const response = await ProfileService.get();
      runInAction(() => {
        this.profile = response.data;
      });
    } catch (error) {
      console.error('Algum erro ocorreu!');
    }
  }

  async userIsAdmin(callback) {
    try {
      const response = await AuthService.userIsAdmin();
      const userAdmin = response.data.is_admin;
      this.isAdmin = userAdmin;
      if (callback && !userAdmin) {
        openNotificationWithIcon(
          'error',
          'Algum problema!',
          'você não tem permissão para acessar essa página!',
        );
        callback();
      }
    } catch (error) {
      openNotificationWithIcon(
        'error',
        'Algum problema!',
        'você não tem permissão para acessar essa página!',
      );
      callback();
    }
  }

  async login(user, callback) {
    try {
      const response = await LoginService.create(user);
      AuthService.login(response.data.token);
      AuthService.setRole(response.data.role);
      AuthService.setUserEmail(response.data.email);

      this.verifyIsAuthenticated();
      openNotificationWithIcon(
        'success',
        'Login efetuado com sucesso!',
        'Você fez Login com sucesso',
      );
      if (callback) {
        callback();
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Algum problema!', 'Verifique as suas credenciais.');
    }
  }

  logout(callback) {
    try {
      AuthService.logout();
      this.verifyIsAuthenticated();
      openNotificationWithIcon(
        'success',
        'Logout efetuado com sucesso!',
        'Você fez logout com sucesso',
      );
      if (callback) {
        callback();
      }
    } catch (error) {
      openNotificationWithIcon('error', 'Algum problema!', 'Verifique as suas credenciais.');
    }
  }

  // eslint-disable-next-line class-methods-use-this
  verifyLogin() {
    const token = AuthService.getToken();
    return token;
  }

  verifyIsAuthenticated = () => {
    this.isAuthenticated = AuthService.isAuthenticated();
    return this.isAuthenticated;
  };
}

export default new AuthStore();
