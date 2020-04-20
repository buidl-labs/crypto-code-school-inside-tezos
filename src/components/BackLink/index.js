import React from 'react';
import { BackLink } from './styled';
import { FaChevronLeft } from 'react-icons/fa';
import { navigate } from 'gatsby';

function BackLinkContainer({ to = null }) {
  return (
    <BackLink
      onClick={() => {
        console.log('to', to);
        to ? navigate(to) : typeof history !== 'undefined' && history.go(-1);
      }}
    >
      <FaChevronLeft />
      <span>Back</span>
    </BackLink>
  );
}

export default BackLinkContainer;
