import { useState } from 'react';
import { ShoppingBag, Coins, Check, Lock } from 'lucide-react';
import { useApp } from '../AppContext';
import { ClothingCategory } from '../types';
import { ItemPreview } from './ItemPreview';

export const Shop = () => {
  const { userProfile, availableClothing, ownedItems, buyItem, character, equipItem } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory>('head');

  const categories: { id: ClothingCategory; label: string; emoji: string }[] = [
    { id: 'head', label: 'Cabeça', emoji: '👒' },
    { id: 'shirt', label: 'Camiseta', emoji: '👕' },
    { id: 'pants', label: 'Calça', emoji: '👖' },
    { id: 'feet', label: 'Pés', emoji: '👟' },
  ];

  const filteredItems = availableClothing.filter((item) => item.category === selectedCategory);

  const rarityConfig = {
    common: { bg: 'bg-gray-700', text: 'text-gray-300', label: 'Comum' },
    uncommon: { bg: 'bg-green-700', text: 'text-green-300', label: 'Incomum' },
    rare: { bg: 'bg-blue-700', text: 'text-blue-300', label: 'Raro' },
    epic: { bg: 'bg-purple-700', text: 'text-purple-300', label: 'Épico' },
    legendary: { bg: 'bg-amber-700', text: 'text-amber-300', label: 'Lendário' },
  };

  const isEquipped = (itemId: string): boolean => {
    return character[selectedCategory] === itemId;
  };

  const handleBuy = (itemId: string) => {
    const success = buyItem(itemId);
    if (success) {
      equipItem(itemId, selectedCategory);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShoppingBag className="w-6 h-6 text-cyan-400" />
          Loja de Roupas
        </h2>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg">
          <Coins className="w-5 h-5 text-white" />
          <span className="font-bold text-white">{userProfile.coins} Moedas</span>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg font-semibold
              transition-all duration-200
              ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }
            `}
          >
            <span>{cat.emoji}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => {
          const owned = ownedItems.has(item.id);
          const equipped = isEquipped(item.id);
          const rarity = rarityConfig[item.rarity];

          return (
            <div
              key={item.id}
              className={`
                rounded-xl border-2 transition-all duration-200
                ${
                  equipped
                    ? 'border-cyan-500 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 shadow-lg shadow-cyan-500/30'
                    : owned
                      ? 'border-gray-700 bg-gray-900'
                      : 'border-gray-800 bg-gray-850'
                }
              `}
            >
              <div className="p-4">
                <div className="mb-3 flex flex-col items-center justify-center h-32 bg-slate-800/50 rounded-lg">
                  <ItemPreview itemId={item.id} size="medium" />
                </div>
                <div className="flex items-start justify-between mb-3">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${rarity.bg} ${rarity.text}`}>
                    {rarity.label}
                  </div>
                </div>

                <h3 className="font-bold text-white mb-1">{item.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-amber-400">{item.price}</span>
                </div>

                {owned ? (
                  <>
                    {equipped ? (
                      <button
                        disabled
                        className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 cursor-default"
                      >
                        <Check className="w-4 h-4" />
                        Equipado
                      </button>
                    ) : (
                      <button
                        onClick={() => equipItem(item.id, selectedCategory)}
                        className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-colors"
                      >
                        Equipar
                      </button>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleBuy(item.id)}
                    disabled={userProfile.coins < item.price}
                    className={`
                      w-full py-2 rounded-lg font-semibold transition-all duration-200
                      flex items-center justify-center gap-2
                      ${
                        userProfile.coins < item.price
                          ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/30'
                      }
                    `}
                  >
                    {userProfile.coins < item.price ? (
                      <>
                        <Lock className="w-4 h-4" />
                        Sem Moedas
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        Comprar
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
