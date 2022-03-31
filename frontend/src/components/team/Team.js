import React from 'react';
import PropTypes from 'prop-types';
import './Team.css';

function Team(props) {
  const {
    game, name, country,
  } = props;

  return (
    <div className="match">
      <section>
        <strong>
          <p id="name">
            {name}
            {' '}
          </p>
          <p id="game">
            {game}
            {' '}
          </p>
          <p id="country">
            {country}
            {' '}

          </p>

        </strong>
      </section>

    </div>
  );
}

Team.propTypes = {
  game: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,

};

export default Team;
