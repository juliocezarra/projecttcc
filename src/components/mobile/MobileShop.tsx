import { useState } from 'react';
import { ShoppingBag, Coins, Lock, Check } from 'lucide-react';
import { useApp } from '../../AppContext';
import { ItemPreview } from '../ItemPreview';

export const MobileShop = () => {
  const { userProfile, availableClothing, ownedItems, buyItem, character, equipItem } = useApp();
  const [category, setCategory] = useState<any>('head');

  const categories = [
    { id: 'head', label: 'Cabeça', emoji: '👒' },
    { id: 'shirt', label: 'Roupas', emoji: '👕' },
    { id: 'pants', label: 'Calças', emoji: '👖' },
    { id: 'feet', label: 'Pés', emoji: '👟' },
  ];

  const filtered = availableClothing.filter((i) => i.category === category);

  return (
    <div className="space-y-4 pb-12">
      <div className="flex justify-between items-center bg-gray-800 p-3 rounded-xl border border-gray-700">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white text-sm">Loja</span>
        </div>
        <div className="flex items-center gap-1.5 bg-amber-500/10 px-3 py-1 rounded-full">
          <Coins className="w-4 h-4 text-amber-400" />
          <span className="text-amber-400 font-black text-xs">{userProfile.coins}</span>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
              category === c.id ? 'bg-cyan-600 text-white' : 'bg-gray-800 text-gray-500'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {filtered.map((item) => {
          const owned = ownedItems.has(item.id);
          const equipped = character[category] === item.id;
          return (
            <div key={item.id} className={`p-3 rounded-xl border-2 ${equipped ? 'border-cyan-500 bg-cyan-900/10' : 'border-gray-800 bg-gray-800/50'}`}>
              <div className="aspect-square bg-gray-900 rounded-lg mb-2 flex items-center justify-center">
                <ItemPreview itemId={item.id} size="small" />
              </div>
              <p className="text-[10px] font-bold text-white truncate">{item.name}</p>
              <div className="flex items-center gap-1 mb-2">
                 <Coins className="w-3 h-3 text-amber-400" />
                 <span className="text-[10px] font-black text-amber-400">{item.price}</span>
              </div>
              {owned ? (
                <button
                  disabled={equipped}
                  onClick={() => equipItem(item.id, category)}
                  className={`w-full py-1.5 rounded-lg text-[10px] font-black uppercase ${equipped ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-700 text-white'}`}
                >
                  {equipped ? 'Equipado' : 'Equipar'}
                </button>
              ) : (
                <button
                  disabled={userProfile.coins < item.price}
                  onClick={() => buyItem(item.id)}
                  className="w-full py-1.5 bg-green-600 text-white rounded-lg text-[10px] font-black uppercase disabled:opacity-50"
                >
                  Comprar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
