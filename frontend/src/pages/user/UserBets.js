import React, { useEffect, useState } from 'react';

import BetService from '../../services/BetService';
import Bet from '../../components/bet/Bet';
import './UserBets.css';
import TeamsService from '../../services/TeamsService';

function UserBets() {
  const [bets, setUserBets] = useState([]);
  const [useremail] = useState(sessionStorage.getItem('email_user'));
  const [teams, setTeamsList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await BetService.findByUserEmail(useremail);
      setUserBets(response.data);
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

  return (
    <section>
      {bets.map((m) => (
        <Bet
          key={m.id}
          matcheID={m.matcheID}
          teamWinner={`equipe apostada: ${getTeamNameByID(m.teamWinner)}`}
          ammount={`valor apostado: ${m.ammount} R$`}
        />
      ))}
    </section>
  );
}

export default UserBets;
