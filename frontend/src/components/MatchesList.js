import React, { useEffect, useState } from 'react';
import MatchComponent from './MatchComponent';

function MatchesList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const response = fetch('http://localhost:3005/matches');
    response.then((res) => {
      res.json().then((m) => {
        setMatches(m);
      });
    });
  }, []);

  return (
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
  );
}

export default MatchesList;
