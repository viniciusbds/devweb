import React, { useEffect, useState } from 'react';
import MatchComponent from './MatchComponent';
import './MatchesList.css';

function MatchesList() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3005/matches');
      const data = await response.json();
      setMatches(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <p>Lista com todas apostas possíveis (por enquanto, sem filtro)</p>
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
