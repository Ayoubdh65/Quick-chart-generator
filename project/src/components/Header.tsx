import React from 'react';
import { BarChart } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <BarChart className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">ChartCraft</h1>
              <p className="text-sm text-gray-500">Research Data Visualization Tool</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="bg-blue-50 rounded-lg px-4 py-2">
              <p className="text-sm text-blue-700">
                Upload CSV files to create beautiful charts
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;