// eslint-disable-next-line import/no-cycle
import api from './api';
import BaseService from './BaseService';

class AuthService extends BaseService {
  constructor() {
    super('user_admin');
    this.TOKEN_KEY = 'token_user';
    this.ROLE_KEY = 'role_user';
    this.USER_EMAIL = 'email_user';
  }

  async userIsAdmin() {
    return api.get(`${this.baseURL}`);
  }

  isAuthenticated() {
    return sessionStorage.getItem(this.TOKEN_KEY) !== null;
  }

  getToken() {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  login(token) {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  setRole(role) {
    sessionStorage.setItem(this.ROLE_KEY, role);
  }

  setUserEmail(email) {
    sessionStorage.setItem(this.USER_EMAIL, email);
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }
}

export default new AuthService();
