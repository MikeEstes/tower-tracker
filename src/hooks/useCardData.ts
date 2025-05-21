import { useMemo } from 'react';

import { atom, useAtomValue, useSetAtom } from 'jotai';

import { playerCardProgressAtom, previewCardProgressAtom } from '../atoms/playerProgressAtom';
import { CardDataMap, CardLevels, CardAmounts } from '../data/CardData';
import { Card } from '../types/cards';
import { upgradeAmountAtom } from '../atoms/configurationAtom';
import { selectedCardAtom } from '../atoms/utilitiesAtom';
import { usePreviewMode } from './usePreviewMode';

export interface UseCardDataReturn {
  id: Card['id'];
  name: string;
  description: string;
  progress: number;
  cardLevel: number;
  levelText: string;
  isSelected: boolean;
  increment: () => void;
  decrement: () => void;
}

export const useCardData = (id: Card['id']): UseCardDataReturn => {
  const selectedCardFromAtom = useAtomValue(selectedCardAtom);
  const isPreview = usePreviewMode();

  const meta = CardDataMap[id];
  const upgradeAmount = useAtomValue(upgradeAmountAtom);
  const amount = upgradeAmount === 'MAX' ? 81 : parseInt(upgradeAmount, 10);

  // choose live or preview atom
  const baseAtom = isPreview ? previewCardProgressAtom : playerCardProgressAtom;
  const progressAtom = useMemo(
    () => atom((get) => ((get(baseAtom) as any)[id] as number) ?? 0),
    [id, isPreview]
  );
  const progress = useAtomValue(progressAtom);
  const setPlayerProgress = useSetAtom(baseAtom);

  // compute card level and display text
  const { cardLevel, levelText } = useMemo(() => {
    let lvl = 0;
    let text = '0/0';

    if (progress >= CardLevels[7]) {
      lvl = 7;
      text = 'Max';
    } else if (progress >= CardLevels[6]) {
      lvl = 6;
      text = `${progress - CardLevels[6]}/${CardAmounts[6]}`;
    } else if (progress >= CardLevels[5]) {
      lvl = 5;
      text = `${progress - CardLevels[5]}/${CardAmounts[5]}`;
    } else if (progress >= CardLevels[4]) {
      lvl = 4;
      text = `${progress - CardLevels[4]}/${CardAmounts[4]}`;
    } else if (progress >= CardLevels[3]) {
      lvl = 3;
      text = `${progress - CardLevels[3]}/${CardAmounts[3]}`;
    } else if (progress >= CardLevels[2]) {
      lvl = 2;
      text = `${progress - CardLevels[2]}/${CardAmounts[2]}`;
    } else if (progress >= CardLevels[1]) {
      lvl = 1;
      text = `${progress - CardLevels[1]}/${CardAmounts[1]}`;
    }

    return { cardLevel: lvl, levelText: text };
  }, [progress]);

  // format description with current level stat or locked placeholder
  const description =
    meta?.description.replace(
      '%{value}',
      meta?.stats[cardLevel - 1] ?? '[LOCKED]'
    ) ?? '';


  const updateProgress = (delta: number) => {

    setPlayerProgress((prev) => {
      const current = (prev as any)[id] as number;
      const newValue = Math.min(81, Math.max(0, current + delta));
      return { ...(prev as any), [id]: newValue };
    });
  };

  // bound increment/decrement actions
  const increment = () => {
    if (progress >= CardLevels[7]) return;
    updateProgress(amount);
  };

  const decrement = () => {
    if (progress <= CardLevels[0]) return;
    updateProgress(-amount);
  };

  const isSelected = selectedCardFromAtom === id;

  return {
    id,
    name: meta?.name ?? '',
    description,
    progress,
    cardLevel,
    levelText,
    isSelected,
    increment,
    decrement,
  };
}; 