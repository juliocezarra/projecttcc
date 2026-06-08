import { useState } from 'react';
import { Target, Plus, Coins, Trophy } from 'lucide-react';
import { useApp } from '../../AppContext';

export const MobileGoals = () => {
  const { goals, addGoal, contributeToGoal } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [val, setVal] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({ title: '', target: '', category: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.target) return;
    addGoal({
      title: formData.title,
      targetAmount: Number(formData.target),
      category: formData.category || 'Geral',
      rewardCoins: 250,
    });
    setFormData({ title: '', target: '', category: '' });
    setShowForm(false);
  };

  const format = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

  return (
    <div className="space-y-4 pb-12">
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-rose-400" />
          <span className="font-bold text-white text-sm">Metas</span>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="bg-rose-500 text-white p-1.5 rounded-lg shadow-lg">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-3">
          <input value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="O que você quer comprar?" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none" required />
          <input type="number" value={formData.target} onChange={e => setFormData({...formData, target: e.target.value})} placeholder="Valor Alvo (Ex: 1500)" className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-xs outline-none" required />
          <button type="submit" className="w-full bg-rose-600 text-white font-black py-2 rounded-lg text-xs uppercase">Criar Meta</button>
        </form>
      )}

      <div className="space-y-3">
        {goals.map(g => {
          const p = Math.min((g.currentAmount / g.targetAmount) * 100, 100);
          return (
            <div key={g.id} className={`p-4 rounded-xl border-2 ${g.completed ? 'border-green-800 bg-green-900/10' : 'border-gray-800 bg-gray-800/50'}`}>
               <div className="flex justify-between mb-3">
                  <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{g.category}</span>
                  <span className="text-[10px] font-black text-amber-400">+250💰</span>
               </div>
               <p className="text-white font-bold text-sm mb-3 truncate">{g.title}</p>
               <div className="flex justify-between text-[10px] font-bold text-gray-400 mb-1.5">
                  <span>{format(g.currentAmount)}</span>
                  <span>{format(g.targetAmount)}</span>
               </div>
               <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden mb-4">
                  <div className={`h-full rounded-full ${g.completed ? 'bg-green-500' : 'bg-rose-500'}`} style={{ width: `${p}%` }} />
               </div>
               {!g.completed && (
                 <div className="flex gap-2">
                    <input type="number" value={val[g.id] || ''} onChange={e => setVal({...val, [g.id]: e.target.value})} placeholder="Aportar" className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-2 text-[10px] text-white outline-none" />
                    <button onClick={() => { contributeToGoal(g.id, Number(val[g.id])); setVal({...val, [g.id]: ''}); }} className="bg-gray-700 text-white font-bold px-3 py-1.5 rounded-lg text-[10px] uppercase">OK</button>
                 </div>
               )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
