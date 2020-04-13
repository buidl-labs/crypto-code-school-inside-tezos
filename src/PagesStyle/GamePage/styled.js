import styled from '@emotion/styled';

export const MainContainer = styled.section`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
`;

export const Header = styled.section`
  position: absolute;
  top: 0;
  height: 10%;
  width: 100%;
  background-color: black;
`;

export const Footer = styled.section`
  position: absolute;
  bottom: 0;
  height: 10%;
  width: 100%;
  background-color: black;
`;

export const GameContainer = styled.section`
  width: 100%;
  height: 80%;
  position: absolute;
  top: 10%;
  left: 0;
  background: radial-gradient(
    198.67% 198.67% at 53.06% -50.22%,
    #183338 53.32%,
    #258c86 100%
  );
  z-index: 1;
`;
