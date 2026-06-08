import { useEffect, useState } from 'react';
import { AppProvider, useApp } from './AppContext';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { Transactions } from './components/Transactions';
import { Missions } from './components/Missions';
import { Goals } from './components/Goals';
import { Profile } from './components/Profile';
import { ToastContainer } from './components/Toast';
import { Onboarding } from './components/Onboarding';
import { Tutorial } from './components/Tutorial';
import { MobileLayout } from './components/mobile/MobileLayout';

const DesktopLayout = () => {
  const { currentView, onboardingStep } = useApp();

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'transactions':
        return <Transactions />;
      case 'missions':
        return <Missions />;
      case 'goals':
        return <Goals />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {onboardingStep === 'name' && <Onboarding />}
      {onboardingStep === 'tutorial' && <Tutorial />}
      
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{renderView()}</div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <AppProvider>
      {isMobile ? <MobileLayout /> : <DesktopLayout />}
    </AppProvider>
  );
}

export default App;
