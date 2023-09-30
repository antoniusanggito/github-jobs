/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import Layout from '../Layout';
import { css } from '@emotion/react';

type Props = {};

const Login = (props: Props) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = () => {
    console.log(username, password);
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
          />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </section>
    </Layout>
  );
};

const loginSection = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 95%;
  max-width: 400px;
  min-height: 100%;

  /* margin: 0 auto; */
  padding: 20px;
  border: 1px solid #ccc;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  input {
    height: 40px;
    padding: 4px 8px;
  }
`;

export default Login;
