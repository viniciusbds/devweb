import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BetComponent.css';

function BetComponent(props) {
  const { game, team1, team2 } = props;
  const [selectedTeam, setSelectedTeam] = useState();
  const [betAmount, setBetAmount] = useState(0);

  const alerta = () => { alert(`apostou ${betAmount} R$ na equipe ${selectedTeam} do jogo: ${game}`); };

  return (
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
          placeholder="Valor"
          onChange={(e) => {
            setBetAmount(e.target.value);
          }}
        />
      </section>

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
      <button type="button" onClick={alerta}>Apostar</button>

    </form>
  );
}

BetComponent.propTypes = {
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
};

export default BetComponent;
