import api from './api';
import BaseService from './BaseService';

class LoginService extends BaseService {
  constructor() {
    super('authenticate');
  }

  async create(userLogin) {
    return api.post(`${this.baseURL}`, userLogin);
  }
}

export default new LoginService();
