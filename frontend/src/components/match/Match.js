import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Match.css';
import { useNavigate } from 'react-router-dom';
import {
  Button,
} from 'antd';
import Bet from '../BetComponent';
import LanguageContext from '../../utils/context/LanguageContext';
import FinishBetComponent from '../FinishBetComponent';
// import BetService from '../services/BetService';

function Match(props) {
  const {
    id, game, team1, team1ID, team2, team2ID, date, setMatches,
  } = props;
  const [language, setLanguage] = useState('');
  const [role] = useState(sessionStorage.getItem('role_user'));
  const navigate = useNavigate();

  const [showComponent, SetShowComponent] = useState(false);
  const [showFinishBetComponent, setShowFinishBetComponent] = useState(false);

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

        {(() => {
          if (showComponent && role === 'user') {
            return (
              <Button
                id="bet-button"
                onClick={() => {
                  SetShowComponent(!showComponent);
                }}
                type="button"
              >
                {language === 'pt-br' ? 'Voltar' : 'Return'}
              </Button>
            );
          }
          if (!showComponent && role === 'user') {
            return (
              <Button
                id="bet-button"
                onClick={() => {
                  SetShowComponent(!showComponent);
                }}
                type="button"
              >

                {language === 'pt-br' ? 'Selecionar esse jogo' : 'Select this game'}

              </Button>
            );
          }
          if (showFinishBetComponent && role === 'admin') {
            return (
              <>
                <Button
                  id="bet-button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/matches/edit/${id}`);
                  }}
                  type="button"
                >

                  {language === 'pt-br' ? 'Editar' : 'Edit'}

                </Button>
                <Button
                  id="bet-button"
                  onClick={() => {
                    setShowFinishBetComponent(!showFinishBetComponent);
                  }}
                  type="button"
                >
                  {language === 'pt-br' ? 'Voltar' : 'Return'}
                </Button>
              </>

            );
          }
          if (!showFinishBetComponent && role === 'admin') {
            return (
              <>
                <Button
                  id="bet-button"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/matches/edit/${id}`);
                  }}
                  type="button"
                >

                  {language === 'pt-br' ? 'Editar' : 'Edit'}

                </Button>
                <Button
                  id="bet-button"
                  onClick={() => {
                    setShowFinishBetComponent(!showFinishBetComponent);
                  }}
                  type="button"
                >

                  {language === 'pt-br' ? 'Finalizar aposta' : 'Finalize bet'}

                </Button>
              </>

            );
          }

          return (
            <>

            </>
          );
          // return (
          //   <>
          //     <button
          //       id="bet-button"
          //       onClick={(e) => {
          //         e.preventDefault();
          //         navigate(`/matches/edit/${id}`);
          //       }}
          //       type="button"
          //     >

          //       {language === 'pt-br' ? 'Editar' : 'Edit'}

          //     </button>
          //     <button
          //       id="bet-button"
          //       onClick={(e) => {
          //         e.preventDefault();
          //         navigate('/matches');
          //       }}
          //       type="button"
          //     >

          //       {language === 'pt-br' ? 'Fechar Partida' : 'Close Matche'}

          //     </button>
          //   </>
          // );
        })()}

        {showComponent ? (
          <Bet
            matche={id}
            team1={team1}
            team1ID={team1ID}
            team2={team2}
            team2ID={team2ID}
          />
        ) : null}
        {showFinishBetComponent
          ? (
            <FinishBetComponent
              matche={id}
              team1={team1}
              team1ID={team1ID}
              team2={team2}
              team2ID={team2ID}
              setMatches={setMatches}
            />
          ) : null}

      </div>
    </>
  );
}

Match.propTypes = {
  id: PropTypes.number.isRequired,
  game: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team1ID: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  team2ID: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  setMatches: PropTypes.func.isRequired,

};

export default Match;
