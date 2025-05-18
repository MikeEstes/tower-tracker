import { atom } from 'jotai';

export const upgradeModalAtom = atom(false);
export const upgradeModalDataAtom = atom<string | null>(null);