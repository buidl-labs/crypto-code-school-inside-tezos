import userAtom from './user-atom';
import { atom } from 'jotai';

const isUserAtom = atom(get => Object.keys(get(userAtom)).length > 0);

export default isUserAtom;
