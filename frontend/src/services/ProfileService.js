import api from './api';
import BaseService from './BaseService';

class ProfileService extends BaseService {
  constructor() {
    super('profile');
  }

  async get() {
    return api.get(`${this.baseURL}`);
  }

  async update(data) {
    return api.put(`${this.baseURL}`, data);
  }
}

export default new ProfileService();
