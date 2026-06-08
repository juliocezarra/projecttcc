import { Calendar, Target, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useApp } from '../AppContext';

export const Dashboard = () => {
  const { transactions, goals } = useApp();

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthlyTransactions = transactions.filter(
    (t) => t.date.getMonth() === currentMonth && t.date.getFullYear() === currentYear
  );

  const totalIncome = monthlyTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = monthlyTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpense;
  const totalGoalProgress = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalGoalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const goalProgress = totalGoalTarget > 0 ? Math.round((totalGoalProgress / totalGoalTarget) * 100) : 0;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Saldo Atual</span>
          </div>
          <p className="text-3xl font-bold text-white mb-1">{formatCurrency(balance)}</p>
          <p className="text-sm text-gray-400">Receitas - despesas</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/30">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Receitas</span>
          </div>
          <p className="text-3xl font-bold text-green-400 mb-1">{formatCurrency(totalIncome)}</p>
          <p className="text-sm text-gray-400">Este mês</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
              <TrendingDown className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Despesas</span>
          </div>
          <p className="text-3xl font-bold text-red-400 mb-1">{formatCurrency(totalExpense)}</p>
          <p className="text-sm text-gray-400">Este mês</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/30">
              <Target className="w-6 h-6 text-white" />
            </div>
            <span className="text-xs text-gray-400 uppercase tracking-wider">Metas</span>
          </div>
          <p className="text-3xl font-bold text-amber-400 mb-1">{goalProgress}%</p>
          <p className="text-sm text-gray-400">{goals.length} metas ativas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-cyan-400" />
              Últimas Transações
            </h3>
            <span className="text-sm text-gray-400">{transactions.length} registros</span>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 8).map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between gap-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      transaction.type === 'income'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {transaction.type === 'income' ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{transaction.description}</p>
                    <p className="text-sm text-gray-400">
                      {transaction.category} • {formatDate(transaction.date)}
                    </p>
                  </div>
                </div>
                <p
                  className={`text-lg font-bold shrink-0 ${
                    transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </p>
              </div>
            ))}
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>Nenhuma transação registrada ainda.</p>
              <p className="text-sm mt-2">Adicione sua primeira transação para começar.</p>
            </div>
          )}
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 shadow-lg">
          <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
            <Target className="w-5 h-5 text-amber-400" />
            Próximas Metas
          </h3>

          <div className="space-y-4">
            {goals.slice(0, 3).map((goal) => {
              const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);

              return (
                <div key={goal.id} className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="font-semibold text-white truncate">{goal.title}</p>
                    <span className="text-sm text-amber-400 font-bold">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    {formatCurrency(goal.currentAmount)} de {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
