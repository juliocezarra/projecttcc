import { X, Sparkles, TrendingUp } from 'lucide-react';
import { useApp } from '../AppContext';

export const ToastContainer = () => {
  const { toasts, removeToast } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg
            animate-slide-in-right backdrop-blur-sm
            ${
              toast.type === 'xp'
                ? 'bg-gradient-to-r from-cyan-500/90 to-blue-500/90 text-white'
                : toast.type === 'levelup'
                ? 'bg-gradient-to-r from-amber-500/90 to-orange-500/90 text-white'
                : toast.type === 'success'
                ? 'bg-gradient-to-r from-green-500/90 to-emerald-500/90 text-white'
                : 'bg-red-500/90 text-white'
            }
          `}
        >
          {toast.type === 'xp' && <Sparkles className="w-5 h-5 animate-pulse" />}
          {toast.type === 'levelup' && <TrendingUp className="w-5 h-5 animate-bounce" />}
          <span className="font-semibold">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-2 hover:opacity-70 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
