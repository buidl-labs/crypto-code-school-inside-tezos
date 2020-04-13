import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/core';

import LeftCloudSvg from '../../assets/left_cloud.svg';
import RightCloudSvg from '../../assets/right_cloud.svg';

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
  overflow-y: hidden;
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

export const PlantContainer = styled.div`
  position: absolute;
  bottom: 20%;
  left: 250px;
  z-index: 6;
`;

const play = keyframes`
  100% {
    background-position: -1288px;
  }
`;

export const Zombie = styled.div`
  position: absolute;
  bottom: 20%;
  left: 100%;
  z-index: 5;
  opacity: 1;
  width: 143px;
  height: 223px;
  background: url('images/zombiewalking.svg');
  animation: ${play} 0.8s steps(9) infinite;
  transition: opacity 0.5s ease-out;
`;

export const deadZombie = styled.div`
  position: absolute;
  background: url('images/zombiewalking.svg');
  opacity: 0;
  z-index: 5;
`;

export const moveLeft = keyframes`
  0% { transform: translateX(-20%); opacity: 0.9; }
  100% { transform: translateX(-100vw); opacity: 0.9; }
`;
export const moveRight = keyframes`
  0% { transform: translateX(10%); opacity: 0.9; }
  100% { transform: translateX(100vw); opacity: 0.9; }
`;

export const LeftCloud = styled(LeftCloudSvg)`
  animation-name: ${moveRight};
  animation-duration: 400s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  left: 10px;
  right: 10;
  top: 5rem;
`;

export const RightCloud = styled(RightCloudSvg)`
  animation-name: ${moveLeft};
  animation-duration: 300s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  right: 10px;
  right: 10;
  top: 10rem;
`;