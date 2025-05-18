import { atom } from 'jotai';

const DEFAULT_CARD_PROGRESS = {
  damage: 0,
  attackSpeed: 0,
  health: 0,
  healthRegen: 0,
  range: 0,
  cash: 0,
  coins: 0,
  slowAura: 0,
  criticalChance: 0,
  enemyBalance: 0,
  extraDefense: 0,
  fortress: 0,
  freeUpgrades: 0,
  extraOrb: 0,
  plasmaCannon: 0,
  criticalCoin: 0,
  waveSkip: 0,
  introSprint: 0,
  landMineStun: 0,
  recoveryPackageChance: 0,
  deathRay: 0,
  energyNet: 0,
  superTower: 0,
  secondWind: 0,
  demonMode: 0,
  energyShield: 0,
  waveAccelerator: 0,
  berserker: 0,
  nuke: 0,
};

const DEFAULT_UPGRADE_PROGRESS = {
  // Attack Upgrades
  damage: 0,
  attackSpeed: 0,
  criticalChance: 0,
  criticalFactor: 0,
  attackRange: 0,
  damagePerMeter: 0,
  multishotChance: 0,
  multishotTargets: 0,
  rapidFireChance: 0,
  rapidFireDuration: 0,
  bounceShotChance: 0,
  bounceShotTargets: 0,
  bounceShotRange: 0,
  superCritChance: 0,
  superCritMult: 0,
  rendArmorChance: 0,
  rendArmorMult: 0,
  // Defense Upgrades
  health: 0,
  healthRegen: 0,
  defensePercentage: 0,
  defenseAbsolute: 0,
  thornDamage: 0,
  lifesteal: 0,
  knockbackChance: 0,
  knockbackForce: 0,
  orbSpeed: 0,
  orbs: 0,
  shockwaveSize: 0,
  shockwaveFrequency: 0,
  landMineChance: 0,
  landMineDamage: 0,
  landMineRadius: 0,
  deathDefy: 0,
  wallHealth: 0,
  wallRebuild: 0,
  // Utility Upgrades
  cashBonus: 0,
  cashPerWave: 0,
  coinsPerKillBonus: 0,
  coinsPerWave: 0,
  freeAttackUpgrade: 0,
  freeDefenseUpgrade: 0,
  freeUtilityUpgrade: 0,
  interestPerWave: 0,
  recoveryAmount: 0,
  maxRecovery: 0,
  packageChance: 0,
  enemyAttackLevelSkip: 0,
  enemyHealthLevelSkip: 0,
}

// Player Data Atoms
export const playerCardProgressAtom = atom(DEFAULT_CARD_PROGRESS);
export const playerUpgradeProgressAtom = atom(DEFAULT_UPGRADE_PROGRESS);

// Preview Mode Atoms
export const previewModeAtom = atom(false);
export const previewUpgradeProgressAtom = atom(DEFAULT_UPGRADE_PROGRESS);
export const previewCardProgressAtom = atom(DEFAULT_CARD_PROGRESS); 