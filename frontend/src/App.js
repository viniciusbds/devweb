import React, { useState } from 'react';
import LanguageContext from './utils/context/LanguageContext';
import MatchesList from './components/MatchesList';
import './App.css';

function App() {
  const [language, setLanguage] = useState('pt-br');
  return (
    <>
      <select
        value={language}
        onChange={(e) => {
          const newLanguage = e.target.value;
          setLanguage(newLanguage);
        }}
      >
        <option value="pt-br">pt-br</option>
        <option value="en">en</option>
      </select>

      <LanguageContext.Provider value={language}>
        <div className="App">
          <header>
            <div className="logo-div">
              <img src="./favicon.ico" alt="logo" />
              <p>esbet</p>
            </div>
            <h2>
              {language === 'pt-br' ? 'Faça a sua aposta, torcedor!' : 'Make your bet, fan!'}
            </h2>
          </header>
          <MatchesList />
        </div>
      </LanguageContext.Provider>
    </>
  );
}

export default App;
