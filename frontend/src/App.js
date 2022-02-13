import React, { useState } from 'react';
import Bet from './components/BetComponent';

function App() {
  const [game] = useState('CS GO');
  const [teams] = useState(['NAVI', 'Vitallity']);

  return (
    <div className="App">
      <header>
        <div className="logo-div">
          <img src="./favicon.ico" alt="logo" />
          <p>esbet</p>
        </div>
        <h2>Faça a sua aposta torcedor!</h2>
      </header>
      <Bet game={game} team1={teams[0]} team2={teams[1]} />
    </div>
  );
}

export default App;
