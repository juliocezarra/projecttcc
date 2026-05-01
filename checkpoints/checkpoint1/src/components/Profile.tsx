import { User, TrendingUp, Zap, Calendar, Award, Sparkles, ShoppingBag, Shirt } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';
import { CharacterAvatar } from './CharacterAvatar';
import { Shop } from './Shop';
import { Wardrobe } from './Wardrobe';

export const Profile = () => {
  const { userProfile, transactions, missions, badges, character } = useApp();
  const [activeTab, setActiveTab] = useState<'stats' | 'shop' | 'wardrobe'>('stats');

  const completedMissions = missions.filter((m) => m.completed).length;
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  const totalIncome = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const stats = [
    {
      label: 'Nível Atual',
      value: userProfile.level,
      icon: TrendingUp,
      bgColor: 'bg-cyan-500/20',
      textColor: 'text-cyan-400',
    },
    {
      label: 'XP Total',
      value: `${userProfile.xp}/${userProfile.xpToNextLevel}`,
      icon: Sparkles,
      bgColor: 'bg-blue-500/20',
      textColor: 'text-blue-400',
    },
    {
      label: 'Sequência',
      value: `${userProfile.streak} dias`,
      icon: Zap,
      bgColor: 'bg-amber-500/20',
      textColor: 'text-amber-400',
    },
    {
      label: 'Transações',
      value: userProfile.totalTransactions,
      icon: Calendar,
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-400',
    },
    {
      label: 'Missões Completas',
      value: completedMissions,
      icon: Award,
      bgColor: 'bg-purple-500/20',
      textColor: 'text-purple-400',
    },
    {
      label: 'Badges Desbloqueados',
      value: unlockedBadges,
      icon: Award,
      bgColor: 'bg-rose-500/20',
      textColor: 'text-rose-400',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 border border-gray-700 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-start mb-8">
          <div className="flex justify-center sm:justify-start">
            <CharacterAvatar character={character} size="large" />
          </div>

          <div className="sm:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-3">{userProfile.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full">
                <span className="text-sm font-bold text-white">Nível {userProfile.level}</span>
              </div>
              <div className="px-3 py-1 bg-amber-600/20 rounded-full">
                <span className="text-sm font-bold text-amber-400">
                  {userProfile.streak} dias de sequência 🔥
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Progresso para o próximo nível</span>
                <span className="text-white font-semibold">
                  {userProfile.xp} / {userProfile.xpToNextLevel} XP
                </span>
              </div>
              <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full transition-all duration-500 shadow-lg shadow-cyan-500/50"
                  style={{ width: `${(userProfile.xp / userProfile.xpToNextLevel) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 border-t border-gray-700 pt-6">
          <button
            onClick={() => setActiveTab('stats')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                activeTab === 'stats'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <Award className="w-4 h-4" />
            Estatísticas
          </button>
          <button
            onClick={() => setActiveTab('shop')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                activeTab === 'shop'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <ShoppingBag className="w-4 h-4" />
            Loja
          </button>
          <button
            onClick={() => setActiveTab('wardrobe')}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
              ${
                activeTab === 'wardrobe'
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }
            `}
          >
            <Shirt className="w-4 h-4" />
            Guarda-roupa
          </button>
        </div>
      </div>

      {activeTab === 'stats' && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.textColor}`} />
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Resumo Financeiro
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg">
                  <span className="text-gray-300">Total em Receitas</span>
                  <span className="text-lg font-bold text-green-400">{formatCurrency(totalIncome)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg">
                  <span className="text-gray-300">Total em Despesas</span>
                  <span className="text-lg font-bold text-red-400">{formatCurrency(totalExpense)}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-cyan-500/10 rounded-lg">
                  <span className="text-gray-300">Saldo</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {formatCurrency(totalIncome - totalExpense)}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Conquistas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <span className="text-gray-300">Missões Completadas</span>
                  <span className="text-lg font-bold text-white">
                    {completedMissions}/{missions.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <span className="text-gray-300">Badges Desbloqueados</span>
                  <span className="text-lg font-bold text-white">
                    {unlockedBadges}/{badges.length}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900 rounded-lg">
                  <span className="text-gray-300">Taxa de Conclusão</span>
                  <span className="text-lg font-bold text-cyan-400">
                    {Math.round((completedMissions / missions.length) * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'shop' && <Shop />}
      {activeTab === 'wardrobe' && <Wardrobe />}
    </div>
  );
};
