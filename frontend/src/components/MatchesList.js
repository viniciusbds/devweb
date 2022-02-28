import React, { useEffect, useState } from 'react';
import LanguageContext from '../utils/context/LanguageContext';
import MatchComponent from './MatchComponent';
import './MatchesList.css';

function MatchesList() {
  const [matches, setMatches] = useState([]);
  const [language, setLanguage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3005/matches');
      const data = await response.json();
      setMatches(data);
    }
    fetchData();
  }, []);

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      {language === 'pt-br'
        ? (
          <div>
            <p>Lista de apostas</p>
            <section>
              {matches.map((m) => (
                <MatchComponent
                  key={m.id}
                  game={m.game}
                  team1={m.team1}
                  team2={m.team2}
                  date={m.date}
                />
              ))}
            </section>
          </div>
        )
        : (
          <div>
            <p>Bets list</p>
            <section>
              {matches.map((m) => (
                <MatchComponent
                  key={m.id}
                  game={m.game}
                  team1={m.team1}
                  team2={m.team2}
                  date={m.date}
                />
              ))}
            </section>
          </div>
        )}

    </>
  );
}

export default MatchesList;
