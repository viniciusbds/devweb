import React from 'react';

import {
  Button, Form, Input,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import GamesService from '../../services/GamesService';
import './NewGame.css';

function NewGame() {
  const navigate = useNavigate();

  async function onFinish(values) {
    await GamesService.create({
      name: values.name,
      description: values.description,
    });
    navigate('/games');
  }

  return (
    <Form
      onFinish={(values) => { onFinish(values); }}
    >
      <Form.Item
        label="Nome"
        name="name"
        className="game-creation-form"
        controlId="formBasicName"
        placeholder="Insira um nome"
        rules={[{ required: true, message: 'Obrigatorio inserir um nome' }]}

      >
        <Input placeholder="Insira um nome" />
      </Form.Item>

      <Form.Item
        label="Descrição"
        name="description"
        className="game-creation-form"
        controlId="formBasicDescription"
      >
        <Input placeholder="Insira uma descrição" />
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

export default NewGame;
