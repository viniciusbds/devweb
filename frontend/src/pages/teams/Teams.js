import React, { useState, useEffect } from 'react';
import {
  Button,
} from 'antd';
import {
  Link, useNavigate,
} from 'react-router-dom';
import LanguageContext from '../../utils/context/LanguageContext';
import './Teams.css';
import Team from '../../components/team/Team';
import TeamsService from '../../services/TeamsService';
import GamesService from '../../services/GamesService';

function Teams() {
  const [language, setLanguage] = useState('');
  const [teams, setTeamsList] = useState([]);
  const [games, setGamesList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      const responseTeams = await TeamsService.find_all();
      setTeamsList(responseTeams.data);
      const responseGames = await GamesService.find_all();
      setGamesList(responseGames.data);
    }
    fetchData();
  }, []);

  const newPage = (e) => {
    e.preventDefault();
    navigate('/teams/new');
  };

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      <div className="new-team-btn">
        <Button
          variant="primary"
          as={Link}
          onClick={newPage}
        >
          {language === 'pt-br' ? 'Adicionar time' : 'Add new team'}
        </Button>
      </div>

      <section>
        {teams.map((m) => (
          <Team
            key={m.id}
            name={m.name}
            game={games.map((g) => {
              if (g.id === m.game) {
                return g.name;
              }
              return '';
            })}
            country={m.country}
          />
        ))}
      </section>
    </>
  );
}

export default Teams;
