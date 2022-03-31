import api from './api';
import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super('users');
  }

  async create(matche) {
    return api.post(`${this.baseURL}`, matche);
  }

  async find_all() {
    return api.get(`${this.baseURL}`);
  }

  async findById(id) {
    return api.get(`${this.baseURL}/${id}`);
  }

  async getWallet(userEmail) {
    return api.get(`${this.baseURL}/wallet/${userEmail}`);
  }

  async udateWallet(userEmail, ammount) {
    return api.put(`${this.baseURL}/wallet/${userEmail}`, ammount);
  }

  async update(id, matche) {
    return api.put(`${this.baseURL}/${id}`, matche);
  }

  async delete(id) {
    return api.delete(`${this.baseURL}/${id}`);
  }
}

export default new UserService();
