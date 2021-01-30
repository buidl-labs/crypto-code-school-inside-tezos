import React from 'react';
import RefreshIcon from '@material-ui/icons/Refresh';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const CodingInterface = () => {
  return (
    <main>
      <header
        className={`flex justify-between items-center text-white space-x-6 h-12 bg-base-800 flex-shrink-0`}
      >
        <div
          className={`bg-console p-4 flex items-center justify-center h-full font-mono text-lg font-bold`}
        >
          filename.py
        </div>
        <div className={`mr-12`}>
          <button className={`mr-6`}>
            <RefreshIcon />
          </button>
          <button>
            <HelpOutlineIcon />
          </button>
        </div>
      </header>
    </main>
  );
};

export default CodingInterface;
