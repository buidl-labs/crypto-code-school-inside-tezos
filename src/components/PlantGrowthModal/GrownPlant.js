import React, { useState, useEffect } from 'react';
import {
  Plant,
  Body,
  Eye,
  Hair,
  Head,
  BackLeaves,
  FrontLeaves,
  Pattern,
} from './Plant';

function GrownPlant({ positionTop = '51%', positionLeft = '53%' }) {
  //wait till window object is available
  const [renderPlant, setPlant] = useState(null);
  useEffect(() => {
    const result = typeof window !== 'undefined';
    if (result) {
      setPlant(true);
    }
  }, []);

  return renderPlant ? (
    <Plant style={{ top: positionTop, left: positionLeft }}>
      <Body />
      <Eye />
      <Head />
      <Hair />
      <BackLeaves />
      <FrontLeaves />
      <Pattern />
    </Plant>
  ) : null;
}

export default GrownPlant;
