import userAtom from './user-atom';
import { atom } from 'jotai';

//TODO:  Also check that wallet is present & account is verified
const isUserAtom = atom(get => Object.keys(get(userAtom)).length > 0);

export default isUserAtom;
