import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import plantsList from '../Plants/index';
import { useSpring, animated, config } from 'react-spring';
import IncubatorSVG from '../../assets/incubator.svg';
import GrassRobot from '../Plants/Grass';
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
      plantId: [0-4],
      bodyId: [0-4],
      eyesId: [0-7],
      hair: [0-4],
      backLeaves: [0-3],
      frontLeaves: [],
      patterns: [],
      seed: []
    }

Known peculiar behavior: generates and stores plantIds on first page render in local storage 
*/

export const getPlantId = () => {
  // get the generated plant id from local-storage if available otherwise generate
  const ids =
    typeof localStorage !== 'undefined' && localStorage.getItem('plant');
  console.log(ids);
  if (ids) return JSON.parse(ids);

  const plantId = Math.floor(Math.random() * plantsList.length);
  const randomPlant = plantsList[plantId];
  const bodyId = Math.floor(Math.random() * randomPlant.body.length);
  const eyesId = Math.floor(Math.random() * randomPlant.eyes.length);
  const hairId = Math.floor(Math.random() * randomPlant.hair.length);
  const headId = Math.floor(Math.random() * randomPlant.head.length);
  const leavesId = Math.floor(Math.random() * randomPlant.backLeaves.length);
  const backLeavesId = leavesId;
  const frontLeavesId = leavesId;
  const patternsId = Math.floor(Math.random() * randomPlant.patterns.length);
  const seedId = Math.floor(Math.random() * randomPlant.seed.length);

  const plantObj = {
    type: randomPlant.type,
    plantId,
    bodyId,
    eyesId,
    hairId,
    headId,
    backLeavesId,
    frontLeavesId,
    patternsId,
    seedId,
  };

  //storage generated plant id for future reference
  typeof localStorage != 'undefined' &&
    localStorage.setItem('plant', JSON.stringify(plantObj));
  return plantObj;
};

const generatedPlantId = getPlantId();

const randomPlant = plantsList[generatedPlantId.plantId];
// randomPlant.body[generatedPlantId.bodyId]

export const Eye = styled(GrassRobot.eye[0])`
  position: absolute;
  height: 35%;
  z-index: 2;
  width: 35%;
  left: 17%;
  top: 8%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 14;
`;
export const RightHand = styled(GrassRobot.rightHand[0])`
  z-index: 10;
  position: absolute;
  height: 50%;
  width: 50%;
  left: 47%;
  top: 20%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Head = styled(GrassRobot.head[0])`
  height: 100%;
  position: absolute;
  left: 0%;
  top: -27%;
  width: 60%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 13;
`;
export const LeftHand = styled(GrassRobot.leftHand[0])`
  z-index: 13;
  position: absolute;
  height: 35%;
  width: 21%;
  left: -13%;
  top: 38%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Top = styled(GrassRobot.top[0])`
  z-index: 12;
  position: absolute;
  top: 19%;
  width: 70%;
  height: 50%;
  left: -5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const LowerBottom = styled(GrassRobot.lowerBottom[0])`
  position: absolute;
  top: 42%;
  width: 50%;
  height: 50%;
  z-index: 10;
  left: 5%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const LowerBody = styled(GrassRobot.lowerBody[0])`
  position: absolute;
  z-index: 10;
  top: 31%;
  width: 40%;
  height: 50%;
  left: 10%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Feet = styled(GrassRobot.feet[0])`
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
const Gem = styled(GrassRobot.gem[0])`
  width: 12%;
  height: 12%;
  position: absolute;
  top: 43%;
  left: 31.5%;
  z-index: 20;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

const GemHolder = styled(GrassRobot.gemHolder[0])`
  width: 15%;
  height: 15%;
  position: absolute;
  top: 42%;
  left: 30%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: 20;
`;

const Incubator = styled(IncubatorSVG)`
  height: 100%;
  position: absolute;
  left: 3.5%;
  top: -13%;
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

const getPlantTypeGlowLight = randomPlant => {
  let color = {
    light: 'rgba(208, 252, 255, 0.25)',
    dark: 'rgba(208, 252, 255, 0.8)',
  };
  switch (randomPlant.type) {
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
  background: ${getPlantTypeGlowLight(randomPlant).light};
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

const PlantContainer = ({ stage, isEvolved }) => {
  const [evolved, setEvolved] = useState(false);
  const props = useSpring({
    opacity: 0,
    width: 300,
    height: 300,
    background: `${getPlantTypeGlowLight(randomPlant).light}`,
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
                ? `${getPlantTypeGlowLight(randomPlant).dark}`
                : `${getPlantTypeGlowLight(randomPlant).light}`,
            height: evolved && isEvolved ? 200 : 50,
            width: evolved && isEvolved ? 200 : 50,
          }}
        />
        <Glow />
        {/*TODO: replace with incubated seed */}
        {/* <IncubatorContainer
          style={{
            seedAnimation,
          }}
        >
          <Incubator
            style={{
              opacity: `${stage <= 0 ? '1' : '0'}`,
            }}
          />
          <Seed
            style={{
              opacity: `${stage <= 0 ? '1' : '0'}`,
            }}
          />
        </IncubatorContainer> */}
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
        {/* <Body
          style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Eye style={{ transform: `${stage >= 4 ? 'scale(1)' : 'scale(0)'}` }} />
        <Head
          style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Hair
          style={{
            transform: `${
              stage >= 5 ? 'scale(1) translate(14px, 10px)' : 'scale(0)'
            }`,
          }}
        />
        <BackLeaves
          style={{ transform: `${stage >= 1 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <FrontLeaves
          style={{ transform: `${stage >= 1 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Pattern
          style={{ transform: `${stage >= 5 ? 'scale(1)' : 'scale(0)'}` }}
        /> */}
      </Robot>
    </>
  );
};

export default PlantContainer;
