import React from 'react';
import PropTypes from 'prop-types';
import './Game.css';

function Game(props) {
  const {
    name, description,
  } = props;

  return (
    <div className="match">
      <section>
        <strong>
          <p id="name">
            {name}
            {' '}
          </p>
          <p id="description">
            {description}
            {' '}

          </p>

        </strong>
      </section>

    </div>
  );
}

Game.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Game;
