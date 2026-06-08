import { createContext, useCallback, useContext, useState, ReactNode } from 'react';
import { Transaction, Mission, Badge, UserProfile, Character, ClothingItem, FinancialGoal } from './types';
import {
  initialTransactions,
  initialMissions,
  initialBadges,
  initialUserProfile,
  initialCharacter,
  initialGoals,
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
  goals: FinancialGoal[];
  userProfile: UserProfile;
  toasts: Toast[];
  currentView: string;
  character: Character;
  ownedItems: Set<string>;
  availableClothing: ClothingItem[];
  onboardingStep: 'name' | 'tutorial' | 'completed';
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  setCurrentView: (view: string) => void;
  removeToast: (id: string) => void;
  buyItem: (itemId: string) => boolean;
  equipItem: (itemId: string, category: string) => void;
  addGoal: (goal: Omit<FinancialGoal, 'id' | 'currentAmount' | 'completed'>) => void;
  contributeToGoal: (goalId: string, amount: number) => void;
  updateUserName: (name: string) => void;
  setOnboardingStep: (step: 'name' | 'tutorial' | 'completed') => void;
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
  const [goals, setGoals] = useState<FinancialGoal[]>(initialGoals);
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const savedName = localStorage.getItem('gamifinance_user_name');
    if (savedName) {
      return { ...initialUserProfile, name: savedName };
    }
    return initialUserProfile;
  });
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [currentView, setCurrentView] = useState('dashboard');
  const [character, setCharacter] = useState<Character>(initialCharacter);
  const [ownedItems, setOwnedItems] = useState<Set<string>>(
    new Set(['head-1', 'shirt-1', 'pants-1', 'feet-1'])
  );
  const [onboardingStep, setOnboardingStepState] = useState<'name' | 'tutorial' | 'completed'>(() => {
    const saved = localStorage.getItem('gamifinance_onboarding');
    return (saved as any) || 'name';
  });

  const setOnboardingStep = useCallback((step: 'name' | 'tutorial' | 'completed') => {
    setOnboardingStepState(step);
    localStorage.setItem('gamifinance_onboarding', step);
  }, []);

  const updateUserName = useCallback((name: string) => {
    setUserProfile((prev) => ({ ...prev, name }));
    localStorage.setItem('gamifinance_user_name', name);
  }, []);

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

  const unlockBadge = useCallback(
    (badgeId: string) => {
      setBadges((prev) =>
        prev.map((badge) => {
          if (badge.id !== badgeId || badge.unlocked) return badge;
          addToast(`Conquista desbloqueada: ${badge.name}`, 'success');
          return { ...badge, unlocked: true };
        })
      );
    },
    [addToast]
  );

  const gainXP = useCallback(
    (amount: number) => {
      setUserProfile((prev) => {
        const newXP = prev.xp + amount;

        if (newXP >= prev.xpToNextLevel) {
          const newLevel = prev.level + 1;
          const remainingXP = newXP - prev.xpToNextLevel;

          addToast(`Nível ${newLevel} alcançado!`, 'levelup');
          if (newLevel >= 10) unlockBadge('4');

          return {
            ...prev,
            level: newLevel,
            xp: remainingXP,
            xpToNextLevel: 100 + newLevel * 20,
          };
        }

        return { ...prev, xp: newXP };
      });
    },
    [addToast, unlockBadge]
  );

  const updateMissions = useCallback(
    (newTransaction: Transaction) => {
      setMissions((prev) =>
        prev.map((mission) => {
          if (mission.completed) return mission;

          if (mission.id === '2' && newTransaction.type === 'income') {
            const newProgress = Math.min(mission.progress + newTransaction.amount, mission.target);
            const completed = newProgress >= mission.target;

            if (completed) {
              addToast(`Missão completa: ${mission.title} (+${mission.xpReward} XP)`, 'success');
              gainXP(mission.xpReward);
              unlockBadge('2');
            }

            return { ...mission, progress: newProgress, completed };
          }

          if (mission.id === '3') {
            const newProgress = Math.min(mission.progress + 1, mission.target);
            const completed = newProgress >= mission.target;

            if (completed) {
              addToast(`Missão completa: ${mission.title} (+${mission.xpReward} XP)`, 'success');
              gainXP(mission.xpReward);
              unlockBadge('3');
            }

            return { ...mission, progress: newProgress, completed };
          }

          if (mission.id === '4') {
            const newProgress = mission.progress + 1;
            const completed = newProgress >= mission.target;

            if (completed) {
              addToast(`Missão completa: ${mission.title} (+${mission.xpReward} XP)`, 'success');
              gainXP(mission.xpReward);
            }

            return { ...mission, progress: newProgress, completed };
          }

          return mission;
        })
      );
    },
    [addToast, gainXP, unlockBadge]
  );

  const addTransaction = useCallback(
    (transaction: Omit<Transaction, 'id' | 'date'>) => {
      const newTransaction: Transaction = {
        ...transaction,
        id: Math.random().toString(36).substring(7),
        date: new Date(),
      };

      setTransactions((prev) => [newTransaction, ...prev]);
      setUserProfile((prev) => {
        const incomeCoins =
          newTransaction.type === 'income' ? Math.max(25, Math.round(newTransaction.amount * 0.03)) : 0;

        if (incomeCoins > 0) {
          addToast(`+${incomeCoins} moedas pela receita registrada`, 'success');
        }

        return {
          ...prev,
          totalTransactions: prev.totalTransactions + 1,
          coins: prev.coins + incomeCoins,
        };
      });

      const incomeCount = transactions.filter((t) => t.type === 'income').length + (newTransaction.type === 'income' ? 1 : 0);
      if (incomeCount >= 3) unlockBadge('5');

      const xpGained = 10;
      addToast(`+${xpGained} XP ganhos`, 'xp');
      gainXP(xpGained);
      updateMissions(newTransaction);
    },
    [addToast, gainXP, transactions, unlockBadge, updateMissions]
  );

  const buyItem = useCallback(
    (itemId: string): boolean => {
      const item = clothingItems.find((c) => c.id === itemId);
      if (!item || ownedItems.has(itemId)) {
        return false;
      }

      if (userProfile.coins >= item.price) {
        setUserProfile((prev) => ({
          ...prev,
          coins: prev.coins - item.price,
        }));
        setOwnedItems((prev) => {
          const next = new Set([...prev, itemId]);
          if (next.size >= 5) unlockBadge('7');
          return next;
        });
        addToast(`${item.name} adquirido!`, 'success');
        return true;
      }

      addToast('Moedas insuficientes!', 'error');
      return false;
    },
    [addToast, ownedItems, unlockBadge, userProfile.coins]
  );

  const equipItem = useCallback(
    (itemId: string, category: string) => {
      if (!ownedItems.has(itemId)) return;

      setCharacter((prev) => ({
        ...prev,
        [category]: itemId,
      }));

      const item = clothingItems.find((c) => c.id === itemId);
      addToast(`Equipado: ${item?.name}`, 'success');
    },
    [addToast, ownedItems]
  );

  const addGoal = useCallback(
    (goal: Omit<FinancialGoal, 'id' | 'currentAmount' | 'completed'>) => {
      setGoals((prev) => [
        {
          ...goal,
          id: Math.random().toString(36).substring(7),
          currentAmount: 0,
          completed: false,
        },
        ...prev,
      ]);
      unlockBadge('6');
      addToast('Meta financeira criada', 'success');
    },
    [addToast, unlockBadge]
  );

  const contributeToGoal = useCallback(
    (goalId: string, amount: number) => {
      if (amount <= 0) return;

      setGoals((prev) =>
        prev.map((goal) => {
          if (goal.id !== goalId || goal.completed) return goal;

          const currentAmount = Math.min(goal.currentAmount + amount, goal.targetAmount);
          const completed = currentAmount >= goal.targetAmount;

          if (completed) {
            setUserProfile((profile) => ({
              ...profile,
              coins: profile.coins + goal.rewardCoins,
            }));
            gainXP(60);
            unlockBadge('8');
            addToast(`Meta concluída: ${goal.title} (+${goal.rewardCoins} moedas)`, 'success');
          }

          return { ...goal, currentAmount, completed };
        })
      );
    },
    [addToast, gainXP, unlockBadge]
  );

  return (
    <AppContext.Provider
      value={{
        transactions,
        missions,
        badges,
        goals,
        userProfile,
        toasts,
        currentView,
        character,
        ownedItems,
        availableClothing: clothingItems,
        onboardingStep,
        addTransaction,
        setCurrentView,
        removeToast,
        buyItem,
        equipItem,
        addGoal,
        contributeToGoal,
        updateUserName,
        setOnboardingStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
