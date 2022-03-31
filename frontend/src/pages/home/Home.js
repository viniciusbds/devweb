import React, { useState } from 'react';
import LanguageContext from '../../utils/context/LanguageContext';
import './Home.css';

function Home() {
  const [language, setLanguage] = useState('');

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      <div className="intro">
        <header>
          <h2>
            {language === 'pt-br' ? 'Faça a sua aposta, torcedor!' : 'Make your bet, fan!'}
          </h2>
        </header>
      </div>
    </>
  );
}

export default Home;
