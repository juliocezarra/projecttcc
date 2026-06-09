import { Award, Zap, Sparkles, TrendingUp, Goal, Calendar } from 'lucide-react';
import { useApp } from '../../AppContext';
import { CharacterAvatar } from '../CharacterAvatar';
import { MobileShop } from './MobileShop';
import { useState } from 'react';

export const MobileProfile = () => {
  const { userProfile, character, badges, goals } = useApp();
  const [tab, setTab] = useState<'stats' | 'shop'>('stats');

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const xpProgress = (userProfile.xp / userProfile.xpToNextLevel) * 100;

  if (tab === 'shop') return (
    <div className="space-y-4">
      <button onClick={() => setTab('stats')} className="text-cyan-400 text-xs font-bold uppercase mb-2">← Voltar para perfil</button>
      <MobileShop />
    </div>
  );

  return (
    <div className="space-y-4 pb-12">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600" />
        
        <div className="flex justify-center mb-2" data-tutorial="profile-avatar">
           <div className="scale-90">
              <CharacterAvatar character={character} size="medium" />
           </div>
        </div>

        <h2 className="text-xl font-bold text-white mb-1">{userProfile.name}</h2>
        
        <div className="flex justify-center gap-2 mb-4">
           <span className="bg-cyan-500/10 text-cyan-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-cyan-500/20">Nível {userProfile.level}</span>
           <span className="bg-amber-500/10 text-amber-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase border border-amber-500/20">{userProfile.streak}d Fogo 🔥</span>
        </div>

        <div className="space-y-1 mb-4">
           <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-tighter">
              <span>Progresso XP</span>
              <span>{userProfile.xp}/{userProfile.xpToNextLevel}</span>
           </div>
           <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: `${xpProgress}%` }} />
           </div>
        </div>

        <button onClick={() => setTab('shop')} className="w-full bg-cyan-600 text-white font-black py-2 rounded-lg text-xs uppercase shadow-lg shadow-cyan-500/20">Customizar Avatar</button>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
               <Award className="w-4 h-4 text-amber-400" />
            </div>
            <div className="min-w-0">
               <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Conquistas</p>
               <p className="text-sm font-black text-white">{unlockedCount}/{badges.length}</p>
            </div>
         </div>
         <div className="bg-gray-800 p-3 rounded-xl border border-gray-700 flex items-center gap-3">
            <div className="w-8 h-8 bg-rose-500/10 rounded-lg flex items-center justify-center shrink-0">
               <Goal className="w-4 h-4 text-rose-400" />
            </div>
            <div className="min-w-0">
               <p className="text-[10px] text-gray-500 font-bold uppercase truncate">Metas OK</p>
               <p className="text-sm font-black text-white">{goals.filter(g => g.completed).length}</p>
            </div>
         </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
         <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Galeria de Medalhas</h3>
         <div className="grid grid-cols-5 gap-2">
            {badges.map(b => (
              <div key={b.id} className={`aspect-square rounded-lg flex items-center justify-center border ${b.unlocked ? 'bg-amber-500/10 border-amber-500/30' : 'bg-gray-900 border-gray-800 opacity-30'}`}>
                 <Award className={`w-5 h-5 ${b.unlocked ? 'text-amber-400' : 'text-gray-700'}`} />
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};
