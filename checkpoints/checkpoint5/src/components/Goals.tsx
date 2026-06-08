import { FormEvent, useState } from 'react';
import { Coins, Plus, Target, Trophy } from 'lucide-react';
import { useApp } from '../AppContext';

export const Goals = () => {
  const { goals, addGoal, contributeToGoal } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [contributions, setContributions] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: '',
    targetAmount: '',
    category: '',
    rewardCoins: '250',
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const completedGoals = goals.filter((goal) => goal.completed).length;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const targetAmount = Number(formData.targetAmount);
    const rewardCoins = Number(formData.rewardCoins);

    if (!formData.title || !formData.category || targetAmount <= 0 || rewardCoins <= 0) {
      return;
    }

    addGoal({
      title: formData.title,
      targetAmount,
      category: formData.category,
      rewardCoins,
    });

    setFormData({ title: '', targetAmount: '', category: '', rewardCoins: '250' });
    setShowForm(false);
  };

  const handleContribution = (goalId: string) => {
    const amount = Number(contributions[goalId]);
    if (!amount || amount <= 0) return;

    contributeToGoal(goalId, amount);
    setContributions((prev) => ({ ...prev, [goalId]: '' }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            Metas Financeiras
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Transforme objetivos reais em barras de progresso com recompensa.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg">
            <p className="text-xs text-gray-400">Concluídas</p>
            <p className="text-lg font-bold text-white">
              {completedGoals}/{goals.length}
            </p>
          </div>
          <button
            onClick={() => setShowForm((prev) => !prev)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-200"
          >
            <Plus className="w-5 h-5" />
            Nova Meta
          </button>
        </div>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Nome da meta</label>
            <input
              value={formData.title}
              onChange={(event) => setFormData({ ...formData, title: event.target.value })}
              placeholder="Ex: Notebook para trabalho"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Categoria</label>
            <input
              value={formData.category}
              onChange={(event) => setFormData({ ...formData, category: event.target.value })}
              placeholder="Ex: Equipamentos"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Valor alvo</label>
            <input
              type="number"
              min="1"
              step="0.01"
              value={formData.targetAmount}
              onChange={(event) => setFormData({ ...formData, targetAmount: event.target.value })}
              placeholder="0,00"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Recompensa em moedas</label>
            <input
              type="number"
              min="1"
              value={formData.rewardCoins}
              onChange={(event) => setFormData({ ...formData, rewardCoins: event.target.value })}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              required
            />
          </div>

          <div className="md:col-span-2 flex gap-3">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-200"
            >
              Criar Meta
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {goals.map((goal) => {
          const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

          return (
            <div
              key={goal.id}
              className={`rounded-xl p-6 border shadow-lg transition-all duration-200 ${
                goal.completed
                  ? 'bg-gradient-to-br from-green-900/30 to-emerald-900/20 border-green-700'
                  : 'bg-gray-800 border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-sm text-cyan-400 font-semibold">{goal.category}</p>
                  <h3 className="text-xl font-bold text-white mt-1">{goal.title}</h3>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 rounded-full">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-bold text-amber-400">+{goal.rewardCoins}</span>
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">{formatCurrency(goal.currentAmount)}</span>
                  <span className="text-white font-semibold">{formatCurrency(goal.targetAmount)}</span>
                </div>
                <div className="relative h-4 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                      goal.completed
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-right text-sm text-gray-400">{Math.round(progress)}%</p>
              </div>

              {goal.completed ? (
                <div className="flex items-center justify-center gap-2 py-3 bg-green-500/15 border border-green-700 rounded-lg text-green-300 font-semibold">
                  <Trophy className="w-5 h-5" />
                  Meta concluída
                </div>
              ) : (
                <div className="flex gap-3">
                  <input
                    type="number"
                    min="1"
                    step="0.01"
                    value={contributions[goal.id] ?? ''}
                    onChange={(event) =>
                      setContributions((prev) => ({ ...prev, [goal.id]: event.target.value }))
                    }
                    placeholder="Adicionar valor"
                    className="min-w-0 flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                  />
                  <button
                    onClick={() => handleContribution(goal.id)}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Aportar
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
