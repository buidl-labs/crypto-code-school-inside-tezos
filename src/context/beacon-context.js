import React, { useRef, createContext, useEffect } from 'react';
import { DAppClient } from '@airgap/beacon-sdk';

export const BeaconContext = createContext();

export const BeaconProvider = ({ children }) => {
  let beacon = useRef(new DAppClient({ name: 'Cryptoverse Wars' }));
  useEffect(() => {
    if (typeof window !== undefined)
      beacon.current = new DAppClient({ name: 'Cryptoverse Wars' });
  }, [window]);

  return (
    <BeaconContext.Provider value={beacon.current}>
      {children}
    </BeaconContext.Provider>
  );
};
