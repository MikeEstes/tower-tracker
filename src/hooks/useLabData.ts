import { useAtom, useAtomValue } from 'jotai';

import { playerLabProgressAtom, previewModeAtom, previewLabProgressAtom } from '../atoms/playerProgressAtom';
import { upgradeAmountAtom } from '../atoms/configurationAtom';
import { LabData } from '../data/LabData';
import { selectedLabAtom } from '../atoms/utilitiesAtom';

export const useLabData = (id: string) => {
  const isPreview = useAtomValue(previewModeAtom);
  const meta = LabData.find(lab => lab.id === id);
  const selectedLabFromAtom = useAtomValue(selectedLabAtom);
  const [playerProgress, setPlayerProgress] = useAtom(playerLabProgressAtom);
  const previewProgress = useAtomValue(previewLabProgressAtom);
  const progressMap = (isPreview ? previewProgress : playerProgress) || {};
  const [upgradeAmount] = useAtom(upgradeAmountAtom);

  if (!id || !meta) {
    if (__DEV__ && id) {
      console.warn(`Lab with id '${id}' not found in LabsData.`);
    }
    return {
      id: id ?? '',
      name: id ?? '',
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
  const isSelected = selectedLabFromAtom === id;

  return {
    id,
    name: meta.name ?? '',
    description: meta.description ?? '',
    maxLevel,
    progress,
    increment,
    decrement,
    isMaxed,
    isSelected,
  };
}; 