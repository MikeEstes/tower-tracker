import { useAtomValue } from 'jotai';

import { playerProgressAtom } from '../atoms/playerProgressAtom';
import { usePlayerData } from './usePlayerData';
import { UpgradeDataMap } from '../data';

export const useUpgradeData = (id: string) => {
  const meta = UpgradeDataMap[id];
  const progressMap = useAtomValue(playerProgressAtom);
  const progress = progressMap[id as keyof typeof progressMap] ?? 0;
  const { incrementStat, decrementStat } = usePlayerData();

  return {
    id,
    name: meta?.name ?? '',
    description: meta?.description ?? '',
    maxLevel: meta?.maxLevel ?? 0,
    progress,
    increment: () => incrementStat(id),
    decrement: () => decrementStat(id),
  };
}; 