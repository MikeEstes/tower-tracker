import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import Toast from 'react-native-toast-message';

import { exportProgress, importProgress } from '../utils/progressShare';
import {
  playerUpgradeProgressAtom,
  playerCardProgressAtom,
  playerLabProgressAtom,
} from '../atoms/playerProgressAtom';

// Component to sync progress to AsyncStorage
export default function StorageSync() {
  const [upgrades, setUpgrades] = useAtom(playerUpgradeProgressAtom);
  const [cards, setCards] = useAtom(playerCardProgressAtom);
  const [labs, setLabs] = useAtom(playerLabProgressAtom);

  // On mount: load saved code and hydrate state
  useEffect(() => {
    AsyncStorage.getItem('progressCode')
      .then(code => {
        if (code) {
          try {
            const { upgradeProgress, cardProgress, labProgress } = importProgress(code);
            setUpgrades(upgradeProgress);
            setCards(cardProgress);
            setLabs(labProgress);
          } catch {
            Toast.show({
              type: 'error',
              text1: 'Failed to load progress',
              text2: 'Your saved progress data is invalid or corrupted.',
            });
          }
        }
      })
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'Storage Error',
          text2: 'Could not load your progress from storage.',
        });
      });
  }, [setUpgrades, setCards, setLabs]);

  // On any change: export and save code
  useEffect(() => {
    const blob = exportProgress(upgrades, cards, labs);
    AsyncStorage.setItem('progressCode', blob).catch(() => {
      Toast.show({
        type: 'error',
        text1: 'Storage Error',
        text2: 'Could not save your progress to storage.',
      });
    });
  }, [upgrades, cards, labs]);

  return null;
} 