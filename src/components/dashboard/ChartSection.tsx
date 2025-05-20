import React, { useState } from 'react';
import { ArrowRight, BarChart, LineChart } from 'lucide-react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const VISITORS_DATA = [12500, 15000, 18000, 16400, 19200, 21500, 22000, 24000, 23500, 25500, 28000, 29000];
const SALES_DATA = [8500, 11000, 12400, 11200, 13500, 16000, 17300, 18500, 17800, 19200, 20500, 22000];

const generateChart = (selectedChart: string) => {
  const chartHeight = 200;
  const maxValue = Math.max(...(selectedChart === 'visitors' ? VISITORS_DATA : SALES_DATA));
  const data = selectedChart === 'visitors' ? VISITORS_DATA : SALES_DATA;
  
  return (
    <div className="h-[300px] mt-4 pb-6">
      <div className="relative h-[200px]">
        {/* Y axis */}
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400">
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-center">
              <span className="mr-2">{Math.round(maxValue - (index * (maxValue / 4))).toLocaleString()}</span>
            </div>
          ))}
        </div>
        
        {/* Grid lines */}
        <div className="ml-12 h-full">
          {[0, 1, 2, 3, 4].map((index) => (
            <div 
              key={index} 
              className="border-b border-gray-200 dark:border-gray-700 h-1/4"
            ></div>
          ))}
        </div>
        
        {/* Chart */}
        <div className="absolute top-0 left-12 right-0 h-full flex items-end">
          <div className="w-full h-full flex items-end">
            {data.map((value, index) => {
              const height = (value / maxValue) * chartHeight;
              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div 
                    style={{ height: `${height}px` }}
                    className={`w-5/6 rounded-t-md ${
                      selectedChart === 'visitors' 
                        ? 'bg-blue-500 dark:bg-blue-600' 
                        : 'bg-purple-500 dark:bg-purple-600'
                    } transition-all duration-500 ease-in-out`}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* X axis */}
      <div className="ml-12 flex justify-between mt-2">
        {MONTHS.map((month, index) => (
          <div key={index} className="text-xs text-gray-500 dark:text-gray-400">
            {month}
          </div>
        ))}
      </div>
    </div>
  );
};

const ChartSection: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState<'visitors' | 'sales'>('visitors');
  const [selectedPeriod, setSelectedPeriod] = useState<'year' | 'month' | 'week'>('year');
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Performance Overview</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Detailed analysis of your business</p>
        </div>
        
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedPeriod('week')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              selectedPeriod === 'week'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setSelectedPeriod('month')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              selectedPeriod === 'month'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setSelectedPeriod('year')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 ${
              selectedPeriod === 'year'
                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Year
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setSelectedChart('visitors')}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
            selectedChart === 'visitors'
              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <LineChart size={16} className="mr-2" />
          Visitors
        </button>
        <button
          onClick={() => setSelectedChart('sales')}
          className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 ${
            selectedChart === 'sales'
              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <BarChart size={16} className="mr-2" />
          Sales
        </button>
      </div>
      
      {generateChart(selectedChart)}
      
      <div className="flex justify-end mt-4">
        <button className="flex items-center text-sm text-blue-500 dark:text-blue-400 hover:underline">
          View detailed report <ArrowRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ChartSection;