import React from 'react';
import zombieAnatomyList from './ZombieParts';

// Styles
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
// import { useSpring, animated, config } from 'react-spring';

// Animations
const rotateFace = keyframes`
    0% { transform: rotate(-5deg); }
    100% { transform: rotate(5deg); }
`;

const backHandMovement = keyframes`
0% { transform: rotate(-5deg); }
100% { transform: rotate(5deg); }
`;

const frontHandMovement = keyframes`
0% { transform: rotate(5deg); }
100% { transform: rotate(-5deg); }
`;

const backLegMovement = keyframes`
0% { transform: rotate(0deg); }
100% { transform: rotate(-5deg); }
`;

const frontLegMovement = keyframes`
0% { transform: rotate(5deg); }
100% { transform: rotate(-5deg); }
`;

const Zombie = styled.div`
  position: absolute;
  bottom: 0;
  right: 10%;
  width: 16vw;
  height: 20vw;
  max-width: 150px;
  max-height: 210px;
  z-index: 6;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 30vw;
  }
`;

const Face = styled(zombieAnatomyList.face)`
  height: 100px;
  position: absolute;
  left: 25%;
  top: -15%;
  width: 100px;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 8;
  animation-name: ${rotateFace};
  animation-duration: 1s;
  animation-direction: alternate;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

const Body = styled(zombieAnatomyList.body)`
  position: absolute;
  top: 22%;
  width: 100px;
  height: 100px;
  left: 28.5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 7;
`;

const BackHand = styled(zombieAnatomyList.backHand)`
  position: absolute;
  top: 40%;
  width: 50px;
  height: 110px;
  left: 60%;
  transform: rotate(25deg);
  transform-origin: top right;
  transition: all 0.5s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  animation: ${backHandMovement} 1s 1s infinite alternate;
`;

const BackLeg = styled(zombieAnatomyList.backLeg)`
  position: absolute;
  top: 62%;
  width: 50px;
  height: 110px;
  transform-origin: top right;
  left: 40%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 4;
  animation: ${backLegMovement} 0.5s 0.5s infinite alternate;
`;

const FrontHand = styled(zombieAnatomyList.frontHand)`
  position: absolute;
  top: 40%;
  width: 50px;
  height: 110px;
  left: 26%;
  transform: rotate(-10deg);
  transform-origin: top right;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 5;
  animation: ${frontHandMovement} 0.5s infinite alternate;
`;

const FrontLeg = styled(zombieAnatomyList.frontLeg)`
  position: absolute;
  top: 64%;
  width: 50px;
  height: 110px;
  transform: rotate(-15deg);
  transform-origin: top left;
  left: 42%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 5;
  animation: ${frontLegMovement} 0.5s infinite alternate;
`;

const ZombieContainer = ({ positionBottom = '0', positionRight = '20%' }) => {
  return (
    <Zombie style={{ bottom: positionBottom, right: positionRight }}>
      <div>
        <div>
          <div>
            <Face />
          </div>
        </div>
      </div>
      <div style={{ height: '100%' }}>
        <BackHand />
        <Body />
        <FrontHand />
        <BackLeg />
        <FrontLeg />
      </div>
    </Zombie>
  );
};

export default ZombieContainer;
