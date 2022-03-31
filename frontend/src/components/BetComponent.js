import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './BetComponent.css';
import { useNavigate } from 'react-router-dom';
import {
  Select, Button, InputNumber, Form,
} from 'antd';
import LanguageContext from '../utils/context/LanguageContext';
import BetService from '../services/BetService';

const { Option } = Select;

function BetComponent(props) {
  const {
    matche, team1, team1ID, team2, team2ID,
  } = props;
  const [form] = Form.useForm();

  const [selectedTeam, setSelectedTeam] = useState();

  const [betAmount, setBetAmount] = useState(0);
  const [language, setLanguage] = useState('');
  const [useremail] = useState(sessionStorage.getItem('email_user'));
  const navigate = useNavigate();

  const bet = async () => {
    await BetService.create({
      matcheID: matche,
      userEmail: useremail,
      ammount: betAmount,
      teamWinner: selectedTeam,
    });
    navigate('/bets');
  };

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>
      <Form
        className="bet"
        form={form}
      >

        <Form.Item
          name="winnerTeam"
        >
          <Select
            value={selectedTeam}
            onChange={(team) => {
              setSelectedTeam(team);
            }}
            placeholder={language === 'pt-br' ? 'Equipe' : 'Team'}
          >
            <Option value={team1ID}>{team1}</Option>
            <Option value={team2ID}>{team2}</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="value"
        >
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            placeholder="R$"
            onChange={(v) => {
              setBetAmount(v);
            }}
          />
        </Form.Item>

        {language === 'pt-br'
          ? (
            <p id="confirm-msg">
              Confirmo a aposta de
              {' '}
              <strong>
                {betAmount}
                {' '}
                R$
              </strong>
              {' '}
              nessa equipe
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

        <Button
          type="button"
          onClick={bet}
        >
          {language === 'pt-br' ? 'Apostar' : 'Bet'}

        </Button>

      </Form>
    </>
  );
}

BetComponent.propTypes = {
  matche: PropTypes.string.isRequired,
  team1: PropTypes.string.isRequired,
  team1ID: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  team2ID: PropTypes.string.isRequired,

};

export default BetComponent;
