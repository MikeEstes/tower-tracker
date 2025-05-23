import { atom } from 'jotai';

export const upgradeModalAtom = atom(false);
export const upgradeModalDataAtom = atom<string | null>(null);

export const cardModalAtom = atom(false);
export const cardModalDataAtom = atom<string | null>(null);

export const labModalAtom = atom(false);
export const labModalDataAtom = atom<string | null>(null);

export const infoModalAtom = atom(false);
export const infoModalDataAtom = atom<{
  title: string;
  stats: Array<{
    label: string;
    value: string | number;
  }>;
} | null>(null);