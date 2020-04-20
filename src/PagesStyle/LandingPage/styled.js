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
  0% { transform: translateX(-20%); opacity: 0.9; }
  100% { transform: translateX(-100vw); opacity: 0.9; }
`;
const moveRight = keyframes`
  0% { transform: translateX(10%); opacity: 0.9; }
  100% { transform: translateX(100vw); opacity: 0.9; }
`;

export const LeftCloud = styled(LeftCloudSvg)`
  animation-name: ${moveRight};
  animation-duration: 150s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  left: 10px;
  right: 10px;
  top: 5rem;

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const RightCloud = styled(RightCloudSvg)`
  animation-name: ${moveLeft};
  animation-duration: 100s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  position: absolute;
  z-index: -1;
  right: 10px;
  right: 10px;
  top: 14rem;

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const Zombie = styled(ZombieSVG)`
  width: 75%;
  max-width: 193px;
  height: auto;
`;

export const StartLearning = styled(StartLearningSVG)`
  width: 75%;
  height: auto;
  max-width: 278px;

  :hover {
    cursor: pointer;
    transform: scale(1.1) rotate(-5deg);
  }
`;

export const Plant = styled(PlantSVG)`
  width: 75%;
  height: auto;
  max-width: 202px;
`;

export const Logo = styled(LogoSVG)`
  max-width: 100%;
  width: 400px;
  height: auto;
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

    h1 {
      font-size: 27px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const HeroTitle = styled.h1`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 95.69%;
  text-align: center;
  color: #ffffff;
  max-width: 800px;
`;

export const HeroSubheading = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 162.69%;
  /* or 31px */
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
    margin-left: 4%;
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
  width: 187px;
  height: 74px;

  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  line-height: 97.69%;
  /* identical to box height, or 20px */
  color: #ffffff;
  transition: 0.3s;
  cursor: pointer;

  > svg {
    display: inline-block;
    vertical-align: middle;
    margin-top: 1px;
  }

  :hover {
    box-shadow: 0 0 0 0.25rem rgba(41, 203, 106, 0.2);
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  margin: 0 1rem 1rem 1rem;

  @media only screen and (max-width: 425px) {
    grid-template-columns: 1fr;

    >div: first-of-type {
      grid-row: 2;
    }

    h2 {
      font-size: 33px;
    }

    p {
      font-size: 14px;
    }
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem;

  h2 {
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 95.69%;
    /* or 43px */
    color: #ffffff;
    margin-bottom: 1rem;
  }

  p {
    font-family: Roboto;
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 162.69%;
    /* or 31px */
    color: #98a4a6;
  }
`;
