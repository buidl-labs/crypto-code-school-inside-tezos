import React, { useRef, createContext, useEffect } from 'react';
import { BeaconWallet } from '@taquito/beacon-wallet';

export const BeaconContext = createContext();

export const BeaconProvider = ({ children }) => {
  let beacon = useRef(new BeaconWallet({ name: 'Cryptoverse Wars' }));
  useEffect(() => {
    if (typeof window !== `undefined`)
      beacon.current = new BeaconWallet({ name: 'Cryptoverse Wars' });
  }, []);

  return (
    <BeaconContext.Provider value={beacon.current}>
      {children}
    </BeaconContext.Provider>
  );
};
