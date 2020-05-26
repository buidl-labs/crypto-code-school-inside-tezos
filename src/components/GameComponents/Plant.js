import React, { useState, useEffect } from 'react';

// Plant parts
import {
  Robot,
  Eye,
  Head,
  RightHand,
  LeftHand,
  Top,
  LowerBottom,
  LowerBody,
  Feet,
  Gem,
  GemHolder,
} from '../PlantGrowthModal/Robot';

// Styles
import styled from '@emotion/styled';

const PlantBox = styled.div`
  width: 16vw;
  height: 25vh;
  max-width: 150px;
  max-height: 210px;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 50vh;
  }
`;

const Plant = () => {
  const [renderPlant, setPlant] = useState(null);

  useEffect(() => {
    const result = typeof window !== 'undefined';
    if (result) {
      setPlant(true);
    }
  }, []);

  return renderPlant ? (
    <PlantBox>
      <div id="plant-top-body">
        <div style={{ height: '100%' }}>
          <RightHand />
        </div>
      </div>
      <GemHolder />
      <Gem />
      <Eye />
      <Head />
      <LeftHand />
      <Top />
      <LowerBottom />
      <LowerBody />
      <Feet />
    </PlantBox>
  ) : null;
};

export default Plant;
