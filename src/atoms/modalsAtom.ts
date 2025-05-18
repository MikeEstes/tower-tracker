import { atom } from 'jotai';

export const upgradeModalAtom = atom(false);
export const upgradeModalDataAtom = atom<string | null>(null);

export const cardModalAtom = atom(false);
export const cardModalDataAtom = atom<string | null>(null);