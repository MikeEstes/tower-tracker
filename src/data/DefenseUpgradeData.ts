import { Upgrade } from "../types/upgrades";

export const DefenseUpgradeData: Upgrade[] = [
  {
    id: 'health',
    name: 'Health',
    maxLevel: 6000,
    description: 'Maximum health of your tower',
  },
  {
    id: 'healthRegen',
    name: 'Health Regen',
    maxLevel: 6000,
    description: 'Amount of tower health regenerated per second',
  },
  {
    id: 'defensePercentage',
    name: 'Defense %',
    maxLevel: 99,
    description: 'Percent of incoming damage reduced. This is applied before defense absolute',
  },
  {
    id: 'defenseAbsolute',
    name: 'Defense Absolute',
    maxLevel: 5000,
    description: 'Absolute damage reduced from enemy attack. This is applied after defense %',
  },
  {
    id: 'thornDamage',
    name: 'Thorn Damage',
    maxLevel: 99,
    description: 'Deal a percent of the enemy\'s max health in damage when they hit your tower (includes ranged attackers, 50% damage to bosses)',
  },
  {
    id: 'lifesteal',
    name: 'Lifesteal',
    maxLevel: 80,
    description: 'Heal your tower by the percent of lifesteal multiplied by damage dealt to the enemy on hit',
  },
  {
    id: 'knockbackChance',
    name: 'Knockback Chance',
    maxLevel: 80,
    description: 'Chance to knockback enemies',
  },
  {
    id: 'knockbackForce',
    name: 'Knockback Force',
    maxLevel: 40,
    description: 'Force applied to knocked back enemies',
  },
  {
    id: 'orbSpeed',
    name: 'Orb Speed',
    maxLevel: 38,
    description: 'Speed of the orbs defending your tower',
  },
  {
    id: 'orbs',
    name: 'Orbs',
    maxLevel: 4,
    description: 'Number of orbs defending your tower',
  },
  {
    id: 'shockwaveSize',
    name: 'Shockwave Size',
    maxLevel: 35,
    description: 'Size of shockwave to push enemies back (except for bosses)',
  },
  {
    id: 'shockwaveFrequency',
    name: 'Shockwave Frequency',
    maxLevel: 40,
    description: 'How often a shockwave occurs',
  },
  {
    id: 'landMineChance',
    name: 'Land Mine Chance',
    maxLevel: 50,
    description: 'Chance of enemies dropping a land mine',
  },
  {
    id: 'landMineDamage',
    name: 'Land Mine Damage',
    maxLevel: 200,
    description: 'Landmines deal x of tower damage (Accounts for crits/cuper crit factor and chance)',
  },
  {
    id: 'landMineRadius',
    name: 'Land Mine Radius',
    maxLevel: 50,
    description: 'Explosion radius of land mines',
  },
  {
    id: 'deathDefy',
    name: 'Death Defy',
    maxLevel: 75,
    description: 'Chance of a killing hit to the tower being ignored',
  },
];