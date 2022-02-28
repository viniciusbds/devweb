import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BetComponent.css';
import LanguageContext from '../utils/context/LanguageContext';

function BetComponent(props) {
  const { game, team1, team2 } = props;
  const [selectedTeam, setSelectedTeam] = useState();
  const [betAmount, setBetAmount] = useState(0);
  const [language, setLanguage] = useState('');

  const alerta = () => { alert(`apostou ${betAmount} R$ na equipe ${selectedTeam} do jogo: ${game}`); };

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>
      <form className="bet">

        <select
          value={selectedTeam}
          onChange={(e) => {
            const newTeam = e.target.value;
            setSelectedTeam(newTeam);
          }}
        >
          <option value=""> </option>
          <option value={team1}>{team1}</option>
          <option value={team2}>{team2}</option>
        </select>

        <section>
          <input
            type="number"
            id="contactChoice2"
            placeholder="R$"
            onChange={(e) => {
              setBetAmount(e.target.value);
            }}
          />
        </section>

        {language === 'pt-br'
          ? (
            <p id="confirm-msg">
              Confirmo a aposta de
              <strong>
                {betAmount}
                {' '}
                R$
              </strong>
              {' '}
              na equipe
              <strong>{selectedTeam}</strong>
            </p>
          )
          : (
            <p id="confirm-msg">
              I confirm the
              {' '}
              <strong>
                {betAmount}
                {' '}
                R$
              </strong>
              {' '}
              bet on the
              {' '}
              <strong>{selectedTeam}</strong>
              team
            </p>
          )}

        <button type="button" onClick={alerta}>{language === 'pt-br' ? 'Apostar' : 'Bet'}</button>

      </form>
    </>
  );
}

BetComponent.propTypes = {
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
};

export default BetComponent;
