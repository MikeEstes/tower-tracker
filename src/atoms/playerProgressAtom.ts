import { atom } from 'jotai';

import { CardProgress, UpgradeProgress, LabProgress } from '../types/progress';

export const DEFAULT_CARD_PROGRESS: CardProgress = {
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
  ultimateCrit: 0,
  nuke: 0,
};

export const DEFAULT_UPGRADE_PROGRESS: UpgradeProgress = {
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
};

export const DEFAULT_LAB_PROGRESS: LabProgress = {
  // Main Research
  gameSpeed: 0,
  startingCash: 0,
  workshopAttackDiscount: 0,
  workshopDefenseDiscount: 0,
  workshopUtilityDiscount: 0,
  labsCoinDiscount: 0,
  labsSpeed: 0,
  buyMultiplier: 0,
  moreRoundStats: 0,
  targetPriority: 0,
  cardPresets: 0,
  workshopRespec: 0,
  rerollDailyMissions: 0,
  workshopEnhancement: 0,
  battleConditionReduction: 0,
  // Attack Research
  damage: 0,
  attackSpeed: 0,
  criticalFactor: 0,
  range: 0,
  damagePerMeter: 0,
  superCritChance: 0,
  superCritMult: 0,
  maxRendArmorMultiplier: 0,
  lightSpeedShots: 0,
  // Defense Research
  health: 0,
  healthRegen: 0,
  defenseAbsolute: 0,
  defensePercent: 0,
  orbSpeed: 0,
  landMindDamage: 0,
  landMindDecay: 0,
  shockwaveSize: 0,
  orbBossHit: 0,
  wallHealth: 0,
  wallRebuild: 0,
  wallRegen: 0,
  wallThorn: 0,
  wallInvincibility: 0,
  wallFortification: 0,
  garlicThorns: 0,
  // Utility Research
  cashBonus: 0,
  cashPerWave: 0,
  coinsPerKillBonus: 0,
  coinsPerWave: 0,
  interest: 0,
  maxInterest: 0,
  packageAfterBoss: 0,
  recoveryPackageAmount: 0,
  recoveryPackageMax: 0,
  recoveryPackageChance: 0,
  enemyAttackLevelSkip: 0,
  enemyHealthLevelSkip: 0,
  // Ultimate Weapon Research
  missilesDespawnTime: 0,
  missilesExplosion: 0,
  missilesRadius: 0,
  chronoFieldDuration: 0,
  chronoFieldDamageReduction: 0,
  chronoFieldReductionPercent: 0,
  swampRadius: 0,
  swampStun: 0,
  swampStunChance: 0,
  swampStunTime: 0,
  goldenTowerBonus: 0,
  goldenTowerDuration: 0,
  chainLightningShock: 0,
  shockChance: 0,
  shockMultiplier: 0,
  deathWaveHealth: 0,
  deathWaveCoinBonus: 0,
  innerMineBlastRadius: 0,
  innerMineRotationSpeed: 0,
  chronoFieldRange: 0,
  missileAmplifier: 0,
  missileBarrage: 0,
  missileBarrageQuantity: 0,
  innerMineStun: 0,
  blackHoleDamage: 0,
  extraBlackHole: 0,
  blackHoleCoinsBonus: 0,
  spotlightCoinBonus: 0,
  spotlightMissiles: 0,
  blackHoleDisableRangedEnemies: 0,
  rechargeMissileBarrage: 0,
  swampRendBasicEnemies: 0,
  swampRendAdditionalEnemies: 0,
  chainThunder: 0,
  lightningAmplifier: 0,
  deathWaveDamageAmplifier: 0,
  deathWaveCellBonus: 0,
  deathWaveArmorStripping: 0,
  innerLandMineChronoJump: 0,
  // Card Research
  secondWindBlast: 0,
  doubleDeathRay: 0,
  extraOrbAdjuster: 0,
  extraExtraOrbs: 0,
  energyShieldExtraHit: 0,
  superTowerBonus: 0,
  rechargeSecondWind: 0,
  rechargeDemonMode: 0,
  rechargeNuke: 0,
  damageMastery: 0,
  attackSpeedMastery: 0,
  healthMastery: 0,
  healthRegenMastery: 0,
  rangeMastery: 0,
  cashMastery: 0,
  coinsMastery: 0,
  slowAuraMastery: 0,
  criticalChanceMastery: 0,
  enemyBalanceMastery: 0,
  extraDefenseMastery: 0,
  fortressMastery: 0,
  freeUpgradesMastery: 0,
  extraOrbMastery: 0,
  plasmaCannonMastery: 0,
  criticalCoinMastery: 0,
  waveSkipMastery: 0,
  introSprintMastery: 0,
  landMineStunMastery: 0,
  recoveryPackageChanceMastery: 0,
  deathRayMastery: 0,
  energyNetMastery: 0,
  superTowerMastery: 0,
  secondWindMastery: 0,
  demonModeMastery: 0,
  energyShieldMastery: 0,
  waveAcceleratorMastery: 0,
  berserkerMastery: 0,
  ultimateCritMastery: 0,
  nukeMastery: 0,
  // Perk Research
  unlockPerks: 0,
  wavesRequired: 0,
  autoPickPerks: 0,
  standardPerksBonus: 0,
  perkOptionQuantity: 0,
  firstPerkChoice: 0,
  banPerks: 0,
  improveTradeOffPerks: 0,
  autoPickRanking: 0,
  // Bot Research
  flameBotCooldown: 0,
  thunderBotCooldown: 0,
  goldenBotCooldown: 0,
  amplifyBotCooldown: 0,
  flameBotBurnStack: 0,
  thunderBotLingerTime: 0,
  goldenBotDuration: 0,
  amplifyBotDuration: 0,
  // Enemies Research
  commonEnemyHealth: 0,
  commonEnemyAttack: 0,
  fastEnemyHealth: 0,
  fastEnemyAttack: 0,
  fastEnemySpeed: 0,
};

// Player Data Atoms
export const playerCardProgressAtom = atom<CardProgress>(DEFAULT_CARD_PROGRESS);
export const playerCardTotalAmountAtom = atom((get) => {
  const progress = get(playerCardProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});
export const playerUpgradeProgressAtom = atom<UpgradeProgress>(DEFAULT_UPGRADE_PROGRESS);
export const playerUpgradeTotalAmountAtom = atom((get) => {
  const progress = get(playerUpgradeProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});
export const playerLabProgressAtom = atom<LabProgress>(DEFAULT_LAB_PROGRESS);
export const playerLabTotalAmountAtom = atom((get) => {
  const progress = get(playerLabProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});
export const playerTaggedLabsAtom = atom<string[]>([]);

// Preview Mode Atoms
export const previewModeAtom = atom(false);
export const previewUpgradeProgressAtom = atom<UpgradeProgress>(DEFAULT_UPGRADE_PROGRESS);
export const previewUpgradeTotalAmountAtom = atom((get) => {
  const progress = get(previewUpgradeProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});
export const previewCardProgressAtom = atom<CardProgress>(DEFAULT_CARD_PROGRESS);
export const previewCardTotalAmountAtom = atom((get) => {
  const progress = get(previewCardProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});
export const previewLabProgressAtom = atom<LabProgress>(DEFAULT_LAB_PROGRESS);
export const previewLabTotalAmountAtom = atom((get) => {
  const progress = get(previewLabProgressAtom);
  return Object.values(progress).reduce((sum, amount) => sum + amount, 0);
});