import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';

import { exportProgress, importProgress } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
  playerLabsProgressAtom,
} from '../atoms/playerProgressAtom';

// Component to sync progress to AsyncStorage
export default function StorageSync() {
  const [upgrades, setUpgrades] = useAtom(playerUpgradeProgressAtom);
  const [cards, setCards] = useAtom(playerCardProgressAtom);
  const [labs, setLabs] = useAtom(playerLabsProgressAtom);

  // On mount: load saved code and hydrate state
  useEffect(() => {
    AsyncStorage.getItem('progressCode').then(code => {
      if (code) {
        try {
          const { upgradeProgress, cardProgress, labProgress } = importProgress(code);
          setUpgrades(upgradeProgress as any);
          setCards(cardProgress as any);
          setLabs(labProgress as any)
        } catch {
          // ignore invalid codes
        }
      }
    });
  }, [setUpgrades, setCards, setLabs]);

  // On any change: export and save code
  useEffect(() => {
    const blob = exportProgress(upgrades, cards, labs);
    AsyncStorage.setItem('progressCode', blob);
  }, [upgrades, cards, labs]);

  return null;
} 