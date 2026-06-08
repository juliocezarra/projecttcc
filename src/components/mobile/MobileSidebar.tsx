import { LayoutDashboard, ArrowLeftRight, Target, User, Trophy } from 'lucide-react';
import { useApp } from '../../AppContext';

export const MobileSidebar = () => {
  const { currentView, setCurrentView } = useApp();

  const menuItems = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'transactions', label: 'Extrato', icon: ArrowLeftRight },
    { id: 'missions', label: 'Missões', icon: Trophy },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 px-2 py-2 flex justify-around items-center z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {menuItems.map((item) => {
        const Icon = item.icon;
        const isActive = currentView === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setCurrentView(item.id)}
            className={`
              flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px]
              ${
                isActive
                  ? 'text-cyan-400 bg-cyan-500/10'
                  : 'text-gray-500 hover:text-gray-300'
              }
            `}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'scale-110' : ''}`} />
            <span className="text-[10px] font-bold uppercase tracking-tight">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
