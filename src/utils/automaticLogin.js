import { ThanosWallet } from '@thanos-wallet/dapp';
import { batchUpdateProgress } from 'src/api';

async function checkIfUserActive(setUser, beacon, location) {
  if (typeof window == 'undefined' || typeof beacon == 'undefined') return;
  console.log('thanos available', await ThanosWallet.isAvailable());
  if (!(await ThanosWallet.isAvailable())) return;

  localStorage.setItem('last-page', location.pathname);

  const acc = await beacon.client.getActiveAccount();

  if (acc) {
    const u = JSON.parse(localStorage.getItem('user') || '{}');

    if (u && acc.address === u.xtzAddress) {
      if (u.verified) {
        setUser(u);
        let progress =
          typeof window !== `undefined` && localStorage.getItem('progress');
        if (progress) {
          progress = JSON.parse(progress);
          const res = await batchUpdateProgress(u, progress);
        }
      }
    }
  }
}

export default checkIfUserActive;
