import { useAtom, useAtomValue } from 'jotai';

import { playerLabsProgressAtom, previewModeAtom, previewLabsProgressAtom } from '../atoms/playerProgressAtom';
import { upgradeAmountAtom } from '../atoms/configurationAtom';
import { LabData } from '../data/LabData';

export const useLabData = (id: string) => {
  const isPreview = useAtomValue(previewModeAtom);
  const meta = LabData.find(lab => lab.id === id);
  const [playerProgress, setPlayerProgress] = useAtom(playerLabsProgressAtom);
  const previewProgress = useAtomValue(previewLabsProgressAtom);
  const progressMap = (isPreview ? previewProgress : playerProgress) || {};
  const [upgradeAmount] = useAtom(upgradeAmountAtom);

  if (!meta) {
    if (__DEV__) {
      console.warn(`Lab with id '${id}' not found in LabsData.`);
    }
    return {
      id,
      name: id,
      description: '',
      maxLevel: 0,
      progress: 0,
      increment: () => { },
      decrement: () => { },
      isMaxed: true,
    };
  }

  const progress = progressMap[id as keyof typeof progressMap] ?? 0;
  const maxLevel = meta.maxLevel ?? 0;
  const amount = upgradeAmount === 'MAX' ? maxLevel : parseInt(upgradeAmount, 10);

  const updateProgress = (delta: number) => {
    setPlayerProgress(prev => {
      const current = (prev as any)?.[id] ?? 0;
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
    name: meta.name ?? '',
    description: meta.description ?? '',
    maxLevel,
    progress,
    increment,
    decrement,
    isMaxed,
  };
}; 