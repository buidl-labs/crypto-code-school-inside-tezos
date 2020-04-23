import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import plantsList from '../Plants/index';
import { useSpring, animated, config } from 'react-spring';
import IncubatorSVG from '../../assets/incubator.svg';
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

const getPlantId = () => {
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

export const Body = styled(randomPlant.body[generatedPlantId.bodyId])`
  position: absolute;
  top: 45%;
  width: 96%;
  height: 35%;
  left: 0;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Eye = styled(randomPlant.eyes[generatedPlantId.eyesId])`
  position: absolute;
  height: 50%;
  z-index: 2;
  width: 45%;
  left: 35.5%;
  top: -15%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Hair = styled(randomPlant.hair[generatedPlantId.hairId])`
  position: absolute;
  top: -18px;
  height: 45%;
  width: 54%;
  z-index: -1;
  left: -18%;
  transform: translate(14px, 10px);
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Head = styled(randomPlant.head[generatedPlantId.headId])`
  height: 100%;
  position: absolute;
  left: 22.5%;
  top: -25%;
  width: 90%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const BackLeaves = styled(
  randomPlant.backLeaves[generatedPlantId.backLeavesId],
)`
  position: absolute;
  top: 60%;
  width: 96%;
  height: 30%;
  z-index: -1;
  left: 1px;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const FrontLeaves = styled(
  randomPlant.frontLeaves[generatedPlantId.frontLeavesId],
)`
      position: absolute;
    top: 69%;
    width: 86%;
    height: 30%;
    left: 6px;
    transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
}
`;
export const Pattern = styled(
  randomPlant.patterns[generatedPlantId.patternsId],
)`
  position: absolute;
  height: 15%;
  z-index: 2;
  width: 40%;
  left: 20.5%;
  top: 20%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

export const Plant = styled.div`
  position: absolute;
  top: 41%;
  left: 50%;
  transform: translate(-55%, -70%);
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
  top: 35%;
  left: 49%;
  animation: ${glowAnimation} 3s infinite;
  background: rgba(208, 252, 255, 0.15);
  border-radius: 100%;
  top: 45%;
  left: 48%;
  z-index: -2;
  transition: all 0.2s cubic-bezier(0.43, 0.13, 0.15, 0.99);

  @media only screen and (max-width: 425px) {
    height: 250px;
    width: 250px;
  }
`;
const Seed = styled(randomPlant.seed[generatedPlantId.seedId])`
  width: 50%;
  height: 50%;
  position: absolute;
  top: 23%;
  left: 23%;
  transform: translate(-25%, -25%) scale(0);
  transition: all 0.5s cubic-bezier(0.43, 0.13, 0.15, 0.99);
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

const Light = styled(animated.div)`
  background: ${getPlantTypeGlowLight(randomPlant).light};
  height: 300px;
  width: 300px;
  position: absolute;
  top: 35%;
  left: 49%;
  filter: blur(50px);
  animation: ${glowAnimation} 3s infinite;
  border-radius: 100%;
  top: 45%;
  left: 48%;
  transition: all 0.2s cubic-bezier(0.43, 0.13, 0.15, 0.99);
  z-index: -1;
`;

// chapter 1 --> `*(Animation of seed being set in an incubator)*`(optional)
//chapter 1 `*(Animation of seed growing into leaves)*`
//chapter 3 `*(Animation of body growing)*`
//chapter 6 `*(Animation of head growing)*`
//chapter 11 `*(Animation of  growing)*`
//chapter 14 `*(Animation of hair growing)*` --> plant has fully grown --> to battle zombie apocalypse

const PlantContainer = ({ stage }) => {
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
    config: config.slow,
  });

  return (
    <>
      <Plant>
        <Light style={props} />
        <Glow />
        {/*TODO: replace with incubated seed */}
        <IncubatorContainer
          style={{
            seedAnimation,
          }}
        >
          <Incubator
            style={{
              transform: `${stage <= 0 ? 'scale(1)' : 'scale(0)'}`,
            }}
          />
          <Seed
            style={{
              transform: `${stage <= 0 ? 'scale(1)' : 'scale(0)'}`,
            }}
          />
        </IncubatorContainer>
        <Body
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
        />
      </Plant>
    </>
  );
};

export default PlantContainer;
