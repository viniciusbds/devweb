import React from 'react';
import MatchesList from './components/MatchesList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logo-div">
          <img src="./favicon.ico" alt="logo" />
          <p>esbet</p>
        </div>
        <h2>Faça a sua aposta torcedor!</h2>
      </header>
      <MatchesList />
    </div>
  );
}

export default App;
