import React, { useRef } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  ScatterChart,
  Scatter,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from 'recharts';
import { Download } from 'lucide-react';
import { ChartConfig, ChartData } from '../types';
import { getChartColors } from '../utils/chartUtils';

interface ChartDisplayProps {
  data: ChartData;
  config: ChartConfig;
  width?: number | string;
  height?: number | string;
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({
  data,
  config,
  width = '100%',
  height = 400,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  if (!data.length || !config.xAxisKey || !config.yAxisKeys?.length) {
    return (
      <div className="bg-white p-8 rounded-lg shadow text-center">
        <p className="text-gray-500">
          Please upload data and configure chart settings to display a chart.
        </p>
      </div>
    );
  }
  
  const downloadChart = () => {
    if (!chartRef.current) return;
    
    try {
      // This is a simplified approach. For production, you'd use a proper library
      // like html2canvas or use SVG export mechanisms
      alert('Export functionality would be implemented here in a production version.');
    } catch (error) {
      console.error('Failed to export chart:', error);
    }
  };
  
  const colors = getChartColors(config.yAxisKeys.length);
  
  const renderChart = () => {
    switch (config.type) {
      case 'bar':
        return (
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={config.xAxisKey} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.yAxisKeys.map((key, index) => (
              <Bar key={key} dataKey={key} fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        );
        
      case 'line':
        return (
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={config.xAxisKey} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.yAxisKeys.map((key, index) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={colors[index % colors.length]}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        );
        
      case 'pie':
        return (
          <PieChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <Tooltip />
            <Legend />
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              outerRadius={150}
              fill="#8884d8"
              dataKey={config.yAxisKeys[0]}
              nameKey={config.xAxisKey}
              label={({ name }) => name}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
          </PieChart>
        );
        
      case 'scatter':
        return (
          <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={config.xAxisKey} 
              type="number" 
              name={config.xAxisKey} 
            />
            <YAxis dataKey={config.yAxisKeys[0]} type="number" name={config.yAxisKeys[0]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Legend />
            <Scatter
              name={`${config.xAxisKey} vs ${config.yAxisKeys[0]}`}
              data={data}
              fill={colors[0]}
            />
          </ScatterChart>
        );
        
      case 'area':
        return (
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={config.xAxisKey} 
              angle={-45} 
              textAnchor="end" 
              height={70} 
            />
            <YAxis />
            <Tooltip />
            <Legend />
            {config.yAxisKeys.map((key, index) => (
              <Area
                key={key}
                type="monotone"
                dataKey={key}
                stackId="1"
                stroke={colors[index % colors.length]}
                fill={colors[index % colors.length]}
                fillOpacity={0.6}
              />
            ))}
          </AreaChart>
        );
        
      default:
        return <div>Unsupported chart type</div>;
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow" ref={chartRef}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-800">{config.title}</h3>
        <button
          onClick={downloadChart}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
        </button>
      </div>
      <ResponsiveContainer width={width} height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  );
};

export default ChartDisplay;