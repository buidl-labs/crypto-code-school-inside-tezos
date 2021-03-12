import { atom } from 'jotai';

const userAtom = atom({}, (get, set, newUser) => {
  localStorage.setItem('user', JSON.stringify(newUser));
  set(userAtom, newUser);
});

export default userAtom;
