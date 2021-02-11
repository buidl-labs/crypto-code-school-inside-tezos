/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import './src/styles/global.css';
import 'prismjs/themes/prism.css';
export const onClientEntry = () => {
  window.onload = () => {
    brython({ debug: 1, indexedDB: false, pythonpath: '/' });
  };
};

import React from 'react';
import { Provider } from 'jotai';
import { BeaconProvider } from './src/context/beacon-context';

export const wrapRootElement = ({ element }) => {
  return (
    <BeaconProvider>
      <Provider>{element}</Provider>
    </BeaconProvider>
  );
};
