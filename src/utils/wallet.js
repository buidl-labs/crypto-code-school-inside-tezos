import { TezosToolkit } from '@taquito/taquito';
import { NETWORK } from 'src/defaults';

let TezosObj;

if (NETWORK === 'delphinet') {
  TezosObj = new TezosToolkit('https://api.tez.ie/rpc/delphinet');
} else {
  TezosObj = new TezosToolkit(' https://api.tez.ie/rpc/mainnet');
}

export const connectToBeacon = async walletContext => {
  let globalWallet;

  if (!globalWallet) {
    // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
    // const wallet = new BeaconWallet({ name: 'TzButton' })

    // Setting the wallet as the wallet provider for Taquito.
    TezosObj.setWalletProvider(walletContext);
    globalWallet = walletContext;
  }

  if (await globalWallet.client.getActiveAccount()) {
    // Check if we already have an account connected, so we can skip requestPermissions.
    return globalWallet;
  }

  // Send permission request to the connected wallet. This will either be the browser extension, or a wallet over the P2P network.
  await globalWallet.requestPermissions();

  return globalWallet;
};

export const Tezos = TezosObj;
