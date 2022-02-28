import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MatchComponent.css';
import Bet from './BetComponent';
import LanguageContext from '../utils/context/LanguageContext';

function MatchComponent(props) {
  const {
    game, team1, team2, date,
  } = props;
  const [language, setLanguage] = useState('');

  const [showComponent, SetShowComponent] = useState(false);

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>

      <div className="match">
        <section>
          <strong>
            <p id="game">
              {game}
              {' '}
            </p>
            <p id="teams">
              {team1}
              {' '}
              vs
              {' '}
              {team2}
            </p>
            <p id="date">
              {date}
            </p>

          </strong>
        </section>

        {
        showComponent
          ? (
            <button
              id="bet-button"
              onClick={() => {
                SetShowComponent(!showComponent);
              }}
              type="button"
            >
              {language === 'pt-br' ? 'Voltar' : 'Return'}
            </button>
          ) : (
            <button
              id="bet-button"
              onClick={() => {
                SetShowComponent(!showComponent);
              }}
              type="button"
            >

              {language === 'pt-br' ? 'Selecionar esse jogo' : 'Select this game'}

            </button>
          )
      }

        {showComponent ? <Bet game={game} team1={team1} team2={team2} /> : null}
      </div>
    </>
  );
}

MatchComponent.propTypes = {
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MatchComponent;
