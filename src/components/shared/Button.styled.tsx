import styled from '@emotion/styled';

export const Button = styled.button`
  background: var(--clr-primary);
  border: 1px solid var(--clr-secondary);
  border-radius: 4px;
  padding: 12px 16px;
  color: #fff;
  cursor: pointer;

  h3 {
    margin: 0;
  }

  &:hover {
    background-color: var(--clr-secondary);
  }
`;
