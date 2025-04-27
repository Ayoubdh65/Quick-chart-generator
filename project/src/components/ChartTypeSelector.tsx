import React from 'react';
import { BarChart2, LineChart, PieChart, ScatterChart, TrendingUp } from 'lucide-react';
import { ChartType } from '../types';

interface ChartTypeSelectorProps {
  selectedType: ChartType;
  onSelectType: (type: ChartType) => void;
}

interface ChartTypeOption {
  type: ChartType;
  label: string;
  icon: React.ReactNode;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({
  selectedType,
  onSelectType,
}) => {
  const chartTypes: ChartTypeOption[] = [
    {
      type: 'bar',
      label: 'Bar Chart',
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      type: 'line',
      label: 'Line Chart',
      icon: <LineChart className="h-5 w-5" />,
    },
    {
      type: 'pie',
      label: 'Pie Chart',
      icon: <PieChart className="h-5 w-5" />,
    },
    {
      type: 'scatter',
      label: 'Scatter Plot',
      icon: <ScatterChart className="h-5 w-5" />,
    },
    {
      type: 'area',
      label: 'Area Chart',
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {chartTypes.map((chartType) => (
        <button
          key={chartType.type}
          onClick={() => onSelectType(chartType.type)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
            ${
              selectedType === chartType.type
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
            }
          `}
        >
          {chartType.icon}
          <span>{chartType.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ChartTypeSelector;