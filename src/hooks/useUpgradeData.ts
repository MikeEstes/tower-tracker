import { useAtom, useAtomValue } from 'jotai';

import { playerUpgradeProgressAtom, previewModeAtom, previewUpgradeProgressAtom } from '../atoms/playerProgressAtom';
import { upgradeAmountAtom } from '../atoms/configurationAtom';
import { UpgradeDataMap } from '../data';
import { selectedUpgradeAtom } from '../atoms/utilitiesAtom';

export const useUpgradeData = (upgradeId?: string) => {
  const selectedUpgradeFromAtom = useAtomValue(selectedUpgradeAtom);
  const selectedUpgrade = upgradeId ?? selectedUpgradeFromAtom;
  const previewMode = useAtomValue(previewModeAtom);

  const [playerProgress, setPlayerProgress] = useAtom(playerUpgradeProgressAtom);
  const previewProgress = useAtomValue(previewUpgradeProgressAtom);
  const [upgradeAmount] = useAtom(upgradeAmountAtom);

  if (!selectedUpgrade) {
    return {
      id: null,
      name: '',
      description: '',
      maxLevel: 0,
      progress: 0,
      increment: () => { },
      decrement: () => { },
      isMaxed: false,
    };
  }

  const meta = UpgradeDataMap[selectedUpgrade];
  const progressMap = previewMode ? previewProgress : playerProgress;
  const progress = progressMap[selectedUpgrade as keyof typeof progressMap] ?? 0;
  const maxLevel = meta?.maxLevel ?? 0;

  const amount = upgradeAmount === 'MAX' ? maxLevel : parseInt(upgradeAmount, 10);

  const updateProgress = (delta: number) => {
    setPlayerProgress(prev => {
      const current = (prev as any)[selectedUpgrade] as number;
      const newValue = Math.min(maxLevel, Math.max(0, current + delta));
      return { ...(prev as any), [selectedUpgrade]: newValue };
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
  const isSelected = selectedUpgradeFromAtom === upgradeId;

  return {
    id: selectedUpgrade,
    name: meta?.name ?? '',
    description: meta?.description ?? '',
    maxLevel,
    progress,
    increment,
    decrement,
    isMaxed,
    isSelected,
  };
}; 