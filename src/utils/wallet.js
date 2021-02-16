import { TezosToolkit } from '@taquito/taquito';
import { NETWORK } from 'src/defaults';
import { NetworkType } from '@airgap/beacon-sdk';

let TezosObj;

if (NETWORK === 'delphinet') {
  TezosObj = new TezosToolkit('https://api.tez.ie/rpc/delphinet');
} else {
  TezosObj = new TezosToolkit(' https://api.tez.ie/rpc/mainnet');
}

export const connectToBeacon = async walletContext => {
  const network =
    NETWORK === 'delphinet' ? NetworkType.DELPHINET : NetworkType.MAINNET;
  let globalWallet;

  if (!globalWallet) {
    // Create a new BeaconWallet instance. The options will be passed to the DAppClient constructor.
    // const wallet = new BeaconWallet({ name: 'TzButton' })

    // Setting the wallet as the wallet provider for Taquito.
    TezosObj.setWalletProvider(walletContext);
    globalWallet = walletContext;
  }

  if (
    await globalWallet.client.getActiveAccount({
      network: {
        type: network,
      },
    })
  ) {
    // Check if we already have an account connected, so we can skip requestPermissions.
    return globalWallet;
  }

  // Send permission request to the connected wallet. This will either be the browser extension, or a wallet over the P2P network.
  await globalWallet.requestPermissions({
    network: {
      type: network,
    },
  });

  return globalWallet;
};

export const Tezos = TezosObj;
