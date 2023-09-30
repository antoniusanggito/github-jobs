/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Layout from '../Layout';
import { css } from '@emotion/react';
import { loginRequest } from '../../axios/services/loginRequest';
import toast from 'react-hot-toast';
import withoutAuth from '../utils/AuthHOC/withoutAuth';
import { useAuth } from '../context/AuthContext';
import { Button } from '../shared/Button.styled';

const Login = () => {
  const { login } = useAuth();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginRequest({ username, password });
      const { token } = response.data;
      toast.success('Login success!');
      login(token);
    } catch (error: any) {
      toast.error(`Error ${error.status}: ${error.data.message}`);
    }
  };

  return (
    <Layout>
      <section css={loginSection}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button
            type="submit"
            css={css`
              align-self: flex-end;
              margin: 20px 0;
            `}
          >
            <h3>Login</h3>
          </Button>
        </form>
        <p css={info}>
          *No requirement for register, valid credential examples can be found
          in file database.sql server (e.g. john: john123)
        </p>
      </section>
    </Layout>
  );
};

const loginSection = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;

  /* margin: 0 auto; */
  padding: 20px;
  border: 1px solid #ccc;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    width: 100%;
    max-width: 300px;
  }

  input {
    height: 40px;
    width: 100%;
    padding: 8px 12px;
  }
`;

const info = css`
  font-style: italic;
  color: #888;
`;

export default withoutAuth(Login);
