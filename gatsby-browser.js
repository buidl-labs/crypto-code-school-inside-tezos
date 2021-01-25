/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import 'prismjs/themes/prism.css';
export const onClientEntry = () => {
  window.onload = () => {
    brython({ debug: 1, indexedDB: false, pythonpath: '/' });
  };
};

import React from 'react';
import { Provider } from 'jotai';

export const wrapRootElement = ({ element }) => {
  return <Provider>{element}</Provider>;
};
