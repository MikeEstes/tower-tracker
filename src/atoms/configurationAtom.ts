import { atom } from 'jotai';

export type UpgradeAmount = '1' | '5' | '10' | '100' | 'MAX';
export const upgradeAmountAtom = atom<UpgradeAmount>('1');

export type ModuleType = 'upgrade' | 'card' | 'lab' | 'hidden';
export const currentModuleTypeAtom = atom<ModuleType>('hidden');