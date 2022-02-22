import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './MatchComponent.css';
import Bet from './BetComponent';

function MatchComponent(props) {
  const {
    game, team1, team2, date,
  } = props;

  const [showComponent, SetShowComponent] = useState(false);

  return (
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
              Voltar
            </button>
          ) : (
            <button
              id="bet-button"
              onClick={() => {
                SetShowComponent(!showComponent);
              }}
              type="button"
            >
              Selecionar esse jogo
            </button>
          )
      }

      {showComponent ? <Bet game={game} team1={team1} team2={team2} /> : null}
    </div>
  );
}

MatchComponent.propTypes = {
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MatchComponent;
