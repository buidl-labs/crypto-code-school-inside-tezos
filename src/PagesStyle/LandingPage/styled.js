import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'gatsby';
import LogoSVG from '../../assets/theme.svg';
import StartLearningSVG from '../../assets/start_learning.svg';
import PlantSVG from '../../assets/plant.svg';
import ZombieSVG from '../../assets/zombie.svg';
import LeftCloudSvg from '../../assets/left_cloud.svg';
import RightCloudSvg from '../../assets/right_cloud.svg';

const moveLeft = keyframes`
  0% { transform: translateX(-20vw); opacity: 0.9; }
  100% { transform: translateX(-90vw); opacity: 0.9; }
`;
const moveRight = keyframes`
  0% { transform: translateX(10vw); opacity: 0.9; }
  100% { transform: translateX(90vw); opacity: 0.9; }
`;

export const LeftCloud = styled(LeftCloudSvg)`
  animation-name: ${moveRight};
  animation-duration: 100s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  left: 10px;
  right: 10px;
  top: 50px;
  overflow-x: hidden;

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const RightCloud = styled(RightCloudSvg)`
  animation-name: ${moveLeft};
  animation-duration: 80s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  right: 10px;
  top: 150px;
  overflow-x: hidden;

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const Zombie = styled(ZombieSVG)`
  max-width: 15vw;
  max-height: 30vh;
`;

export const StartLearning = styled(StartLearningSVG)`
  max-width: 25vw;
  max-height: 25vh;

  :hover {
    cursor: pointer;
    transform: scale(1.1) rotate(-5deg);
  }
`;

export const Plant = styled(PlantSVG)`
  max-width: 15vw;
  max-height: 25vh;
`;

export const Logo = styled(LogoSVG)`
  max-width: 30vw;
  max-height: 25vh;
  margin: 40px 0;

  @media only screen and (max-height: 700px) {
    margin: 40px 0 0 0;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 95vh;

  @media only screen and (max-width: 425px) {
    margin: 0 1rem;
    >div: first-of-type {
      margin: 0 1rem;
    }

    ${'' /* h1 {
      font-size: 27px;
    }

    p {
      font-size: 14px;
    } */}
  }
`;

export const HeroTitle = styled.h1`
  text-align: center;
  color: #ffffff;
  max-width: 900px;
  width: 80%;
  border-bottom: none;
`;

export const HeroSubheading = styled.p`
  text-align: center;
  color: #98a4a6;
  max-width: 650px;
`;

export const InnerContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 4rem 1rem 0 1rem;
  justify-content: space-between;
  align-items: baseline;
  position: absolute;
  bottom: 0;

  > div:first-of-type {
  }
`;

export const StartLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;

  border: 5px solid rgba(41, 203, 106, 0.41);
  background: #29cb6a;
  border-radius: 7px;
  color: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 1px;
  }

  :hover {
    color: #ffffff;
    box-shadow: 0 0 0 0.25rem rgba(41, 203, 106, 0.2);
  }

  :before {
    content: '';
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    width: 100%;
    background: red;
    transform: scale(0.9);
    -webkit-filter: blur(15px);
    opacity: 0.5;
    z-index: -1;
    transition: all 0.4s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 10vh;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 0 1rem 1rem 1rem;

  > div:first-of-type {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media only screen and (max-width: 425px) {
    grid-template-columns: 1fr;

    .render-second-in-mobile-view {
      grid-row: 2;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80%;
  margin 1rem auto;
  h2 {
    color: #ffffff;
    margin-bottom: 1rem;
    border-bottom: none; 
  }

  p {
    color: #98a4a6;
  }
`;
