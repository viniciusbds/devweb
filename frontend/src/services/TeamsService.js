import api from './api';
import BaseService from './BaseService';

class TeamsService extends BaseService {
  constructor() {
    super('teams');
  }

  async create(team) {
    return api.post(`${this.baseURL}`, team);
  }

  async find_all() {
    return api.get(`${this.baseURL}`);
  }

  async findById(id) {
    return api.get(`${this.baseURL}/${id}`);
  }

  async fetchTeamsFilterByGameID(gameID) {
    return api.get(`${this.baseURL}?game=${gameID}`);
  }

  async update(id, game) {
    return api.put(`${this.baseURL}/${id}`, game);
  }

  async delete(id) {
    return api.delete(`${this.baseURL}/${id}`);
  }
}

export default new TeamsService();
