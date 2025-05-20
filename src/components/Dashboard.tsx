import React, { useState } from 'react';
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';
import StatCards from './dashboard/StatCards';
import ChartSection from './dashboard/ChartSection';
import RecentActivity from './dashboard/RecentActivity';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
              Dashboard Overview
            </h1>
            
            <StatCards />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <ChartSection />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;