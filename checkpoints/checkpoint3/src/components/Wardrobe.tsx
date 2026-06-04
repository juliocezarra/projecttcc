import { Shirt, Check } from 'lucide-react';
import { useApp } from '../AppContext';
import { clothingItems } from '../mockData';
import { ClothingCategory } from '../types';
import { ItemPreview } from './ItemPreview';

export const Wardrobe = () => {
  const { character, ownedItems, equipItem } = useApp();

  const categories: { id: ClothingCategory; label: string; emoji: string }[] = [
    { id: 'head', label: 'Cabeça', emoji: '👒' },
    { id: 'shirt', label: 'Camiseta', emoji: '👕' },
    { id: 'pants', label: 'Calça', emoji: '👖' },
    { id: 'feet', label: 'Pés', emoji: '👟' },
  ];

  const rarityConfig = {
    common: { bg: 'bg-gray-700', text: 'text-gray-300' },
    uncommon: { bg: 'bg-green-700', text: 'text-green-300' },
    rare: { bg: 'bg-blue-700', text: 'text-blue-300' },
    epic: { bg: 'bg-purple-700', text: 'text-purple-300' },
    legendary: { bg: 'bg-amber-700', text: 'text-amber-300' },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Shirt className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Meu Guarda-roupa</h2>
        <span className="text-gray-400">({ownedItems.size} itens)</span>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => {
          const itemsInCategory = clothingItems.filter((item) => item.category === cat.id);
          const ownedInCategory = itemsInCategory.filter((item) => ownedItems.has(item.id));
          const currentEquipped = character[cat.id];

          return (
            <div key={cat.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span>{cat.emoji}</span>
                  {cat.label}
                </h3>
                <span className="text-sm text-gray-400">
                  {ownedInCategory.length}/{itemsInCategory.length}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {ownedInCategory.map((item) => {
                  const isEquipped = currentEquipped === item.id;
                  const rarity = rarityConfig[item.rarity];

                  return (
                    <button
                      key={item.id}
                      onClick={() => equipItem(item.id, cat.id)}
                      className={`
                        p-3 rounded-lg border-2 transition-all duration-200
                        ${
                          isEquipped
                            ? 'border-cyan-500 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 shadow-lg shadow-cyan-500/30'
                            : 'border-gray-700 bg-gray-900 hover:border-gray-600'
                        }
                      `}
                    >
                      <div className="mb-2 h-16 flex items-center justify-center bg-slate-800/50 rounded">
                        <ItemPreview itemId={item.id} size="small" />
                      </div>
                      <p className="text-xs font-semibold text-white text-center mb-2 truncate">
                        {item.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className={`px-2 py-1 rounded text-xs font-bold ${rarity.bg} ${rarity.text}`}>
                          {item.rarity}
                        </div>
                        {isEquipped && (
                          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}

                {ownedInCategory.length === 0 && (
                  <div className="col-span-full text-center py-6 text-gray-500">
                    <p className="text-sm">Nenhum item nesta categoria</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
