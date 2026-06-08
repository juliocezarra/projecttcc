import { LayoutDashboard, ArrowLeftRight, Target, User, Menu, X, Trophy } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../AppContext';

export const Sidebar = () => {
  const { currentView, setCurrentView } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transações', icon: ArrowLeftRight },
    { id: 'missions', label: 'Missões', icon: Trophy },
    { id: 'goals', label: 'Metas', icon: Target },
    { id: 'profile', label: 'Perfil', icon: User },
  ];

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-lg text-white"
        aria-label="Abrir menu"
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-20 hover:w-64 bg-gray-900 border-r border-gray-800
          transform transition-all duration-300 ease-in-out group
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8 px-2 overflow-hidden">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0 shadow-lg shadow-cyan-500/20">
              <span className="text-xl font-bold text-white">💰</span>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <h1 className="text-xl font-bold text-white">Finanças</h1>
              <p className="text-xs text-cyan-400">em Jogo</p>
            </div>
          </div>

          <nav className="space-y-2 flex-1" data-tutorial="sidebar-nav">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentView(item.id);
                    setMobileOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-4 px-3 py-3 rounded-lg
                    transition-all duration-200 font-medium overflow-hidden
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/20'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-6 h-6 shrink-0" />
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800 overflow-hidden">
            <div className="text-xs text-gray-500 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              <p>Versão 1.1.0</p>
              <p className="mt-1">Gamificação Financeira</p>
            </div>
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div
          onClick={toggleMobile}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}
    </>
  );
};
