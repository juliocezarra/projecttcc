import { useState } from 'react';
import { Plus, TrendingDown, TrendingUp, Filter } from 'lucide-react';
import { useApp } from '../../AppContext';

export const MobileTransactions = () => {
  const { transactions, addTransaction } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [formData, setFormData] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    description: '',
    category: '',
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!formData.amount || !formData.description || !formData.category) return;

    addTransaction({
      type: formData.type,
      amount: Number(formData.amount),
      description: formData.description,
      category: formData.category,
    });

    setFormData({ type: 'expense', amount: '', description: '', category: '' });
    setShowForm(false);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' }).format(date);
  };

  const filtered = transactions.filter((t) => filterType === 'all' ? true : t.type === filterType);

  return (
    <div className="space-y-4 pb-12">
      <div className="flex justify-between items-center gap-2">
        <div className="flex bg-gray-800 rounded-lg p-1 border border-gray-700 flex-1">
          {['all', 'income', 'expense'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t as any)}
              className={`flex-1 py-1.5 rounded-md text-[10px] font-black uppercase transition-all ${
                filterType === t ? 'bg-cyan-600 text-white' : 'text-gray-500'
              }`}
            >
              {t === 'all' ? 'Tudo' : t === 'income' ? 'Ganhos' : 'Gastos'}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-10 h-10 bg-cyan-600 text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-4 animate-slide-down">
           <div className="grid grid-cols-2 gap-3">
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none"
              >
                <option value="expense">Despesa</option>
                <option value="income">Receita</option>
              </select>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                placeholder="Valor"
                className="bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none"
                required
              />
           </div>
           <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descrição"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none"
              required
           />
           <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Categoria"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none"
              required
           />
           <div className="flex gap-2">
              <button type="submit" className="flex-1 bg-cyan-600 text-white font-bold py-2 rounded-lg text-xs uppercase">Salvar</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 bg-gray-700 text-white py-2 rounded-lg text-xs">X</button>
           </div>
        </form>
      )}

      <div className="space-y-2" data-tutorial="transactions-list">
        {filtered.map((t) => (
          <div key={t.id} className="bg-gray-800 p-3 rounded-xl border border-gray-700 flex justify-between items-center gap-3">
            <div className="min-w-0">
              <p className="text-white text-xs font-bold truncate">{t.description}</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase">{t.category} • {formatDate(t.date)}</p>
            </div>
            <p className={`text-sm font-black shrink-0 ${t.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
              {t.type === 'income' ? '+' : '-'} {formatCurrency(t.amount)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
