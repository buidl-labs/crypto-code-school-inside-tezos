import React, { useState, useEffect } from 'react';

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

const PlantBox = styled.div`
  width: 16vw;
  height: 20vw;
  max-width: 150px;
  max-height: 210px;

  @media only screen and (max-width: 425px) {
    width: 25vw;
    height: 30vw;
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
          <Body />
          <Eye />
          <Head />
          <Hair />
          <Pattern />
        </div>
      </div>
      <BackLeaves />
      <FrontLeaves />
    </PlantBox>
  ) : null;
};

export default Plant;
