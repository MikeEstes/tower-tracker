import { useAtom, useAtomValue } from 'jotai';

import { playerUpgradeProgressAtom, previewModeAtom, previewUpgradeProgressAtom } from '../atoms/playerProgressAtom';
import { upgradeAmountAtom } from '../atoms/configurationAtom';
import { UpgradeDataMap } from '../data';

export const useUpgradeData = (id: string) => {
  const isPreview = useAtomValue(previewModeAtom);
  const meta = UpgradeDataMap[id];
  const [playerProgress, setPlayerProgress] = useAtom(playerUpgradeProgressAtom);
  const previewProgress = useAtomValue(previewUpgradeProgressAtom);
  const progressMap = isPreview ? previewProgress : playerProgress;
  const [upgradeAmount] = useAtom(upgradeAmountAtom);
  const progress = progressMap[id as keyof typeof progressMap] ?? 0;
  const maxLevel = meta?.maxLevel ?? 0;

  const amount = upgradeAmount === 'MAX' ? maxLevel : parseInt(upgradeAmount, 10);

  const updateProgress = (delta: number) => {
    setPlayerProgress(prev => {
      const current = (prev as any)[id] as number;
      const newValue = Math.min(maxLevel, Math.max(0, current + delta));
      return { ...(prev as any), [id]: newValue };
    });
  };

  const increment = () => {
    if (progress >= maxLevel) return;
    updateProgress(amount);
  };

  const decrement = () => {
    if (progress <= 0) return;
    updateProgress(-amount);
  };

  const isMaxed = progress >= maxLevel;

  return {
    id,
    name: meta?.name ?? '',
    description: meta?.description ?? '',
    maxLevel,
    progress,
    increment,
    decrement,
    isMaxed,
  };
}; 