import React from 'react';
import { ChartConfig, ColumnConfig } from '../types';
import { Settings } from 'lucide-react';

interface ChartConfigPanelProps {
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
}

const ChartConfigPanel: React.FC<ChartConfigPanelProps> = ({
  config,
  onConfigChange,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onConfigChange({
      ...config,
      title: e.target.value,
    });
  };
  
  const handleXAxisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newXAxisKey = e.target.value;
    
    // Update column configurations
    const updatedColumns = config.columns.map(col => ({
      ...col,
      isXAxis: col.key === newXAxisKey,
    }));
    
    onConfigChange({
      ...config,
      xAxisKey: newXAxisKey,
      columns: updatedColumns,
    });
  };
  
  const handleYAxisChange = (colKey: string, checked: boolean) => {
    let yAxisKeys = [...(config.yAxisKeys || [])];
    
    if (checked && !yAxisKeys.includes(colKey)) {
      yAxisKeys.push(colKey);
    } else if (!checked && yAxisKeys.includes(colKey)) {
      yAxisKeys = yAxisKeys.filter(key => key !== colKey);
    }
    
    // Update column configurations
    const updatedColumns = config.columns.map(col => ({
      ...col,
      isYAxis: yAxisKeys.includes(col.key),
    }));
    
    onConfigChange({
      ...config,
      yAxisKeys,
      columns: updatedColumns,
    });
  };
  
  // Get numeric columns for Y-axis selection
  const numericColumns = config.columns.filter(col => col.dataType === 'number');
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Settings className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-medium">Chart Configuration</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="chart-title" className="block text-sm font-medium text-gray-700 mb-1">
            Chart Title
          </label>
          <input
            type="text"
            id="chart-title"
            value={config.title}
            onChange={handleTitleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="x-axis" className="block text-sm font-medium text-gray-700 mb-1">
            X-Axis
          </label>
          <select
            id="x-axis"
            value={config.xAxisKey || ''}
            onChange={handleXAxisChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select X-Axis</option>
            {config.columns.map(col => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Y-Axis Data
          </label>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {numericColumns.map(col => (
              <div key={col.key} className="flex items-center">
                <input
                  type="checkbox"
                  id={`y-axis-${col.key}`}
                  checked={config.yAxisKeys?.includes(col.key) || false}
                  onChange={e => handleYAxisChange(col.key, e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`y-axis-${col.key}`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {col.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartConfigPanel;