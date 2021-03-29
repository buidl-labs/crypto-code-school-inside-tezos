import { TezosToolkit } from '@taquito/taquito';
import { NETWORK } from 'src/defaults';

let TezosObj = new TezosToolkit(`https://api.tez.ie/rpc/${NETWORK}`);

export const connectToBeacon = async walletContext => {
  let globalWallet;

  if (!globalWallet) {
    // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
    // const wallet = new BeaconWallet({ name: 'Cryptoverse Wars' });

    // Setting the wallet as the wallet provider for Taquito.
    TezosObj.setWalletProvider(walletContext);
    globalWallet = walletContext;
  }

  const account = await globalWallet.client.getActiveAccount({
    network: {
      type: NETWORK,
    },
  });

  if (account) {
    // Check if we already have an account connected, so we can skip requestPermissions.
    return globalWallet;
  }

  // Send permission request to the connected wallet. This will either be the browser extension, or a wallet over the P2P network.
  await globalWallet.requestPermissions({
    network: {
      type: NETWORK,
    },
  });

  return globalWallet;
};

export const Tezos = TezosObj;
