import React from 'react';
import { BackLink, LeftArrow } from './styled';
import { navigate } from 'gatsby';

function BackLinkContainer({ to = null }) {
  return (
    <BackLink
      onClick={() => {
        console.log('to', to);
        to ? navigate(to) : typeof history !== 'undefined' && history.go(-1);
      }}
    >
      <LeftArrow />
      <span>Back</span>
    </BackLink>
  );
}

export default BackLinkContainer;
