import { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Transaction, Mission, Badge, UserProfile, Character, ClothingItem } from './types';
import {
  initialTransactions,
  initialMissions,
  initialBadges,
  initialUserProfile,
  initialCharacter,
  clothingItems,
} from './mockData';

interface Toast {
  id: string;
  message: string;
  type: 'xp' | 'levelup' | 'success' | 'error';
}

interface AppContextType {
  transactions: Transaction[];
  missions: Mission[];
  badges: Badge[];
  userProfile: UserProfile;
  toasts: Toast[];
  currentView: string;
  character: Character;
  ownedItems: Set<string>;
  availableClothing: ClothingItem[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  setCurrentView: (view: string) => void;
  removeToast: (id: string) => void;
  buyItem: (itemId: string) => boolean;
  equipItem: (itemId: string, category: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [missions, setMissions] = useState<Mission[]>(initialMissions);
  const [badges, setBadges] = useState<Badge[]>(initialBadges);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [character, setCharacter] = useState<Character>(initialCharacter);
  const [ownedItems, setOwnedItems] = useState<Set<string>>(
    new Set(['head-1', 'shirt-1', 'pants-1', 'feet-1'])
  );

  const addToast = useCallback((message: string, type: Toast['type']) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const gainXP = useCallback((amount: number) => {
    setUserProfile((prev) => {
      const newXP = prev.xp + amount;

      if (newXP >= prev.xpToNextLevel) {
        const newLevel = prev.level + 1;
        const remainingXP = newXP - prev.xpToNextLevel;

        addToast(`🎉 NÍVEL ${newLevel} ALCANÇADO!`, 'levelup');

        return {
          ...prev,
          level: newLevel,
          xp: remainingXP,
          xpToNextLevel: 100 + (newLevel * 20),
        };
      }

      return { ...prev, xp: newXP };
    });
  }, [addToast]);

  const updateMissions = useCallback((newTransaction: Transaction) => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.completed) return mission;

        if (mission.id === '2' && newTransaction.type === 'income') {
          const newProgress = Math.min(mission.progress + newTransaction.amount, mission.target);
          const completed = newProgress >= mission.target;

          if (completed && !mission.completed) {
            addToast(`✨ Missão Completa: ${mission.title} (+${mission.xpReward} XP)`, 'success');
            gainXP(mission.xpReward);
          }

          return { ...mission, progress: newProgress, completed };
        }

        if (mission.id === '4') {
          const newProgress = mission.progress + 1;
          const completed = newProgress >= mission.target;

          if (completed && !mission.completed) {
            addToast(`✨ Missão Completa: ${mission.title} (+${mission.xpReward} XP)`, 'success');
            gainXP(mission.xpReward);
          }

          return { ...mission, progress: newProgress, completed };
        }

        return mission;
      })
    );
  }, [addToast, gainXP]);

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, 'id' | 'date'>) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: Math.random().toString(36).substring(7),
        date: new Date(),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      setUserProfile((prev) => ({
        ...prev,
        totalTransactions: prev.totalTransactions + 1,
      }));

      const xpGained = 10;
      addToast(`+${xpGained} XP Ganhos!`, 'xp');
      gainXP(xpGained);

      updateMissions(newTransaction);
    },
    [addToast, gainXP, updateMissions]
  );

  const buyItem = useCallback((itemId: string): boolean => {
    const item = clothingItems.find((c) => c.id === itemId);
    if (!item || ownedItems.has(itemId)) {
      return false;
    }

    if (userProfile.coins >= item.price) {
      setUserProfile((prev) => ({
        ...prev,
        coins: prev.coins - item.price,
      }));
      setOwnedItems((prev) => new Set([...prev, itemId]));
      addToast(`✨ ${item.name} adquirido!`, 'success');
      return true;
    }

    addToast('Moedas insuficientes!', 'error');
    return false;
  }, [ownedItems, userProfile.coins, addToast]);

  const equipItem = useCallback((itemId: string, category: string) => {
    if (!ownedItems.has(itemId)) return;

    setCharacter((prev) => ({
      ...prev,
      [category]: itemId,
    }));

    const item = clothingItems.find((c) => c.id === itemId);
    addToast(`Equipado: ${item?.name}`, 'success');
  }, [ownedItems, addToast]);

  return (
    <AppContext.Provider
      value={{
        transactions,
        missions,
        badges,
        userProfile,
        toasts,
        currentView,
        character,
        ownedItems,
        availableClothing: clothingItems,
        addTransaction,
        setCurrentView,
        removeToast,
        buyItem,
        equipItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
