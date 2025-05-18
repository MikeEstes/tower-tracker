import { useMemo } from 'react';

import { atom, useAtomValue, useSetAtom } from 'jotai';

import { playerCardProgressAtom, previewModeAtom, previewCardProgressAtom } from '../atoms/playerProgressAtom';
import { CardDataMap, CardLevels, CardAmounts } from '../data/CardData';
import { Card } from '../types/cards';

export interface UseCardDataReturn {
  id: Card['id'];
  name: string;
  description: string;
  progress: number;
  cardLevel: number;
  levelText: string;
  increment: () => void;
  decrement: () => void;
}

export const useCardData = (id: Card['id']): UseCardDataReturn => {
  const previewMode = useAtomValue(previewModeAtom);
  const meta = CardDataMap[id];

  // choose live or preview atom
  const baseAtom = previewMode ? previewCardProgressAtom : playerCardProgressAtom;
  const progressAtom = useMemo(
    () => atom((get) => ((get(baseAtom) as any)[id] as number) ?? 0),
    [id, previewMode]
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

  // bound increment/decrement actions
  const increment = () => {
    if (progress >= CardLevels[7]) return;
    setPlayerProgress((prev) => ({ ...(prev as any), [id]: (prev as any)[id] + 1 }));
  };

  const decrement = () => {
    if (progress <= CardLevels[0]) return;
    setPlayerProgress((prev) => ({ ...(prev as any), [id]: (prev as any)[id] - 1 }));
  };

  return {
    id,
    name: meta?.name ?? '',
    description,
    progress,
    cardLevel,
    levelText,
    increment,
    decrement,
  };
}; 