import React, { useState } from 'react';
import { ChartData, ColumnConfig } from '../types';
import { ChevronDown, ChevronUp, ArrowDownUp } from 'lucide-react';

interface DataTableProps {
  data: ChartData;
  columns: ColumnConfig[];
  visible: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, columns, visible }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);
  
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue === bValue) return 0;
      
      const direction = sortConfig.direction === 'ascending' ? 1 : -1;
      
      if (aValue === null || aValue === undefined) return 1 * direction;
      if (bValue === null || bValue === undefined) return -1 * direction;
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return (aValue - bValue) * direction;
      }
      
      return String(aValue).localeCompare(String(bValue)) * direction;
    });
  }, [data, sortConfig]);
  
  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig?.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };
  
  if (!visible) return null;
  
  if (!data.length) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <p className="text-gray-500 text-center">No data available</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-4 transition-all duration-300 max-h-96 overflow-y-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort(column.key)}
              >
                <div className="flex items-center space-x-1">
                  <span>{column.label}</span>
                  {sortConfig?.key === column.key ? (
                    sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowDownUp className="h-4 w-4 text-gray-300" />
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={`${rowIndex}-${column.key}`}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono"
                >
                  {row[column.key] !== null && row[column.key] !== undefined
                    ? String(row[column.key])
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;