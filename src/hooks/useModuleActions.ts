import { useAtomValue } from 'jotai';

import { currentModuleTypeAtom } from '../atoms/configurationAtom';
import { useUpgradeData } from './useUpgradeData';
import { useCardData } from './useCardData';
import { useLabData } from './useLabData';
import { selectedUpgradeAtom, selectedCardAtom, selectedLabAtom } from '../atoms/utilitiesAtom';

export const useModuleActions = () => {
  const moduleType = useAtomValue(currentModuleTypeAtom);
  const selectedUpgrade = useAtomValue(selectedUpgradeAtom);
  const selectedCard = useAtomValue(selectedCardAtom);
  const selectedLab = useAtomValue(selectedLabAtom);

  // Call all hooks unconditionally to follow the rules of hooks
  const upgradeData = useUpgradeData(selectedUpgrade ?? '');
  const cardData = useCardData(selectedCard as any ?? '');
  const labData = useLabData(selectedLab ?? '');

  switch (moduleType) {
    case 'card':
      return {
        increment: cardData.increment,
        decrement: cardData.decrement,
      };
    case 'lab':
      return {
        increment: labData.increment,
        decrement: labData.decrement,
      };
    case 'upgrade':
    default:
      return {
        increment: upgradeData.increment,
        decrement: upgradeData.decrement,
      };
  }
}; 