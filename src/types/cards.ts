export type Rarity = 'Common' | 'Rare' | 'Epic';

export type Card = {
  id: string;
  name: string;
  description: string;
  rarity: Rarity;
  stats: string[]
};