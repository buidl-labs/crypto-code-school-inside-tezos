import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import plantsList from '../Plants/index';
import { useSpring, animated, config } from 'react-spring';

const randomPlant = plantsList[Math.floor(Math.random() * plantsList.length)];

const Body = styled(randomPlant.body[2])`
  position: absolute;
  top: 45%;
  width: 96%;
  height: 35%;
  left: 0;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
const Eye = styled(randomPlant.eyes[2])`
  position: absolute;
  height: 50%;
  z-index: 2;
  width: 45%;
  left: 35.5%;
  top: -11%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
const Hair = styled(randomPlant.hair[0])`
  position: absolute;
  top: -18px;
  height: 45%;
  width: 54%;
  z-index: -1;
  left: -18%;
  transform: translate(14px, 10px);
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
const Head = styled(randomPlant.head[0])`
  height: 100%;
  position: absolute;
  left: 24.5%;
  top: -22%;
  width: 80%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
const BackLeaves = styled(randomPlant.backLeaves[0])`
  position: absolute;
  top: 60%;
  width: 96%;
  height: 30%;
  z-index: -1;
  left: 1px;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;
const FrontLeaves = styled(randomPlant.frontLeaves[0])`
      position: absolute;
    top: 69%;
    width: 86%;
    height: 30%;
    left: 6px;
    transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
}
`;
const Pattern = styled(randomPlant.patterns[0])`
  position: absolute;
  height: 15%;
  z-index: 2;
  width: 40%;
  left: 20.5%;
  top: 20%;
  transition: all 1s cubic-bezier(0.43, 0.13, 0.15, 0.99);
`;

const Plant = styled.div`
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

const Light = styled(animated.div)`
  background: rgba(217, 194, 74, 0.25);
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
    background: 'rgba(217, 194, 74, 0.8)',
    from: {
      opacity: 100,
      width: 200,
      height: 200,
    },
    config: config.molasses,
    delay: 100,
  });

  return (
    <>
      <Plant>
        <Light style={props} />
        <Glow />
        {/*TODO: replace with incubated seed */}
        <Seed
          style={{
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
