import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import FirePlant from '../components/Plants/Fire';
import WaterPlant from '../components/Plants/Water';
import ElectricPlant from '../components/Plants/Electric';
import GrassPlant from '../components/Plants/Grass';
import IcePlant from '../components/Plants/Ice';

function Evolution() {
  const [stages, updateStage] = useState([1, 2, 3, 4, 5, 6]);
  const plantsType = {
    fire: IcePlant,
  };

  //   {
  //     body: [Body1, Body2, Body3, Body4],
  //     eyes: [Eye1, Eye2, Eye3, Eye4, Eye5, Eye6, Eye7, Eye8],
  //     fire: [Fire],
  //     hair: [Hair1, Hair2, Hair3, Hair4, Hair5],
  //     head: [Head],
  //     backLeaves: [BackLeaves1, BackLeaves2, BackLeaves3, BackLeaves4],
  //     frontLeaves: [FrontLeaves1, FrontLeaves2, FrontLeaves3, FrontLeaves4],
  //     patterns: [Pattern1, Pattern2, Pattern3, Pattern4],
  //   },

  const Body = styled(plantsType.fire.body[1])`
    position: absolute;
    top: 45%;
    width: 100%;
    height: 35%;
  `;
  const Eye = styled(plantsType.fire.eyes[0])`
    position: absolute;
    height: 50%;
    z-index: 2;
    width: 50%;
    left: 38.5%;
    top: -18%;
  `;
  const Hair = styled(plantsType.fire.hair[0])`
    position: absolute;
    top: -31px;
    height: 40%;
    z-index: -1;
    left: -19%;
    transform: translate(14px, 10px);
  `;
  const HeadSVG = styled(plantsType.fire.head[0])`
    height: 100%;
    position: absolute;
    left: 22.5%;
    top: -27%;
    width: 100%;
  `;
  const BackLeaves = styled(plantsType.fire.backLeaves[0])`
    position: absolute;
    top: 60%;
    width: 100%;
    height: 30%;
  `;
  const FrontLeaves = styled(plantsType.fire.frontLeaves[0])`
    position: absolute;
    top: 70%;
    width: 100%;
    height: 30%;
  `;
  const PatternSVG = styled(plantsType.fire.patterns[0])`
    position: absolute;
    height: 15%;
    z-index: 2;
    width: 40%;
    left: 21.5%;
    top: 14%;
  `;

  const Plant = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 280px;
  `;

  const glowAnimation = keyframes`
    0% {
        transform: translate(-50%, -50%) scale(0.9); }
    50% {
        transform: translate(-50%, -50%) scale(1.1); }
    100% {
        transform: translate(-50%, -50%) scale(0.9); }
  `;
  const Glow = styled.div`
    height: 450px;
    width: 450px;
    position: absolute;
    top: 50%;
    left: 50%;
    animation: ${glowAnimation} 3s infinite;
    background: rgba(217, 194, 74, 0.1);
    border-radius: 100%;
  `;
  return (
    <>
      <Glow />
      <Plant>
        <BackLeaves />
        {/* <FireSVG /> */}
        <Body />
        <HeadSVG />
        <Eye />
        <Hair />
        <FrontLeaves />
        <PatternSVG />
      </Plant>
    </>
  );
}

export default Evolution;

//body-eyes-fire-hair-head-backLeaves-frontLeaves-patterns: plant-type
//[0-3][0-3][1][0-3][0-3][0-3][0-3][1-2][0-3]

// const plantsType = {
//   fire: {
//     body: [1, 2, 3, 4],
//     eyes: [1, 2, 3, 4],
//     fire: [1],
//     hair: [1, 2],
//     head: [1],
//     backLeaves: [1, 2, 3, 4],
//     frontLeaves: [1, 2, 3, 4],
//     patterns: [1, 2, 3, 4],
//   },
// };
