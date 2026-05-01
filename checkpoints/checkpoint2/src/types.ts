export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  xpReward: number;
  completed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

export interface UserProfile {
  name: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalTransactions: number;
  streak: number;
  coins: number;
}

export type ClothingCategory = 'head' | 'shirt' | 'pants' | 'feet';

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  price: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  emoji: string;
}

export interface InventoryItem {
  itemId: string;
  owned: boolean;
  equippedIn: ClothingCategory;
}

export interface Character {
  head: string | null;
  shirt: string | null;
  pants: string | null;
  feet: string | null;
}
