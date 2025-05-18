import { Upgrade } from "../types/upgrades";

export const AttackUpgradeData: Upgrade[] = [
  {
    id: 'damage',
    name: 'Damage',
    maxLevel: 6000,
    description: 'Damage each projectile deals to enemies',
  },
  {
    id: 'attackSpeed',
    name: 'Attack Speed',
    maxLevel: 99,
    description: 'Speed projectiles are fired from your tower',
  },
  {
    id: 'criticalChance',
    name: 'Critical Chance',
    maxLevel: 79,
    description: 'Chance of each projectile to deal critical damage',
  },
  {
    id: 'criticalFactor',
    name: 'Critical Factor',
    maxLevel: 150,
    description: 'Damage multiplier for critical hits',
  },
  {
    id: 'attackRange',
    name: 'Attack Range',
    maxLevel: 79,
    description: 'Maximum range of tower',
  },
  {
    id: 'damagePerMeter',
    name: 'Damage / Meter',
    maxLevel: 200,
    description: 'Damage increased the further the enemy is from the tower',
  },
  {
    id: 'multishotChance',
    name: 'Multishot Chance',
    maxLevel: 99,
    description: 'Chance to shoot more than one projectile when firing',
  },
  {
    id: 'multishotTargets',
    name: 'Multishot Targets',
    maxLevel: 7,
    description: 'Number of projectiles shot when multishot activates (if enough enemies in range)',
  },
  {
    id: 'rapidFireChance',
    name: 'Rapid Fire Chance',
    maxLevel: 85,
    description: 'Chance to fire x4 as fast as normal for a duration',
  },
  {
    id: 'rapidFireDuration',
    name: 'Rapid Fire Duration',
    maxLevel: 99,
    description: 'Duration of rapid fire when activated',
  },
  {
    id: 'bounceShotChance',
    name: 'Bounce Shot Chance',
    maxLevel: 85,
    description: 'Chance for projectile to bounce to another enemy after hitting',
  },
  {
    id: 'bounceShotTargets',
    name: 'Bounce Shot Targets',
    maxLevel: 7,
    description: 'Number of times a projectile can bounce from enemy to enemy',
  },
  {
    id: 'bounceShotRange',
    name: 'Bounce Shot Range',
    maxLevel: 60,
    description: 'Range that a projectile can bounce from enemy to enemy if activated',
  },
  {
    id: 'superCritChance',
    name: 'Super Crit Chance',
    maxLevel: 100,
    description: 'Chance for a super critical hit, if critical hit chance succeeds',
  },
  {
    id: 'superCritMult',
    name: 'Super Crit Mult',
    maxLevel: 120,
    description: 'Super critical hit damage multiplier',
  },
];