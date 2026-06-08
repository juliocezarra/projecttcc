import React from 'react';
import { useApp } from '../../AppContext';
import { MobileHeader } from './MobileHeader';
import { MobileSidebar } from './MobileSidebar';
import { MobileDashboard } from './MobileDashboard';
import { MobileTransactions } from './MobileTransactions';
import { MobileMissions } from './MobileMissions';
import { MobileGoals } from './MobileGoals';
import { MobileProfile } from './MobileProfile';
import { ToastContainer } from '../Toast';
import { Onboarding } from '../Onboarding';
import { Tutorial } from '../Tutorial';

export const MobileLayout: React.FC = () => {
  const { currentView, onboardingStep } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <MobileDashboard />;
      case 'transactions':
        return <MobileTransactions />;
      case 'missions':
        return <MobileMissions />;
      case 'goals':
        return <MobileGoals />;
      case 'profile':
        return <MobileProfile />;
      default:
        return <MobileDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col pb-20 overflow-x-hidden">
      {onboardingStep === 'name' && <Onboarding />}
      {onboardingStep === 'tutorial' && <Tutorial />}
      
      <MobileHeader />
      
      <main className="flex-1 p-4 overflow-y-auto">
        {renderView()}
      </main>

      <MobileSidebar />
      <ToastContainer />
    </div>
  );
};
