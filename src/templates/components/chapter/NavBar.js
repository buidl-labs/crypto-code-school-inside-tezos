import React from 'react';
import { Link } from 'gatsby';
import Theme from 'src/assets/theme.svg';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const NavBar = ({ chapter, module }) => {
  return (
    <nav
      className={`flex justify-between items-center px-9 h-20 bg-base-900 text-white`}
    >
      <Link className={`flex items-center`} to={`/tezos/academy/${module}`}>
        <ChevronLeftIcon />
        <Theme className={`h-18 w-auto ml-4`} />
      </Link>
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
