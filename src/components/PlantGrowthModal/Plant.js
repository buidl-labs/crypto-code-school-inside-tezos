import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import plantsList from '../Plants/index';
import { useSpring, animated, config } from 'react-spring';

const randomPlant = plantsList[Math.floor(Math.random() * plantsList.length)];

export const Body = styled(randomPlant.body[2])`
  position: absolute;
  top: 45%;
  width: 96%;
  height: 35%;
  left: 0;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Eye = styled(randomPlant.eyes[2])`
  position: absolute;
  height: 50%;
  z-index: 2;
  width: 45%;
  left: 35.5%;
  top: -11%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Hair = styled(randomPlant.hair[0])`
  position: absolute;
  top: -18px;
  height: 45%;
  width: 54%;
  z-index: -1;
  left: -18%;
  transform: translate(14px, 10px);
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const Head = styled(randomPlant.head[0])`
  height: 100%;
  position: absolute;
  left: 24.5%;
  top: -22%;
  width: 80%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const BackLeaves = styled(randomPlant.backLeaves[0])`
  position: absolute;
  top: 60%;
  width: 96%;
  height: 30%;
  z-index: -1;
  left: 1px;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
export const FrontLeaves = styled(randomPlant.frontLeaves[0])`
      position: absolute;
    top: 69%;
    width: 86%;
    height: 30%;
    left: 6px;
    transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
}
`;
export const Pattern = styled(randomPlant.patterns[0])`
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
const Seed = styled(randomPlant.seed[0])`
  width: 100%;
  position: absolute;
  top: 23%;
  left: 10%;
  transform: translate(-25%, -25%) scale(0);
  transition: all 0.5s cubic-bezier(0.43, 0.13, 0.15, 0.99);
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
    delay: 100,
    config: config.wobbly,
  });

  return (
    <>
      <Plant>
        <Light style={props} />
        <Glow />
        {/*TODO: replace with incubated seed */}
        <Seed
          style={{
            seedAnimation,
            transform: `${stage === 0 ? 'scale(1)' : 'scale(0)'}`,
          }}
        />
        <Body
          style={{ transform: `${stage >= 2 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Eye style={{ transform: `${stage >= 4 ? 'scale(1)' : 'scale(0)'}` }} />
        <Head
          style={{ transform: `${stage >= 3 ? 'scale(1)' : 'scale(0)'}` }}
        />
        <Hair
          style={{ transform: `${stage >= 5 ? 'scale(1)' : 'scale(0)'}` }}
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
