import styled from '@emotion/styled';
import { jsx, css, keyframes } from '@emotion/core';

import LeftCloudSvg from '../../assets/left_cloud.svg';
import RightCloudSvg from '../../assets/right_cloud.svg';
import LighteningSvg from '../../assets/GameAssets/lightening.svg';

import { Link } from 'gatsby';

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
  justify-content: space-between;
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

export const Instructions = styled.div`
  display: none;
  position: absolute;
  left: 40%;
  top: 30px;
  width: 20%;
  min-width: 300px;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 40px;
  font-size: 1.2rem;
  text-align: center;
  padding: 1rem;
  color: #ffffff;
`;

export const PlantContainer = styled.div`
  position: absolute;
  bottom: 20%;
  left: 250px;
  z-index: 6;
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

const play = keyframes`
  100% {
    background-position: -1288px;
  }
`;

export const moveLeft = keyframes`
  0% { transform: translateX(-20%); opacity: 0.9; }
  100% { transform: translateX(-100vw); opacity: 0.9; }
`;
export const moveRight = keyframes`
  0% { transform: translateX(10%); opacity: 0.9; }
  100% { transform: translateX(100vw); opacity: 0.9; }
`;

const slideInFromTop = keyframes`
  0% { transform: translateY(-50vh); }
  100% { transform: translateY(0); }
`;

const fadeIn = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
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

export const Lightening = styled(LighteningSvg)`
  position: absolute;
  z-index: 7;
  left: calc(50% - 220px);
  top: -10%;
  animation-name: ${slideInFromTop};
  animation-duration: 0.5s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

export const StartSymbolContainer = styled.div`
  position: absolute;
  z-index: 7;
  left: 37.5%;
  opacity: 0;
  top: 30%;
  width: 20%;
  animation-name: ${fadeIn};
  animation-duration: 1s;
  animation-delay: 0.5s;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  animation-timing-function: cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: #fff;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-decoration: none;
  font-size: 23px;
  line-height: 175%;
  margin: 0 10px;
  width: 120px;

  > span {
    margin-left: 6px;
    margin-top: 10px;
    display: inline-block;
  }

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: -2px;
  }
`;
