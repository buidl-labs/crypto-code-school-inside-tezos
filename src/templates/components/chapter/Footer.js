import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
const Footer = () => {
  return (
    <footer
      className={`bg-base-800 text-white flex justify-end text-lg px-12 h-14`}
    >
      <div className={`flex items-center space-x-10`}>
        <button className={`flex items-center`}>
          <ChevronLeftIcon />
          <span>Prev</span>
        </button>
        <p className={`text-base-50`}>4/10</p>
        <button className={`flex items-center`}>
          <span>Next</span>
          <ChevronRightIcon />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
