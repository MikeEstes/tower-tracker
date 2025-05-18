import { useAtomValue } from 'jotai';

import { playerUpgradeProgressAtom } from '../atoms/playerProgressAtom';
import { UpgradeDataMap } from '../data';

export const useUpgradeData = (id: string) => {
  const meta = UpgradeDataMap[id];
  const progressMap = useAtomValue(playerUpgradeProgressAtom);
  const progress = progressMap[id as keyof typeof progressMap] ?? 0;

  return {
    id,
    name: meta?.name ?? '',
    description: meta?.description ?? '',
    maxLevel: meta?.maxLevel ?? 0,
    progress,
  };
}; 