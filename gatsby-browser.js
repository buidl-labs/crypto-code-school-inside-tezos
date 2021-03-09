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

const addScript = url => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.type = 'text/javascript';
  script.charSet = 'utf-8';
  script.onload = () => console.log('loaded: %s', url);
  document.body.appendChild(script);
};

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (
    location.pathname.indexOf('module-02') != -1 ||
    location.pathname.indexOf('module-03') != -1
  ) {
    debugger;
    const scripts = Array.from(document.querySelectorAll('script'));
    const srcVals = scripts
      .filter(sc => typeof sc.attributes.src != 'undefined')
      .map(sc => sc.attributes.src.value);
    const hasSmartpy = srcVals.indexOf('/smartpyio.py');
    console.log('hasSmartpy', hasSmartpy);

    if (hasSmartpy == -1) {
      addScript('/execute.js');
      addScript('/smartjs/smart.js');
      addScript('/smartjs/smartmljs.bc.js');

      const script = document.createElement('script');
      script.src = '/smartpyio.py';
      script.type = 'text/python';
      script.onload = () => console.log('smartpy loaded');
      document.body.appendChild(script);
      if (typeof window.brython != 'undefined') {
        brython({ debug: 1, indexedDB: false, pythonpath: '/' });
      }
      console.log('Added scripts');
    } else {
      console.log('smartpy already added');
    }
  } else {
    console.log("Don't add script");
  }
};
