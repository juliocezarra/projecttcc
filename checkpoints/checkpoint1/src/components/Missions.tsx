import { Target, Trophy, Award, Lock, CheckCircle, Sparkles } from 'lucide-react';
import { useApp } from '../AppContext';
import * as LucideIcons from 'lucide-react';

export const Missions = () => {
  const { missions, badges } = useApp();

  const completedMissions = missions.filter((m) => m.completed).length;
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white">Missões</h2>
        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg">
            <p className="text-sm text-white/80">Completadas</p>
            <p className="text-xl font-bold text-white">
              {completedMissions}/{missions.length}
            </p>
          </div>
          <div className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg">
            <p className="text-sm text-white/80">Badges</p>
            <p className="text-xl font-bold text-white">
              {unlockedBadges}/{badges.length}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Target className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Desafios Ativos</h3>
        </div>

        <div className="space-y-4">
          {missions.map((mission) => {
            const progress = Math.min((mission.progress / mission.target) * 100, 100);

            return (
              <div
                key={mission.id}
                className={`
                  p-5 rounded-lg border transition-all duration-200
                  ${
                    mission.completed
                      ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-700'
                      : 'bg-gray-900 border-gray-700 hover:border-gray-600'
                  }
                `}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-semibold text-white">{mission.title}</h4>
                      {mission.completed && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{mission.description}</p>
                  </div>
                  <div className="flex items-center gap-1 px-3 py-1 bg-cyan-500/20 rounded-full">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm font-bold text-cyan-400">+{mission.xpReward} XP</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Progresso</span>
                    <span className="text-white font-semibold">
                      {mission.progress} / {mission.target}
                    </span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`
                        absolute inset-y-0 left-0 rounded-full transition-all duration-500
                        ${
                          mission.completed
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                        }
                      `}
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
        <div className="flex items-center gap-2 mb-6">
          <Award className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white">Coleção de Badges</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const IconComponent = LucideIcons[badge.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

            return (
              <div
                key={badge.id}
                className={`
                  relative p-4 rounded-lg border transition-all duration-200
                  ${
                    badge.unlocked
                      ? 'bg-gradient-to-br from-amber-900/30 to-orange-900/30 border-amber-700 hover:shadow-lg hover:shadow-amber-500/20'
                      : 'bg-gray-900 border-gray-700 opacity-60'
                  }
                `}
              >
                {!badge.unlocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg backdrop-blur-sm">
                    <Lock className="w-8 h-8 text-gray-400" />
                  </div>
                )}

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`
                      w-16 h-16 rounded-full flex items-center justify-center mb-3
                      ${
                        badge.unlocked
                          ? 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-lg shadow-amber-500/30'
                          : 'bg-gray-700'
                      }
                    `}
                  >
                    {IconComponent && (
                      <IconComponent className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <h4 className="font-semibold text-white mb-1">{badge.name}</h4>
                  <p className="text-xs text-gray-400">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
