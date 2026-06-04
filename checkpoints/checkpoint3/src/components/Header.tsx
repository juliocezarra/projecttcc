import { User, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';

export const Header = () => {
  const { userProfile } = useApp();
  const xpPercentage = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <User className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{userProfile.name}</h2>
              <p className="text-gray-400 text-sm">Seja bem-vindo de volta!</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-6">
            <div className="text-right">
              <p className="text-gray-400 text-sm">Sequência</p>
              <p className="text-xl font-bold text-amber-400">{userProfile.streak} dias 🔥</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">Transações</p>
              <p className="text-xl font-bold text-white">{userProfile.totalTransactions}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span className="text-white font-semibold">Nível {userProfile.level}</span>
            </div>
            <span className="text-gray-400 text-sm">
              {userProfile.xp} / {userProfile.xpToNextLevel} XP
            </span>
          </div>

          <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 ease-out shadow-lg shadow-cyan-500/50"
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
