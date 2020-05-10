import styled from '@emotion/styled';

export const BackLink = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  text-decoration: none;
  margin: 10px;
  background: none;
  border: none;
  outline: none;

  > span {
    margin-left: 6px;
    display: inline-block;
  }

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: -2px;
  }

  :hover {
    color: #fff;
    cursor: pointer;
  }
`;
