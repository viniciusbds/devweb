import api from './api';
import BaseService from './BaseService';

class BetService extends BaseService {
  constructor() {
    super('bets');
  }

  async create(bet) {
    return api.post(`${this.baseURL}/bet`, bet);
  }

  async find_all() {
    return api.get(`${this.baseURL}`);
  }

  async findByUserEmail(userEmail) {
    return api.get(`${this.baseURL}/?userEmail=${userEmail}`);
  }

  async finishbet(matcheID, teamWinner) {
    return api.post(`${this.baseURL}/finish/${matcheID}`, { teamWinner });
  }

  async delete(id) {
    return api.delete(`${this.baseURL}/${id}`);
  }
}

export default new BetService();
