import React, { useEffect, useState } from 'react';
import {
  Button,
} from 'antd';
import {
  Link, useNavigate,
} from 'react-router-dom';

import LanguageContext from '../../utils/context/LanguageContext';
import './Games.css';
import Game from '../../components/game/Game';

function Games() {
  const [language, setLanguage] = useState('');
  const [games, setGamesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3005/games');
      const data = await response.json();
      setGamesList(data);
    }
    fetchData();
  }, []);

  const onCLick = () => {
    navigate('/newgame');
  };

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      <div className="new-game-btn">
        <Button
          className="new-team-button"
          variant="primary"
          as={Link}
          onClick={onCLick}
        >
          {language === 'pt-br' ? 'Adicionar jogo' : 'Add new game'}
        </Button>
      </div>

      <section>
        {games.map((m) => (
          <Game
            key={m.id}
            name={m.name}
            description={m.description}
          />
        ))}
      </section>
    </>
  );
}

export default Games;
