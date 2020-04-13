import styled from '@emotion/styled';

// import plant from '../../assets/GameAssets/plantShooter.png';
import plant from '../../images/forest.png';

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
  display: flex;
  justify-content: center;
  align-items: center;
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

export const StartButton = styled.button`
  position: absolute;
  color: white;
  width: 100px;
  left: calc(50% - 50px);
  top: 60px;
  text-shadow: 2px 2px black;
`;

export const Instructions = styled.h1`
  position: absolute;
  color: white;
  left: 30%;
  top: 120px;
`;

export const Plant = styled.div`
  position: absolute;
  bottom: 15%;
  left: 200px;
  z-index: 6;
  background: url(${plant});
  width: 180px;
  height: 280px;
`;
