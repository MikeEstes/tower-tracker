import { AttackUpgradeData } from './AttackUpgradeData';
import { DefenseUpgradeData } from './DefenseUpgradeData';
import { UtilityUpgradeData } from './UtilityUpgradeData';
import { Upgrade } from '../types/upgrades';

export const AllUpgradeData: Upgrade[] = [
  ...AttackUpgradeData,
  ...DefenseUpgradeData,
  ...UtilityUpgradeData,
];

export const UpgradeDataMap: Record<string, Upgrade> = AllUpgradeData.reduce(
  (map, upgrade) => {
    map[upgrade.id] = upgrade;
    return map;
  },
  {} as Record<string, Upgrade>
); 