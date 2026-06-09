import { Calendar, Target, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { useApp } from '../../AppContext';

export const MobileDashboard = () => {
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
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3" data-tutorial="dashboard-summary">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] text-gray-400 uppercase font-black">Saldo</span>
          </div>
          <p className="text-2xl font-bold text-white mb-1 truncate">{formatCurrency(balance)}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
          <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Receitas</p>
          <p className="text-lg font-bold text-green-400 truncate">{formatCurrency(totalIncome)}</p>
        </div>

        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
          <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Despesas</p>
          <p className="text-lg font-bold text-red-400 truncate">{formatCurrency(totalExpense)}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-cyan-400" />
          Últimas Transações
        </h3>

        <div className="space-y-2">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-3 p-3 bg-gray-900 rounded-lg border border-gray-700"
            >
              <div className="min-w-0 flex-1">
                <p className="font-bold text-white text-xs truncate">{transaction.description}</p>
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter">
                  {transaction.category} • {formatDate(transaction.date)}
                </p>
              </div>
              <p className={`text-sm font-black shrink-0 ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-lg">
        <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-amber-400" />
          Metas Próximas
        </h3>

        <div className="space-y-3">
          {goals.slice(0, 2).map((goal) => {
            const progress = Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
            return (
              <div key={goal.id} className="p-3 bg-gray-900 rounded-lg border border-gray-700">
                <div className="flex justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-white truncate pr-2">{goal.title}</span>
                  <span className="text-[10px] font-black text-amber-400">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
