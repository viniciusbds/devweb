import {
  action, makeObservable, observable, runInAction,
} from 'mobx';
import moment from 'moment';
import { openNotificationWithIcon } from '../utils/Notification';
import MatchDomain from '../domains/MatchDomain';
import MatchService from '../services/MatchService';

class MatchStore {
  match = new MatchDomain();

  constructor() {
    makeObservable(this, {
      updateAttribute: action,
      save: action,
      match: observable,
    });
  }

  updateAttribute(attribute, value) {
    this.match[attribute] = value;
  }

  async save(cbSuccess) {
    try {
      await MatchService.create(this.match);

      openNotificationWithIcon(
        'success',
        'Cadastro efetuado com sucesso!',
        'Você fez o cadastro com sucesso',
      );
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const errorResponse = error?.response;
      openNotificationWithIcon('error', 'Algum problema!', errorResponse.data.message);
    }
  }

  async update(id, cbSuccess) {
    try {
      await MatchService.update(id, this.match);

      openNotificationWithIcon(
        'success',
        'Partida atualizada com sucesso!',
        'Você atualizou com sucesso',
      );
      if (cbSuccess) {
        cbSuccess();
      }
    } catch (error) {
      const errorResponse = error?.response;
      openNotificationWithIcon('error', 'Algum problema!', errorResponse.data.message);
    }
  }

  resetDomain() {
    this.match.reset();
  }

  async findById(id) {
    try {
      const response = await MatchService.findById(id);
      const { data } = response;

      runInAction(() => {
        this.match.setUpdate('id', data.id);
        this.match.setUpdate('game', data.game);
        this.match.setUpdate('team1', data.team1);
        this.match.setUpdate('team2', data.team2);
        this.match.date = moment(new Date(data.date));
        this.match.setUpdate('description', data.description);
      });
    } catch (error) {
      const errorResponse = error?.response;
      openNotificationWithIcon('error', 'Algum problema!', errorResponse.data.message);
    }
  }
}

export default new MatchStore();
