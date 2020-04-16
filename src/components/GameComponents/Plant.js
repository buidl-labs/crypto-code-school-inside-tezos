import React from 'react';

// Plant parts
import {
  Body,
  Eye,
  Hair,
  Head,
  BackLeaves,
  FrontLeaves,
  Pattern,
} from '../PlantGrowthModal/Plant';

// Styles
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';

// Animations
const rotateFace = keyframes`
    0% { transform: rotate(-5deg); }
    100% { transform: rotate(5deg); }
`;

const PlantContainer = styled.div`
  width: 16vw;
  height: 20vw;
  max-width: 150px;
  max-height: 210px;
  z-index: 7;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 30vw;
  }
`;

const Plant = () => {
  return (
    <PlantContainer>
      <div id="plant-top-body">
        <Body />
        <Eye />
        <Head />
        <Hair />
        <Pattern />
      </div>
      <BackLeaves />
      <FrontLeaves />
    </PlantContainer>
  );
};

export default Plant;
