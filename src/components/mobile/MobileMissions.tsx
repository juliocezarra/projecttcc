import { Target, CheckCircle, Sparkles, Award, Lock } from 'lucide-react';
import { useApp } from '../../AppContext';
import { Trophy, PiggyBank, CalendarCheck, Crown, Briefcase, ShoppingBag, BadgeCheck } from 'lucide-react';

const badgeIcons = {
  trophy: Trophy,
  'piggy-bank': PiggyBank,
  'calendar-check': CalendarCheck,
  crown: Crown,
  briefcase: Briefcase,
  target: Target,
  'shopping-bag': ShoppingBag,
  'badge-check': BadgeCheck,
};

export const MobileMissions = () => {
  const { missions, badges } = useApp();

  return (
    <div className="space-y-4 pb-12">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg" data-tutorial="missions-list">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
          <Target className="w-4 h-4 text-cyan-400" />
          Missões Ativas
        </h3>

        <div className="space-y-3">
          {missions.map((m) => {
            const progress = Math.min((m.progress / m.target) * 100, 100);
            return (
              <div key={m.id} className={`p-3 rounded-lg border ${m.completed ? 'bg-green-900/20 border-green-800' : 'bg-gray-900 border-gray-700'}`}>
                <div className="flex justify-between items-start mb-2 gap-2">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{m.title}</p>
                    <p className="text-[10px] text-gray-500 line-clamp-1">{m.description}</p>
                  </div>
                  <span className="text-[10px] font-black text-cyan-400 shrink-0">+{m.xpReward} XP</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.completed ? 'bg-green-500' : 'bg-cyan-500'}`} style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
         <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4 uppercase tracking-wider">
          <Award className="w-4 h-4 text-amber-400" />
          Conquistas
        </h3>
        <div className="grid grid-cols-3 gap-3">
          {badges.map((b) => {
            const Icon = badgeIcons[b.icon as keyof typeof badgeIcons] ?? Award;
            return (
              <div key={b.id} className={`relative flex flex-col items-center p-2 rounded-lg border ${b.unlocked ? 'bg-amber-900/10 border-amber-800' : 'bg-gray-900 border-gray-700 opacity-50'}`}>
                {!b.unlocked && <Lock className="absolute top-1 right-1 w-3 h-3 text-gray-600" />}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${b.unlocked ? 'bg-amber-500/20' : 'bg-gray-800'}`}>
                  <Icon className={`w-5 h-5 ${b.unlocked ? 'text-amber-400' : 'text-gray-600'}`} />
                </div>
                <p className="text-[8px] font-bold text-white text-center line-clamp-1 uppercase">{b.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
