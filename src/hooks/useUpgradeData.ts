import { useAtomValue } from 'jotai';

import { playerUpgradeProgressAtom, previewModeAtom, previewUpgradeProgressAtom } from '../atoms/playerProgressAtom';
import { UpgradeDataMap } from '../data';

export const useUpgradeData = (id: string) => {
  const isPreview = useAtomValue(previewModeAtom);
  const meta = UpgradeDataMap[id];
  const progressMap = useAtomValue(isPreview ? previewUpgradeProgressAtom : playerUpgradeProgressAtom);
  const progress = progressMap[id as keyof typeof progressMap] ?? 0;

  return {
    id,
    name: meta?.name ?? '',
    description: meta?.description ?? '',
    maxLevel: meta?.maxLevel ?? 0,
    progress,
  };
}; 