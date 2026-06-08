import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../AppContext';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface TutorialStep {
  target: string;
  title: string;
  description: string;
  position: 'bottom' | 'top' | 'left' | 'right';
  view?: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    target: 'sidebar-nav',
    title: 'Navegação Principal',
    description: 'Aqui você acessa todas as áreas do app. O menu agora é retrátil para economizar espaço!',
    position: 'right',
    view: 'dashboard',
  },
  {
    target: 'header-profile',
    title: 'Seu Perfil',
    description: 'Veja seu nome e o progresso da sua jornada financeira aqui.',
    position: 'bottom',
  },
  {
    target: 'header-stats',
    title: 'Moedas e Sequência',
    description: 'Acompanhe suas moedas e dias ativos. Elas ficam sempre visíveis no topo!',
    position: 'left',
  },
  {
    target: 'header-level',
    title: 'Nível e XP',
    description: 'Complete missões e registre transações para ganhar XP e subir de nível!',
    position: 'bottom',
  },
  {
    target: 'dashboard-summary',
    title: 'Resumo Mensal',
    description: 'No Dashboard, você visualiza rapidamente seu saldo, receitas e despesas do mês.',
    position: 'bottom',
    view: 'dashboard',
  },
  {
    target: 'transactions-list',
    title: 'Suas Transações',
    description: 'Aqui você registra cada ganho ou gasto. Manter isso atualizado é a chave para o sucesso!',
    position: 'top',
    view: 'transactions',
  },
  {
    target: 'missions-list',
    title: 'Missões e Conquistas',
    description: 'Complete desafios para ganhar XP extra e desbloquear troféus exclusivos.',
    position: 'top',
    view: 'missions',
  },
  {
    target: 'goals-list',
    title: 'Metas Financeiras',
    description: 'Defina objetivos reais e veja seu progresso em tempo real.',
    position: 'top',
    view: 'goals',
  },
  {
    target: 'profile-avatar',
    title: 'Personalização',
    description: 'Personalize seu avatar e veja suas estatísticas completas aqui.',
    position: 'right',
    view: 'profile',
  },
];

export const Tutorial: React.FC = () => {
  const { setOnboardingStep, setCurrentView } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [bubbleStyle, setBubbleStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const bubbleRef = useRef<HTMLDivElement>(null);

  const step = tutorialSteps[currentStep];

  useEffect(() => {
    if (step.view) {
      setCurrentView(step.view);
    }
  }, [currentStep, step.view, setCurrentView]);

  useEffect(() => {
    const updatePosition = () => {
      const targetEl = document.querySelector(`[data-tutorial="${step.target}"]`);
      if (targetEl && bubbleRef.current) {
        const rect = targetEl.getBoundingClientRect();
        const bubbleRect = bubbleRef.current.getBoundingClientRect();
        
        let top = 0;
        let left = 0;

        switch (step.position) {
          case 'bottom':
            top = rect.bottom + 16;
            left = rect.left + rect.width / 2 - bubbleRect.width / 2;
            break;
          case 'top':
            top = rect.top - bubbleRect.height - 16;
            left = rect.left + rect.width / 2 - bubbleRect.width / 2;
            break;
          case 'right':
            top = rect.top + rect.height / 2 - bubbleRect.height / 2;
            left = rect.right + 16;
            break;
          case 'left':
            top = rect.top + rect.height / 2 - bubbleRect.height / 2;
            left = rect.left - bubbleRect.width - 16;
            break;
        }

        // Clamp inside viewport
        const clampedLeft = Math.max(16, Math.min(left, window.innerWidth - bubbleRect.width - 16));
        const clampedTop = Math.max(16, Math.min(top, window.innerHeight - bubbleRect.height - 16));

        setBubbleStyle({
          top: `${clampedTop}px`,
          left: `${clampedLeft}px`,
          opacity: 1,
        });

        // Calculate arrow offset based on clamping
        const newArrowStyle: React.CSSProperties = {};

        if (step.position === 'bottom' || step.position === 'top') {
          const deltaX = left - clampedLeft;
          newArrowStyle.left = `calc(50% + ${deltaX}px)`;
        } else {
          const deltaY = top - clampedTop;
          newArrowStyle.top = `calc(50% + ${deltaY}px)`;
        }

        setArrowStyle(newArrowStyle);
      }
    };

    // Small delay to allow view transition
    const timer = setTimeout(updatePosition, 100);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      clearTimeout(timer);
    };
  }, [currentStep, step]);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setOnboardingStep('completed');
    setCurrentView('transactions');
  };

  return (
    <div className="fixed inset-0 z-[110] pointer-events-none">
      <div className="absolute inset-0 bg-black/60 transition-opacity duration-500" />
      
      <div
        ref={bubbleRef}
        style={bubbleStyle}
        className="absolute w-80 bg-gray-900 border border-indigo-500/50 rounded-2xl p-6 shadow-2xl shadow-indigo-500/20 pointer-events-auto transition-all duration-300 opacity-0"
      >
        <div className="flex justify-between items-start mb-4">
          <div className="bg-indigo-500/20 text-indigo-400 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
            Dica {currentStep + 1} de {tutorialSteps.length}
          </div>
          <button 
            onClick={handleComplete}
            className="text-gray-500 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {step.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handleComplete}
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
          >
            Pular tutorial
          </button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="p-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold shadow-lg shadow-indigo-500/20"
            >
              {currentStep === tutorialSteps.length - 1 ? 'Começar!' : 'Próximo'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Arrow (Dynamic) */}
        <div 
          style={arrowStyle}
          className={`absolute w-3 h-3 bg-gray-900 border-l border-t border-indigo-500/50 transform
            ${step.position === 'bottom' ? '-top-1.5 -translate-x-1/2 rotate-45' : ''}
            ${step.position === 'top' ? '-bottom-1.5 -translate-x-1/2 rotate-[225deg]' : ''}
            ${step.position === 'right' ? '-left-1.5 -translate-y-1/2 rotate-[315deg]' : ''}
            ${step.position === 'left' ? '-right-1.5 -translate-y-1/2 rotate-[135deg]' : ''}
          `}
        />
      </div>
    </div>
  );
};
