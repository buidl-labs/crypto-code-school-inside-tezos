import React, { useState, useEffect } from 'react';
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
} from './Plant';

function GrownRobot({ positionTop = '51%', positionLeft = '53%' }) {
  //wait till window object is available
  const [renderPlant, setPlant] = useState(null);
  useEffect(() => {
    const result = typeof window !== 'undefined';
    if (result) {
      setPlant(true);
    }
  }, []);

  return renderPlant ? (
    <Robot style={{ top: positionTop, left: positionLeft }}>
      <GemHolder />
      <Gem />
      <Eye />
      <Head />
      <LeftHand />
      <RightHand />
      <Top />
      <LowerBottom />
      <LowerBody />
      <Feet />
    </Robot>
  ) : null;
}

export default GrownRobot;
