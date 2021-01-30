import React from 'react';
import Theme from 'src/assets/theme.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const NavBar = ({ chapter }) => {
  return (
    <nav
      className={`flex justify-between items-center px-9 h-20 bg-base-900 text-white`}
    >
      <div className={`flex items-center`}>
        <ChevronLeftIcon />
        <Theme className={`h-18 w-auto ml-4`} />
      </div>
      <div className={`text-lg font-bold`}>{chapter}</div>
      <div>
        <HelpOutlineIcon />
        <button
          className={`bg-primary-600 px-6 py-2 rounded text-lg font-bold ml-12`}
        >
          Sign in
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
