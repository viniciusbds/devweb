import api from './api';
import BaseService from './BaseService';

class MatchService extends BaseService {
  constructor() {
    super('matches');
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

  async findByGame(gameid) {
    return api.get(`${this.baseURL}?game=${gameid}`);
  }

  async update(id, matche) {
    return api.put(`${this.baseURL}/${id}`, matche);
  }

  async delete(id) {
    return api.delete(`${this.baseURL}/${id}`);
  }
}

export default new MatchService();
