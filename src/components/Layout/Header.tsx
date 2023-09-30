/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';

const Header = () => {
  return (
    <header css={headerStyle}>
      <h1>GitHub Jobs</h1>
      <></>
    </header>
  );
};

const headerStyle = css`
  background: var(--clr-primary);
  height: min-content;
  display: flex;
  justify-content: space-between;

  h1 {
    color: #fff;
    padding: 0 8px;
  }
`;

export default Header;
