import { makeAutoObservable } from 'mobx';

class MatchDomain {
  game = '';

  team1 = '';

  team2 = '';

  date = '';

  description = '';

  constructor() {
    makeAutoObservable(this);
  }

  getBackendObject() {
    return this;
  }

  setUpdate(key, newValue) {
    this[key] = newValue;
  }

  reset() {
    this.game = '';
    this.team1 = '';
    this.team2 = '';
    this.date = '';
    this.description = '';
  }
}

export default MatchDomain;
