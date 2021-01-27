import React, { useRef, createContext } from 'react';
import { DAppClient } from '@airgap/beacon-sdk';

export const BeaconContext = createContext();

export const BeaconProvider = ({ children }) => {
  const beacon = useRef(new DAppClient({ name: 'Cryptoverse Wars' }));

  return (
    <BeaconContext.Provider value={beacon.current}>
      {children}
    </BeaconContext.Provider>
  );
};
