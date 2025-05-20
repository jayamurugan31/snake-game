import React from 'react';
import { Clock, User, ShoppingCart, CreditCard, AlertCircle } from 'lucide-react';

interface ActivityItem {
  id: number;
  type: 'user' | 'order' | 'payment' | 'alert';
  title: string;
  time: string;
  description: string;
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'user':
      return <User size={16} className="text-blue-500 dark:text-blue-400" />;
    case 'order':
      return <ShoppingCart size={16} className="text-green-500 dark:text-green-400" />;
    case 'payment':
      return <CreditCard size={16} className="text-purple-500 dark:text-purple-400" />;
    case 'alert':
      return <AlertCircle size={16} className="text-red-500 dark:text-red-400" />;
    default:
      return null;
  }
};

const activityData: ActivityItem[] = [
  {
    id: 1,
    type: 'user',
    title: 'New user registered',
    time: '5 minutes ago',
    description: 'Sarah Johnson created a new account'
  },
  {
    id: 2,
    type: 'order',
    title: 'New order received',
    time: '12 minutes ago',
    description: 'Order #45623 - $259.00'
  },
  {
    id: 3,
    type: 'payment',
    title: 'Payment processed',
    time: '35 minutes ago',
    description: 'Invoice #8752 has been paid'
  },
  {
    id: 4,
    type: 'alert',
    title: 'High server load',
    time: '1 hour ago',
    description: 'Server load reached 92%'
  },
  {
    id: 5,
    type: 'user',
    title: 'User updated profile',
    time: '2 hours ago',
    description: 'Michael Brown updated account info'
  },
  {
    id: 6,
    type: 'order',
    title: 'Order shipped',
    time: '3 hours ago',
    description: 'Order #45590 has been shipped'
  }
];

const RecentActivity: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h2>
        <span className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          <Clock size={16} />
        </span>
      </div>
      
      <div className="space-y-4">
        {activityData.map((item) => (
          <div 
            key={item.id} 
            className="flex items-start p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 mr-3">
              {getActivityIcon(item.type)}
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="text-sm font-medium text-gray-800 dark:text-white">{item.title}</h3>
                <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{item.time}</span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full py-2 text-sm text-center text-blue-500 dark:text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200">
          View all activity
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;