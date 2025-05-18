import { Upgrade } from "../types/upgrades";

export const UtilityUpgradeData: Upgrade[] = [
  {
    id: 'cashBonus',
    name: 'Cash Bonus',
    maxLevel: 149,
    description: 'Cash earned from all sources multiplier (includes wave bonus)',
  },
  {
    id: 'cashPerWave',
    name: 'Cash / Wave',
    maxLevel: 149,
    description: 'Cash earned after completing a wave',
  },
  {
    id: 'coinsPerKillBonus',
    name: 'Coins / Kill Bonus',
    maxLevel: 149,
    description: 'Coins earned rom destroying enemies',
  },
  {
    id: 'coinsPerWave',
    name: 'Coins / Wave',
    maxLevel: 149,
    description: 'Coins earned after completing a wave',
  },
  {
    id: 'freeAttackUpgrade',
    name: 'Free Attack Upgrade',
    maxLevel: 99,
    description: 'Chance of earning a free attack upgrade after completing a wave',
  },
  {
    id: 'freeDefenseUpgrade',
    name: 'Free Defense Upgrade',
    maxLevel: 99,
    description: 'Chance of earning a free defense upgrade after completing a wave',
  },
  {
    id: 'freeUtilityUpgrade',
    name: 'Free Utility Upgrade',
    maxLevel: 99,
    description: 'Chance of earning a free utility upgrade after completing a wave',
  },
  {
    id: 'interestPerWave',
    name: 'Interest / Wave',
    maxLevel: 99,
    description: 'Earn a percent of cash kept on hand at the end of wave (max of $x)',
  },
  {
    id: 'recoveryAmount',
    name: 'Recovery Amount',
    maxLevel: 300,
    description: 'Percent of max health that each recovery package recovers',
  },
  {
    id: 'maxRecovery',
    name: 'Max Recovery',
    maxLevel: 500,
    description: 'How much beyond max health recovery packages are able to recover',
  },
  {
    id: 'packageChance',
    name: 'Package Chance',
    maxLevel: 60,
    description: 'Chance a recovery package can spawn each wave',
  },
  {
    id: 'enemyAttackLevelSkip',
    name: 'Enemy Attack Level Skip',
    maxLevel: 699,
    description: 'Chance of skipping enemy attack level up after completing a wave',
  },
  {
    id: 'enemyHealthLevelSkip',
    name: 'Enemy Health Level Skip',
    maxLevel: 699,
    description: 'Chance of skipping enemy health level up after completing a wave',
  }
];