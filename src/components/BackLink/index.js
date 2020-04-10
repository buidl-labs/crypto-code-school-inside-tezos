import React from 'react';
import { BackLink } from './styled';
import { FaChevronLeft } from 'react-icons/fa';
function BackLinkContainer() {
  return (
    <BackLink
      onClick={() => {
        typeof history !== 'undefined' && history.go(-1);
      }}
    >
      <FaChevronLeft />
      <span>Back</span>
    </BackLink>
  );
}

export default BackLinkContainer;
