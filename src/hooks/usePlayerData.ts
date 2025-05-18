import { useAtom } from 'jotai';

import { playerUpgradeProgressAtom } from '../atoms/playerProgressAtom';

export const usePlayerData = () => {
  const [playerProgress, setPlayerProgress] = useAtom(playerUpgradeProgressAtom);

  const incrementStat = (stat: string) => {
    const upgradeStat = playerProgress[stat as keyof typeof playerProgress];

    // TODO: Read this from max level of upgrade
    if (upgradeStat >= 100) {
      return;
    }

    setPlayerProgress((prev) => ({
      ...prev,
      [stat]: prev[stat as keyof typeof playerProgress] + 1,
    }));
  };

  const decrementStat = (stat: string) => {
    const upgradeStat = playerProgress[stat as keyof typeof playerProgress];

    if (upgradeStat === 0) {
      return;
    }

    setPlayerProgress((prev) => ({
      ...prev,
      [stat]: prev[stat as keyof typeof playerProgress] - 1,
    }));
  };

  return { incrementStat, decrementStat };
};