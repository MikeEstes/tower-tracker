import { Card } from "../types/cards";

export const CardData: Card[] = [
  {
    id: 'damage',
    name: 'Damage',
    description: 'Increase tower damage by %{value}',
    rarity: 'Common',
    stats: ["x 1.50", "x 2.00", "x 2.40", "x 2.80", "x 3.20", "x 3.60", "x 4.00"]
  },
  {
    id: 'attackSpeed',
    name: 'Attack Speed',
    description: 'Increase tower attack speed by %{value}',
    rarity: 'Common',
    stats: ["x 1.25", "x 1.40", "x 1.55", "x 1.70", "x 1.85", "x 2.00", "x 2.15"]
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Increase tower health by %{value}',
    rarity: 'Common',
    stats: ["x 1.50", "x 2.00", "x 2.40", "x 2.80", "x 3.20", "x 3.60", "x 4.00"]
  },
  {
    id: 'healthRegen',
    name: 'Health Regen',
    description: 'Increase tower health regen by %{value} / sec',
    rarity: 'Common',
    stats: ["x 1.40", "x 1.60", "x 1.80", "x 2.00", "x 2.20", "x 2.40", "x 2.60"]
  },
  {
    id: 'range',
    name: 'Range',
    description: 'Increase tower max range by %{value}',
    rarity: 'Common',
    stats: ["x 1.25", "x 1.40", "x 1.55", "x 1.70", "x 1.85", "x 2.00", "x 2.15"]
  },
  {
    id: 'cash',
    name: 'Cash',
    description: 'Increase all cash earned by %{value}',
    rarity: 'Common',
    stats: ["x 1.20", "x 1.40", "x 1.60", "x 1.80", "x 2.00", "x 2.20", "x 2.40"]
  },
  {
    id: 'coins',
    name: 'Coins',
    description: 'Increase all coins earned by %{value}',
    rarity: 'Common',
    stats: ["x 1.15", "x 1.20", "x 1.25", "x 1.30", "x 1.35", "x 1.40", "x 1.45"]
  },
  {
    id: 'slowAura',
    name: 'Slow Aura',
    description: 'All enemies in tower range speed decreased by %{value}',
    rarity: 'Common',
    stats: ["x 1.20", "x 1.40", "x 1.60", "x 1.80", "x 2.00", "x 2.20", "x 2.40"]
  },
  {
    id: 'criticalChance',
    name: 'Critical Chance',
    description: 'Increase tower critical chance by %{value}',
    rarity: 'Common',
    stats: ["+ 5%", "+ 6%", "+ 7%", "+ 8%", "+ 9%", "+ 10%", "+ 11%"]
  },
  {
    id: 'enemyBalance',
    name: 'Enemy Balance',
    description: 'Increase enemies spawned each wave, cash earned per kill increased by %{value}',
    rarity: 'Common',
    stats: ["x 1.30", "x 1.40", "x 1.50", "x 1.60", "x 1.70", "x 1.80", "x 1.90"]
  },
  {
    id: 'extraDefense',
    name: 'Extra Defense',
    description: 'Increase defense percent by %{value}',
    rarity: 'Common',
    stats: ["+ 5%", "+ 6%", "+ 7%", "+ 8%", "+ 9%", "+ 10%", "+ 11%"]
  },
  {
    id: 'fortress',
    name: 'Fortress',
    description: 'Defense Absolute %{value}',
    rarity: 'Common',
    stats: ["x 1.30", "x 1.45", "x 1.60", "x 1.75", "x 1.90", "x 2.05", "x 2.20"]
  },
  {
    id: 'freeUpgrades',
    name: 'Free Upgrades',
    description: 'Increases all free upgrade chances per wave by %{value}',
    rarity: 'Rare',
    stats: ["4%", "5%", "6%", "7%", "8%", "9%", "10%"]
  },
  {
    id: 'extraOrb',
    name: 'Extra Orb',
    description: 'A spinning orb with a speed of %{value} that destroys enemies on contact (except bosses)',
    rarity: 'Rare',
    stats: [".30", ".40", ".50", ".60", ".70", ".80", ".90"]
  },
  {
    id: 'plasmaCannon',
    name: 'Plasma Cannon',
    description: 'Fire one big plasma shot at a boss dropping its health by %{value}',
    rarity: 'Rare',
    stats: ["30%", "34%", "38%", "42%", "46%", "50%", "54%"]
  },
  {
    id: 'criticalCoin',
    name: 'Critical Coin',
    description: 'Basic enemies destroyed by critical damage have a chance of dropping coins of %{value}',
    rarity: 'Rare',
    stats: ["15%", "18%", "21%", "24%", "27%", "30%", "33%"]
  },
  {
    id: 'waveSkip',
    name: 'Wave Skip',
    description: 'Gain a %{value} chance of skipping waves while still earning cash and coins equal to x1.10 the value of the wave enemies',
    rarity: 'Rare',
    stats: ["9%", "10%", "11%", "13%", "15%", "17%", "19%"]
  },
  {
    id: 'introSprint',
    name: 'Intro Sprint',
    description: 'Waves increment by 10 for the first %{value} waves or up to your highest wave. A boss spawns every wave, and no coins are earned during Intro Sprint',
    rarity: 'Rare',
    stats: ["20", "30", "40", "50", "60", "80", "100"]
  },
  {
    id: 'landMineStun',
    name: 'Land Mine Stun',
    description: 'Land mines have 40% chance of stunning enemies for %{value} (except boss)',
    rarity: 'Rare',
    stats: ["1.5 sec", "1.8 sec", "2.2 sec", "2.6 sec", "3.0 sec", "3.4 sec", "3.8 sec"]
  },
  {
    id: 'recoveryPackageChance',
    name: 'Recovery Package Chance',
    description: 'Increase recovery package spawn chance by %{value}',
    rarity: 'Rare',
    stats: ["15%", "18%", "21%", "24%", "27%", "30%", "33%"]
  },
  {
    id: 'deathRay',
    name: 'Death Ray',
    description: 'A powerful ray that destroys enemies on contact (except bosses), with a duration of %{value}',
    rarity: 'Epic',
    stats: ["2.3 sec", "2.7 sec", "3.1 sec", "3.5 sec", "3.9 sec", "4.4 sec", "4.9 sec"]
  },
  {
    id: 'energyNet',
    name: 'Energy Net',
    description: 'Fire a special net at a boss immobilizing it for %{value}',
    rarity: 'Epic',
    stats: ["2.5 sec", "2.8 sec", "3.1 sec", "3.4 sec", "3.7 sec", "4.0 sec", "4.3 sec"]
  },
  {
    id: 'superTower',
    name: 'Super Tower',
    description: 'The tower becomes super for 15 sec, tower projectile damage increased by %{value} (30 sec cooldown)',
    rarity: 'Epic',
    stats: ["x 2.50", "x 2.90", "x 3.30", "x 3.70", "x 4.10", "x 4.50", "x 5.00"]
  },
  {
    id: 'secondWind',
    name: 'Second Wind',
    description: 'Revive the tower with half health once per round and creates an invincible shield for %{value} sec',
    rarity: 'Epic',
    stats: ["10 sec", "15 sec", "20 sec", "25 sec", "30 sec", "35 sec", "40 sec"]
  },
  {
    id: 'demonMode',
    name: 'Demon Mode',
    description: 'Once per round, activate Demon mode, increasing the damage by x3 and becoming invincible for %{value}',
    rarity: 'Epic',
    stats: ["180 sec", "200 sec", "220 sec", "240 sec", "260 sec", "280 sec", "300 sec"]
  },
  {
    id: 'energyShield',
    name: 'Energy Shield',
    description: 'Shield that ignores a single attack, replenishes after %{value}',
    rarity: 'Epic',
    stats: ["20 min", "18 min", "16 min", "14 min", "12 min", "10 min", "8 min"]
  },
  {
    id: 'waveAccelerator',
    name: 'Wave Accelerator',
    description: 'Reduces the wave cooldown timer by %{value} <VERIFY>',
    rarity: 'Epic',
    stats: ["10 sec", "12 sec", "14 sec", "16 sec", "18 sec", "20 sec", "22 sec"]
  },
  {
    id: 'berserker',
    name: 'Berserker',
    description: 'Increase damage by %{value} of total damage absorbed this round (max of x8 tower damage)',
    rarity: 'Epic',
    stats: ["0.8%", "0.9%", "1.0%", "1.1%", "1.2%", "1.3%", "1.4%"]
  },
  {
    id: 'nuke',
    name: 'Nuke',
    description: 'Destroy %{value} enemies',
    rarity: 'Epic',
    stats: ['25%', '35%', '45%', '55%', '65%', '80%', '100%']
  }
];

// Add CardDataMap for quick lookup by id
export const CardDataMap: Record<string, Card> = CardData.reduce((map, card) => {
  map[card.id] = card;
  return map;
}, {} as Record<string, Card>);

export const CardLevels = {
  0: 0,
  1: 1,
  2: 4,
  3: 9,
  4: 17,
  5: 29,
  6: 49,
  7: 81,
}

export const CardAmounts = {
  0: 1,
  1: 3,
  2: 5,
  3: 8,
  4: 12,
  5: 20,
  6: 32,
}