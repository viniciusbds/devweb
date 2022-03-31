import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import {
  Form, Button, DatePicker, Select, Input,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

// stores and constants
import MatchStore from '../../stores/MatchStore';
import TypeFormPage from '../../constants/Constants';

import GamesService from '../../services/GamesService';
import TeamsService from '../../services/TeamsService';
import LanguageContext from '../../utils/context/LanguageContext';

const { TextArea } = Input;

const { Option } = Select;

const MatchFormPage = observer(() => {
  const params = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [type, setType] = useState(TypeFormPage.NEW);

  const [games, setGamesList] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [language, setLanguage] = useState('');

  async function getById() {
    return MatchStore.findById(params.id);
  }

  async function fetchTeamsByGameID(gameID) {
    const response = await TeamsService.fetchTeamsFilterByGameID(gameID);
    setAvailableTeams(response.data);
  }

  useEffect(async () => {
    MatchStore.resetDomain();
    form.setFieldsValue(MatchStore.match);
    if (params.id) {
      setType(TypeFormPage.UPDATE);
      await getById();
      await fetchTeamsByGameID(MatchStore.match.game);
      form.setFieldsValue(MatchStore.match);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await GamesService.find_all();
      setGamesList(response.data);
    }
    fetchData();
  }, []);

  async function onFinish() {
    if (type === TypeFormPage.UPDATE) {
      await MatchStore.update(params.id, () => {
        navigate('/matches');
      });
    } else {
      await MatchStore.save(() => {
        navigate('/matches');
      });
    }
  }

  return (
    <>
      {' '}
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>
      <Form
        name="basic"
        form={form}
        className="form-register"
        onFinish={() => onFinish()}
      >

        <Form.Item
          label={language === 'pt-br' ? 'Jogo' : 'Game'}
          name="game"
          rules={[{ required: true, message: language === 'pt-br' ? 'Obrigatorio inserir o jogo' : 'Must select a game' }]}
        >
          <Select
            onChange={(game) => {
              fetchTeamsByGameID(game);
              MatchStore.updateAttribute('game', game);
            }}
          >
            {games.map((opt) => (
              <Option value={opt.id}>{opt.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={language === 'pt-br' ? 'Time' : 'Team'}
          name="team1"
          rules={[{ required: true, message: language === 'pt-br' ? 'Obrigatorio inserir um time' : 'Must select a team ' }]}
        >
          <Select
            onChange={(team) => {
              MatchStore.updateAttribute('team1', team);
            }}
          >
            {availableTeams.map((opt) => (
              <Option value={opt.id}>{opt.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={language === 'pt-br' ? 'Time' : 'Team'}
          name="team2"
          rules={[{ required: true, message: language === 'pt-br' ? 'Obrigatorio inserir um time' : 'Must select a team ' }]}
        >
          <Select
            onChange={(team) => {
              MatchStore.updateAttribute('team2', team);
            }}
          >
            {availableTeams.map((opt) => (
              <Option value={opt.id}>{opt.name}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label={language === 'pt-br' ? 'Data' : 'Date'}
          name="date"
          rules={[{ required: true, message: language === 'pt-br' ? 'Obrigatorio uma data' : 'Must select a date ' }]}
        >
          <DatePicker
            value={MatchStore.match.date}
            mode="date"
            format="YYYY/MM/DDTHH:mm:ssSZ"
            showTime={{ defaultValue: moment('DD/MM/YYYYTHH:mmZ') }}
            onChange={(date) => {
              MatchStore.updateAttribute('date', date);
            }}
          />
        </Form.Item>

        <Form.Item
          label={language === 'pt-br' ? 'Descr' : 'Descr'}
          name="description"
          onChange={(e) => {
            MatchStore.updateAttribute('description', e.target.value);
          }}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>

      </Form>

    </>
  );
});

export default MatchFormPage;
