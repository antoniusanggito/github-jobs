import { css } from '@emotion/react';

export default css`
  :root {
    --clr-primary: #517eb9;
    --clr-secondary: #334352;
    --clr-info: #5f953d;
    --clr-background: #fafafa;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    font-size: 16px;
    scroll-behavior: smooth;
    line-height: normal;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  /* a {
    color: inherit;
    text-decoration: none;
  } */
`;
