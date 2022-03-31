import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Bet.css';
import GamesService from '../../services/GamesService';
import TeamsService from '../../services/TeamsService';
import MatcheService from '../../services/MatchService';

function Bet(props) {
  const {
    matcheID, teamWinner, ammount,
  } = props;
  const [games, setGamesList] = useState([]);

  const [matche, setMatche] = useState([]);
  const [teams, setTeamsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await MatcheService.findById(matcheID);
      setMatche(response.data);
      const responseGames = await GamesService.find_all();
      setGamesList(responseGames.data);
      const responseTeams = await TeamsService.find_all();
      setTeamsList(responseTeams.data);
    }
    fetchData();
  }, []);

  function getTeamNameByID(id) {
    for (let index = 0; index < teams.length; index += 1) {
      const element = teams[index];
      if (id === element.id) {
        return element.name;
      }
    }
    return '';
  }

  function getGameNameByID(id) {
    for (let index = 0; index < games.length; index += 1) {
      const element = games[index];
      if (id === element.id) {
        return element.name;
      }
    }
    return '';
  }

  return (
    <div className="match">

      <section>
        <div>
          <p>{getGameNameByID(matche.game)}</p>
          <p>
            <strong>
              {getTeamNameByID(matche.team1)}
              {' '}
              vs
              {' '}
              {getTeamNameByID(matche.team2)}
            </strong>
            {' | data:'}
            <i>{matche.date}</i>
          </p>
        </div>
      </section>

      <p id="name">
        {matche.date}
        {' '}
      </p>
      <strong>
        <p id="teamWinner">
          {teamWinner}
          {' '}
        </p>
        <p id="ammount">
          {ammount}
          {' '}

        </p>

      </strong>

    </div>
  );
}

Bet.propTypes = {
  matcheID: PropTypes.number.isRequired,
  teamWinner: PropTypes.string.isRequired,
  ammount: PropTypes.string.isRequired,
};

export default Bet;
