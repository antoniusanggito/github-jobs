/** @jsxImportSource @emotion/react */
import React, { PropsWithChildren } from 'react';
import Header from './Header';
import { css } from '@emotion/react';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div css={layoutContainer}>
      <Header />
      <main css={mainContainer}>{children}</main>
    </div>
  );
};

const layoutContainer = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-height: 100vh;
`;

const mainContainer = css`
  flex-grow: 1;
`;

export default Layout;
