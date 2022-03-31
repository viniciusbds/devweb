import React from 'react';

import {
  Form, Input, Button,
} from 'antd';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import LoginStore from '../../stores/LoginStore';
import { useUserStore } from '../../providers/UserProvider';

function Login() {
  const UserStore = useUserStore();
  const navigate = useNavigate();

  const onFinish = async () => {
    await UserStore.login(LoginStore.user_login, () => {
      navigate('/');
    });
  };

  return (
    <div className="login-box">
      <p>Login Page</p>
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Insira o email' }]}
        >
          <Input
            placeholder="Email"
            onChange={(e) => LoginStore.updateAttribute('email', e.target.value)}
          />

        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Insira a senha!' }]}
        >
          <Input.Password
            placeholder="Senha"
            onChange={(e) => LoginStore.updateAttribute('password', e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
