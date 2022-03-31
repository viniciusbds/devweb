import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FinishBetComponent.css';
import {
  Form, Select, Button,
} from 'antd';
import LanguageContext from '../utils/context/LanguageContext';
import BetService from '../services/BetService';
import MatcheService from '../services/MatchService';

const { Option } = Select;

function FinishBetComponent(props) {
  const {
    team1, team1ID, team2, team2ID, matche, setMatches,
  } = props;
  const [selectedTeam, setSelectedTeam] = useState();
  const [language, setLanguage] = useState('');
  const [form] = Form.useForm();

  async function updateMatcheList() {
    const responseMatches = await MatcheService.find_all();
    setMatches(responseMatches.data);
  }

  const finish = () => {
    BetService.finishbet(matche, selectedTeam);
    updateMatcheList();
  };

  return (
    <>
      <LanguageContext.Consumer>
        {(value) => setLanguage(value)}
      </LanguageContext.Consumer>
      <Form
        name="bet"
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
            placeholder={language === 'pt-br' ? 'Equipe vencedora' : 'Winner team'}
          >

            <Option value={team1ID}>{team1}</Option>
            <Option value={team2ID}>{team2}</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            className="finalize-match-btn"
            type="button"
            onClick={finish}
          >
            {language === 'pt-br' ? 'Encerrar Partida' : 'Finalize Match'}
          </Button>

        </Form.Item>

      </Form>
    </>
  );
}

FinishBetComponent.propTypes = {
  team1: PropTypes.string.isRequired,
  team1ID: PropTypes.string.isRequired,
  team2: PropTypes.string.isRequired,
  team2ID: PropTypes.string.isRequired,
  matche: PropTypes.string.isRequired,
  setMatches: PropTypes.func.isRequired,

};

export default FinishBetComponent;
