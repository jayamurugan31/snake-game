import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  Clock 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: {
    value: string;
    type: 'increase' | 'decrease';
  };
  icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-5 transform transition-all duration-300 hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{value}</h3>
          <div className={`flex items-center mt-2 ${
            change.type === 'increase' 
              ? 'text-green-600 dark:text-green-400' 
              : 'text-red-600 dark:text-red-400'
          }`}>
            {change.type === 'increase' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="text-xs font-medium ml-1">{change.value}</span>
          </div>
        </div>
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

const StatCards: React.FC = () => {
  const [currentValues, setCurrentValues] = useState({
    visitors: 42986,
    orders: 3789,
    revenue: 54209,
    conversion: 3.2
  });
  
  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentValues(prev => ({
        visitors: prev.visitors + Math.floor(Math.random() * 10),
        orders: prev.orders + Math.floor(Math.random() * 3),
        revenue: prev.revenue + Math.floor(Math.random() * 50),
        conversion: parseFloat((prev.conversion + (Math.random() * 0.05)).toFixed(2))
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      title: 'Total Visitors',
      value: currentValues.visitors.toLocaleString(),
      change: { value: '12.5% from last month', type: 'increase' as const },
      icon: <Users size={20} />
    },
    {
      title: 'Total Orders',
      value: currentValues.orders.toLocaleString(),
      change: { value: '8.2% from last month', type: 'increase' as const },
      icon: <ShoppingCart size={20} />
    },
    {
      title: 'Total Revenue',
      value: `$${currentValues.revenue.toLocaleString()}`,
      change: { value: '4.3% from last month', type: 'increase' as const },
      icon: <DollarSign size={20} />
    },
    {
      title: 'Conversion Rate',
      value: `${currentValues.conversion}%`,
      change: { value: '1.8% from last month', type: 'decrease' as const },
      icon: <Clock size={20} />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard 
          key={index} 
          title={stat.title} 
          value={stat.value} 
          change={stat.change} 
          icon={stat.icon}
        />
      ))}
    </div>
  );
};

export default StatCards;