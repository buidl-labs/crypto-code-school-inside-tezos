import { batchUpdateProgress } from 'src/api';

async function checkIfUserActive(setUser, beacon, location) {
  if (typeof window == 'undefined' || typeof beacon == 'undefined') return;
  console.log(location.pathname);
  // if (from == 'customizer') {
  localStorage.setItem('last-page', '/tezos/customizebot');
  // }

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
