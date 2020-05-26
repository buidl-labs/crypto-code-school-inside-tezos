import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import robotsList from '../Plants/index';
import { useSpring, animated, config } from 'react-spring';
/*
Check if plant has already been generated
  //if yes --> get the generated plant id from local-storage
  //if not --> generate plant id and store it in local-storage

  Generation of random plant

  //get random plant from list of water, electric, grass, ice, fire
    //get random body, eyes, hair, backLeaves, frontLeaves, patterns part from selected plant type
    store object example:
    {
      type: "",
      robotId: [0-4],
      gemId: [0],
      gemHolderId: [0],
      headId: [0-4],
      eyeId: [0-7],
      leftHand: [0-4],
      rightHand: [0-4],
      top: [0-4],
      lowerBottomId: [],
      lowerBodyId: [],
      feetId: [0-4],
      gemSeed: []
    }

Known peculiar behavior: generates and stores robotIds on first page render in local storage 
*/

export const getRobotId = () => {
  // get the generated plant id from local-storage if available otherwise generate
  const ids =
    typeof localStorage !== 'undefined' && localStorage.getItem('robot');
  console.log(ids);
  if (ids) return JSON.parse(ids);
  const robotId = Math.floor(Math.random() * robotsList.length);
  const randomRobot = robotsList[robotId];
  const gemId = Math.floor(Math.random() * randomRobot.gem.length);
  const gemHolderId = Math.floor(Math.random() * randomRobot.gemHolder.length);
  const eyeId = Math.floor(Math.random() * randomRobot.eye.length);
  const headId = Math.floor(Math.random() * randomRobot.head.length);
  const leftHandId = Math.floor(Math.random() * randomRobot.leftHand.length);
  const rightHandId = Math.floor(Math.random() * randomRobot.rightHand.length);
  const topId = Math.floor(Math.random() * randomRobot.top.length);
  const lowerBottomId = Math.floor(
    Math.random() * randomRobot.lowerBottom.length,
  );
  const lowerBodyId = Math.floor(Math.random() * randomRobot.lowerBody.length);
  const feetId = Math.floor(Math.random() * randomRobot.feet.length);
  const gemSeedId = Math.floor(Math.random() * randomRobot.gemSeed.length);

  const robotObj = {
    type: randomRobot.type,
    robotId,
    gemId,
    gemHolderId,
    eyeId,
    headId,
    leftHandId,
    rightHandId,
    topId,
    lowerBottomId,
    lowerBodyId,
    feetId,
    gemSeedId,
  };

  //storage generated plant id for future reference
  typeof localStorage != 'undefined' &&
    localStorage.setItem('robot', JSON.stringify(robotObj));
  return robotObj;
};

const generatedPlantId = getRobotId();

const randomRobot = robotsList[generatedPlantId.robotId];
// randomRobot.body[generatedPlantId.bodyId]

export const Eye = styled(randomRobot.eye[generatedPlantId.eyeId])`
  position: absolute;
  height: 35%;
  z-index: 2;
  width: 35%;
  left: 17%;
  top: 8%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 14;
`;
export const RightHand = styled(
  randomRobot.rightHand[generatedPlantId.rightHandId],
)`
  z-index: 10;
  position: absolute;
  height: 50%;
  width: 50%;
  left: 47%;
  top: 20%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Head = styled(randomRobot.head[generatedPlantId.headId])`
  height: 100%;
  position: absolute;
  left: 0%;
  top: -27%;
  width: 60%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 13;
`;
export const LeftHand = styled(
  randomRobot.leftHand[generatedPlantId.leftHandId],
)`
  z-index: 13;
  position: absolute;
  height: 35%;
  width: 21%;
  left: -8%;
  top: 35%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Top = styled(randomRobot.top[generatedPlantId.topId])`
  z-index: 12;
  position: absolute;
  top: 19%;
  width: 70%;
  height: 50%;
  left: -5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const LowerBottom = styled(
  randomRobot.lowerBottom[generatedPlantId.lowerBottomId],
)`
  position: absolute;
  top: 42%;
  width: 50%;
  height: 50%;
  z-index: 10;
  left: 5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const LowerBody = styled(
  randomRobot.lowerBody[generatedPlantId.lowerBodyId],
)`
  position: absolute;
  z-index: 10;
  top: 31%;
  width: 40%;
  height: 50%;
  left: 10%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Feet = styled(randomRobot.feet[generatedPlantId.feetId])`
  position: absolute;
  top: 69%;
  width: 50%;
  height: 50%;
  left: 5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

export const Robot = styled.div`
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-40%, -85%);
  ${'' /* width: 150px; */}
  ${'' /* height: 210px; */}
  width: 16vw;
  height: 20vw;
  max-width: 150px;
  max-height: 210px;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 30vw;
  }

  @media only screen and (max-height: 700px) {
    width: 10vw;
    height: 15vw;
  }
`;
const glowAnimation = keyframes`
0% {
    transform: translate(-50%, -50%) scale(0.9); }
50% {
    transform: translate(-50%, -50%) scale(1); }
100% {
    transform: translate(-50%, -50%) scale(0.9); }
`;
const Glow = styled.div`
  height: 300px;
  width: 300px;
  position: relative;
  top: 54%;
  left: 33%;
  animation: ${glowAnimation} 3s infinite;
  background: rgba(208, 252, 255, 0.15);
  border-radius: 100%;
  z-index: -2;
  transition: all 0.2s cubic-bezier(0.43, 0.13, 0.15, 0.99);

  @media only screen and (max-width: 425px) {
    height: 250px;
    width: 250px;
  }

  @media only screen and (max-height: 700px) {
    height: 200px;
    width: 200px;
  }
`;
export const Gem = styled(randomRobot.gem[generatedPlantId.gemId])`
  width: 15%;
  height: 15%;
  position: absolute;
  top: 14%;
  left: 2.5%;
  z-index: 20;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

export const GemHolder = styled(
  randomRobot.gemHolder[generatedPlantId.gemHolderId],
)`
  width: 15%;
  height: 15%;
  position: absolute;
  top: 42%;
  left: 30%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 20;
`;

const GemSeed = styled(randomRobot.gemSeed[generatedPlantId.gemSeedId])`
  height: 100%;
  position: absolute;
  left: -10%;
  top: 0;
  width: 90%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

const IncubatorContainer = styled.div`
  position: absolute;
  top: 70%;
  left: 56%;
  transform: translate(-55%, -70%);
  width: 16vw;
  height: 20vw;
  max-width: 150px;
  max-height: 210px;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 30vw;
  }

  @media only screen and (max-height: 700px) {
    width: 10vw;
  }
`;
/*
Glow colors
ice: light: rgba(208, 252, 255, 0.25), dark: rgba(208, 252, 255, 0.8);
electric: light: rgba(217, 194, 74, 0.25), dark: rgba(217, 194, 74, 0.8);
grass: light:  rgba(102, 204, 0, 0.2);, dark:  rgba(102, 204, 0, 0.8);
fire: light:  rgba(203, 80, 41, 0.3);, dark:  rgba(203, 80, 41, 0.8);
water: light:  rgba(41, 125, 203, 0.25);, dark:  rgba(41, 125, 203, 0.8);;
*/

const getPlantTypeGlowLight = randomRobot => {
  let color = {
    light: 'rgba(208, 252, 255, 0.25)',
    dark: 'rgba(208, 252, 255, 0.8)',
  };
  switch (randomRobot.type) {
    case 'ice':
      color = {
        light: 'rgba(208, 252, 255, 0.25)',
        dark: 'rgba(208, 252, 255, 0.8)',
      };
      break;
    case 'electric':
      color = {
        light: 'rgba(217, 194, 74, 0.25)',
        dark: 'rgba(217, 194, 74, 0.8)',
      };
      break;
    case 'grass':
      color = {
        light: 'rgba(102, 204, 0, 0.2)',
        dark: 'rgba(102, 204, 0, 0.8)',
      };
      break;
    case 'fire':
      color = {
        light: 'rgba(203, 80, 41, 0.3)',
        dark: 'rgba(203, 80, 41, 0.8)',
      };
      break;
    case 'water':
      color = {
        light: 'rgba(41, 125, 203, 0.25)',
        dark: 'rgba(41, 125, 203, 0.8)',
      };
      break;
  }

  return color;
};

const Light = styled.div`
  background: ${getPlantTypeGlowLight(randomRobot).light};
  position: absolute;
  top: 35%;
  left: 49%;
  filter: blur(100px);
  border-radius: 100%;
  top: 45%;
  left: 48%;
  z-index: -1;
  transform: translate(-50%, -50%);
  height: 50px;
  width: 50px;
  transition: all 2s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

// chapter 1 --> `*(Animation of seed being set in an incubator)*`(optional)
//chapter 1 `*(Animation of seed growing into leaves)*`
//chapter 3 `*(Animation of body growing)*`
//chapter 6 `*(Animation of head growing)*`
//chapter 11 `*(Animation of  growing)*`
//chapter 14 `*(Animation of hair growing)*` --> plant has fully grown --> to battle zombie apocalypse

const RobotContainer = ({ stage, isEvolved }) => {
  const [evolved, setEvolved] = useState(false);
  const props = useSpring({
    opacity: 0,
    width: 300,
    height: 300,
    background: `${getPlantTypeGlowLight(randomRobot).light}`,
    from: {
      opacity: 100,
      width: 200,
      height: 200,
    },
    config: config.molasses,
    delay: 100,
  });

  const seedAnimation = useSpring({
    config: config.stiff,
  });

  useEffect(() => {
    setEvolved(true);
    setTimeout(() => {
      setEvolved(false);
    }, 5000);
  }, [isEvolved]);

  return (
    <>
      <Robot>
        <Light
          style={{
            background:
              evolved && isEvolved
                ? `${getPlantTypeGlowLight(randomRobot).dark}`
                : `${getPlantTypeGlowLight(randomRobot).light}`,
            height: evolved && isEvolved ? 200 : 50,
            width: evolved && isEvolved ? 200 : 50,
          }}
        />
        <Glow />
        {/*Gem Holder + Gem*/}
        <GemHolder
          style={{ transform: `${stage >= 5 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Gem style={{ transform: `${stage >= 5 ? 'scale(1)' : 'scale(0)'}` }} />
        {/* Eye */}
        <Eye style={{ transform: `${stage >= 4 ? 'scale(1)' : 'scale(0)'}` }} />
        {/* Head */}
        <Head
          style={{ transform: `${stage >= 4 ? 'scale(1)' : 'scale(0)'}` }}
        />
        {/* Left hand */}
        <LeftHand
          style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }}
        />
        {/* Right hand */}
        <RightHand
          style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }}
        />
        {/* Top */}
        <Top style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }} />
        {/*bottom + lower_body */}
        <LowerBottom
          style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <LowerBody
          style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
        />
        {/* Feet */}
        <Feet
          style={{ transform: `${stage >= 1 ? 'scale(1)' : 'scale(0)'}` }}
        />
        {/* Gem seed */}
        <GemSeed
          style={{
            opacity: `${stage <= 0 ? '1' : '0'}`,
          }}
        />
      </Robot>
    </>
  );
};

export default RobotContainer;
