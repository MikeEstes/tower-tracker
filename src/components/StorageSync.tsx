import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtomValue, useSetAtom } from 'jotai';

import { exportProgress, importProgress } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
} from '../atoms/playerProgressAtom';

// Component to sync progress to AsyncStorage
export default function StorageSync() {
  const upgrades = useAtomValue(playerUpgradeProgressAtom);
  const cards = useAtomValue(playerCardProgressAtom);
  const setUp = useSetAtom(playerUpgradeProgressAtom);
  const setCard = useSetAtom(playerCardProgressAtom);

  // On mount: load saved code and hydrate state
  useEffect(() => {
    AsyncStorage.getItem('progressCode').then(code => {
      if (code) {
        try {
          const { upgradeProgress, cardProgress } = importProgress(code);
          setUp(upgradeProgress as any);
          setCard(cardProgress as any);
        } catch {
          // ignore invalid codes
        }
      }
    });
  }, [setUp, setCard]);

  // On any change: export and save code
  useEffect(() => {
    const blob = exportProgress(upgrades, cards);
    AsyncStorage.setItem('progressCode', blob);
  }, [upgrades, cards]);

  return null;
} 