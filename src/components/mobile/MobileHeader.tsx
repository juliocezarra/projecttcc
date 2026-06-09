import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../AppContext';
import { CharacterAvatar } from '../CharacterAvatar';

export const MobileHeader = () => {
  const { userProfile, currentView, character } = useApp();
  const [shimmerKey, setShimmerKey] = useState(0);
  const xpPercentage = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  useEffect(() => {
    setShimmerKey((prev) => prev + 1);
  }, [currentView]);

  return (
    <div className="bg-gray-900 border-b border-gray-800 p-4 sticky top-0 z-30">
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 min-w-0" data-tutorial="header-profile">
          <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30">
            <CharacterAvatar character={character} size="mini" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-white truncate">{userProfile.name}</h2>
            <p className="text-gray-400 text-[10px] truncate uppercase tracking-tighter font-bold">Nível {userProfile.level}</p>
          </div>
        </div>

        <div className="flex items-center gap-4" data-tutorial="header-stats">
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black">🔥</p>
            <p className="text-sm font-bold text-amber-400">{userProfile.streak}d</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-gray-500 uppercase font-black">💰</p>
            <p className="text-sm font-bold text-white">{userProfile.coins}</p>
          </div>
        </div>
      </div>

      <div className="relative h-1.5 bg-gray-700 rounded-full overflow-hidden" data-tutorial="header-level">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${xpPercentage}%` }}
        />
        <div
          key={shimmerKey}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer-once pointer-events-none"
        />
      </div>
    </div>
  );
};
