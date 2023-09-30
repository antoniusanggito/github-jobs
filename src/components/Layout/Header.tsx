/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Header = () => {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    logout();
    toast.success('Successfully logged out');
  };

  return (
    <header css={headerStyle}>
      <h1 onClick={handleClick}>GitHub Jobs</h1>
      {auth.isLoggedIn && (
        <LogoutBtn onClick={handleLogout}>
          <h3>Logout</h3>
        </LogoutBtn>
      )}
    </header>
  );
};

const headerStyle = css`
  background: var(--clr-primary);
  height: min-content;
  display: flex;
  justify-content: space-between;
  padding: 0 8px;

  h1 {
    color: #fff;
    padding: 0 8px;
    cursor: pointer;
  }
`;

const LogoutBtn = styled.button`
  padding: 0 10px;
  border: none;
  background: var(--clr-primary);
  color: #fff;
  cursor: pointer;

  &:hover {
    background: var(--clr-secondary);
  }
`;

export default Header;
