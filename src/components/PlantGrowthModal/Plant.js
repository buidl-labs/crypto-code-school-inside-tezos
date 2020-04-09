import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import plantsList from '../Plants/index';
const randomPlant = plantsList[Math.floor(Math.random() * plantsList.length)];

const Body = styled(randomPlant.body[2])`
  position: absolute;
  top: 45%;
  width: 96%;
  height: 35%;
  left: 0;
`;
const Eye = styled(randomPlant.eyes[2])`
  position: absolute;
  height: 50%;
  z-index: 2;
  width: 45%;
  left: 35.5%;
  top: -11%;
`;
const Hair = styled(randomPlant.hair[0])`
  position: absolute;
  top: -18px;
  height: 45%;
  width: 54%;
  z-index: -1;
  left: -22%;
  transform: translate(14px, 10px);
`;
const Head = styled(randomPlant.head[0])`
  height: 100%;
  position: absolute;
  left: 24.5%;
  top: -22%;
  width: 80%;
`;
const BackLeaves = styled(randomPlant.backLeaves[0])`
  position: absolute;
  top: 60%;
  width: 96%;
  height: 30%;
  z-index: -1;
  left: 1px;
`;
const FrontLeaves = styled(randomPlant.frontLeaves[0])`
      position: absolute;
    top: 69%;
    width: 86%;
    height: 30%;
    left: 6px;
}
`;
const Pattern = styled(randomPlant.patterns[0])`
  position: absolute;
  height: 15%;
  z-index: 2;
  width: 40%;
  left: 20.5%;
  top: 20%;
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

  @media only screen and (max-width: 425px) {
    height: 250px;
    width: 250px;
  }
`;
const Seed = styled(randomPlant.seed[0])`
  position: absolute;
  top: 26%;
  left: 25%;
  transform: translate(-55%, -70%);
`;

const PlantContainer = () => {
  return (
    <>
      <Plant>
        <Glow />
        {/* <Seed /> */}
        <Body />
        <Eye />
        <Head />
        <Hair />
        <BackLeaves />
        <FrontLeaves />
        <Pattern />
      </Plant>
    </>
  );
};

export default PlantContainer;
