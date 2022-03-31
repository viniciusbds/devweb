import api from './api';
import BaseService from './BaseService';

class GamesService extends BaseService {
  constructor() {
    super('games');
  }

  async create(game) {
    return api.post(`${this.baseURL}`, game);
  }

  async find_all() {
    return api.get(`${this.baseURL}`);
  }

  async findById(id) {
    return api.get(`${this.baseURL}/${id}`);
  }

  async update(id, game) {
    return api.put(`${this.baseURL}/${id}`, game);
  }

  async delete(id) {
    return api.delete(`${this.baseURL}/${id}`);
  }
}

export default new GamesService();
