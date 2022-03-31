import React, { useEffect, useState } from 'react';
import {
  Form, Button, Select,
} from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import {
  Link, useNavigate,
} from 'react-router-dom';
import LanguageContext from '../../utils/context/LanguageContext';
import Match from '../../components/match/Match';
import './MatchList.css';
import GamesService from '../../services/GamesService';
import MatchService from '../../services/MatchService';
import TeamsService from '../../services/TeamsService';

const { Option } = Select;

function MatchList() {
  const [matches, setMatches] = useState([]);
  const [language, setLanguage] = useState('');
  const [role] = useState(sessionStorage.getItem('role_user'));
  const [games, setGamesList] = useState([]);
  const [teams, setTeamsList] = useState([]);
  const [form] = Form.useForm();

  const navigate = useNavigate();

  async function getMatchesByGame(gameID) {
    const responseMatches = await MatchService.findByGame(gameID);
    setMatches(responseMatches.data);
  }

  useEffect(() => {
    async function fetchData() {
      const responseMatches = await MatchService.find_all();
      setMatches(responseMatches.data);

      const responseGames = await GamesService.find_all();
      setGamesList(responseGames.data);

      const responseTeams = await TeamsService.find_all();
      setTeamsList(responseTeams.data);
    }
    fetchData();
  }, []);

  const newPage = (e) => {
    e.preventDefault();
    navigate('/matches/new');
  };

  function getTeamNameByID(id) {
    for (let index = 0; index < teams.length; index += 1) {
      const element = teams[index];
      if (id === element.id) {
        return element.name;
      }
    }
    return '';
  }

  function getGameNameByID(id) {
    for (let index = 0; index < games.length; index += 1) {
      const element = games[index];
      if (id === element.id) {
        return element.name;
      }
    }
    return '';
  }

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      <div className="new-match-btn">
        {role === 'admin' ? (
          <Button
            icon={<AppstoreAddOutlined />}
            type="primary"
            as={Link}
            onClick={newPage}
          >
            {language === 'pt-br' ? 'Adicionar partida' : 'Add new matche'}
          </Button>
        ) : <p />}
      </div>

      <div className="select-game-btn">
        <Form
          name="basic"
          form={form}
        >

          <Form.Item
            name="game"
          >
            <Select
              onChange={(game) => {
                getMatchesByGame(game);
              }}
              placeholder={language === 'pt-br' ? 'Filtrar por jogo' : 'Filter by Game'}
            >
              {games.map((opt) => (
                <Option value={opt.id}>{opt.name}</Option>
              ))}
              <Option value="">Todos os times</Option>

            </Select>
          </Form.Item>

        </Form>
      </div>

      <section>
        {matches.map((m) => (
          <Match
            key={m.id}
            id={m.id}
            game={getGameNameByID(m.game)}
            team1={getTeamNameByID(m.team1)}
            team1ID={m.team1}
            team2={getTeamNameByID(m.team2)}
            team2ID={m.team2}
            date={m.date}
            setMatches={setMatches}
          />
        ))}
      </section>

    </>
  );
}

export default MatchList;
