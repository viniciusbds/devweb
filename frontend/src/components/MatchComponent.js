import React from 'react';
import PropTypes from 'prop-types';
import './MatchComponent.css';

function MatchComponent(props) {
  const {
    game, team1, team2, date,
  } = props;

  return (
    <form className="match">
      <p>
        <strong>
          {game}
          {' '}
          |
          {' '}
          {team1}
          {' '}
          vs
          {' '}
          {team2}
          {' '}
          {date}
        </strong>
      </p>
    </form>
  );
}

MatchComponent.propTypes = {
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default MatchComponent;
