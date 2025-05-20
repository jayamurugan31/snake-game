import React from 'react';
import { 
  LayoutDashboard, 
  BarChart2, 
  Users, 
  FileText, 
  Settings, 
  HelpCircle,
  X 
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface NavItem {
  title: string;
  icon: React.ReactNode;
  active?: boolean;
}

const NavItems: NavItem[] = [
  { title: 'Dashboard', icon: <LayoutDashboard size={20} />, active: true },
  { title: 'Analytics', icon: <BarChart2 size={20} /> },
  { title: 'Customers', icon: <Users size={20} /> },
  { title: 'Reports', icon: <FileText size={20} /> },
  { title: 'Settings', icon: <Settings size={20} /> },
  { title: 'Help', icon: <HelpCircle size={20} /> },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const { theme } = useTheme();
  
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-gray-900 bg-opacity-50 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-md bg-blue-500 flex items-center justify-center">
              <BarChart2 size={20} className="text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-800 dark:text-white">Analytix</span>
          </div>
          <button 
            onClick={() => setIsOpen(false)} 
            className="lg:hidden p-1 rounded-md text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-400 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="mt-5 px-2">
          <div className="space-y-1">
            {NavItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`group flex items-center px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                  item.active 
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <span className={`mr-3 ${item.active ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                  {item.icon}
                </span>
                {item.title}
                {item.active && (
                  <span className="ml-auto w-1.5 h-6 rounded-full bg-blue-500"></span>
                )}
              </a>
            ))}
          </div>
        </nav>
        
        <div className="mt-auto p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800 dark:text-white">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;