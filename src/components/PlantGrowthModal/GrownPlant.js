import React from 'react';
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
  return (
    <Plant style={{ top: ' 51%', left: '53%' }}>
      <Body />
      <Eye />
      <Head />
      <Hair />
      <BackLeaves />
      <FrontLeaves />
      <Pattern />
    </Plant>
  );
}

export default GrownPlant;
