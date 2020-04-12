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

function GrownPlant() {
  //wait till window object is available
  const [renderPlant, setPlant] = useState(null);
  useEffect(() => {
    const result = typeof window !== 'undefined';
    if (result) {
      setPlant(true);
    }
  }, []);

  return renderPlant ? (
    <Plant style={{ top: ' 51%', left: '53%' }}>
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
