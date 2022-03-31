import React, { useEffect, useState } from 'react';
import {
  Button, Form, Input, Select,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import './NewTeam.css';

const { Option } = Select;

function NewTeam() {
  const [games, setGamesList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3005/games');
      const data = await response.json();
      setGamesList(data);
    }
    fetchData();
  }, []);

  async function onFinish(values) {
    const requestOptions = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        game: values.game,
        name: values.name,
        country: values.country,
      }),
    };
    await fetch('http://localhost:3005/teams', requestOptions);
    navigate('/teams');
  }

  return (
    <Form
      onFinish={(values) => { onFinish(values); }}
    >
      <Form.Item
        name="game"
        label="Jogo"
        className="team-creation-form"
        controlId="formBasicGame"
      >
        <Select
          placeholder="Selecionar jogo"
        >
          {games.map((opt) => (
            <Option value={opt.id}>{opt.name}</Option>
          ))}

        </Select>
      </Form.Item>

      <Form.Item
        name="name"
        label="Nome"
        className="team-creation-form"
        controlId="formBasicName"
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="country"
        label="País"
        className="team-creation-form"
        controlId="formBasicCountry"
      >
        <Input />
      </Form.Item>

      <Button
        type="primary"
        htmlType="submit"
      >
        Create
      </Button>

    </Form>
  );
}

export default NewTeam;
