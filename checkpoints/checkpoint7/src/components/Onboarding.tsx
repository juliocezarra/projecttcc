import React, { useState } from 'react';
import { useApp } from '../AppContext';
import { User, ArrowRight } from 'lucide-react';

export const Onboarding: React.FC = () => {
  const { updateUserName, setOnboardingStep } = useApp();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUserName(name.trim());
      setOnboardingStep('tutorial');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-gray-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-indigo-500/10 rounded-full">
            <User className="w-12 h-12 text-indigo-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Bem-vindo ao GamiFinance!
        </h1>
        <p className="text-gray-400 text-center mb-4">
          Para começarmos sua jornada financeira, como podemos te chamar?
        </p>
        
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-8">
          <p className="text-amber-200 text-xs leading-relaxed text-center">
            Nota: Para esta demonstração, sua conta já vem com valores e conquistas pré-carregados para que você possa testar todas as funcionalidades imediatamente.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Seu nome ou apelido
            </label>
            <input
              autoFocus
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite seu nome..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
