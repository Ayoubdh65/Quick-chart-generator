import { ChartConfig, ChartData, ChartType } from '../types';

export const prepareChartData = (
  data: ChartData,
  config: ChartConfig
): ChartData => {
  if (config.type === 'pie') {
    return preparePieChartData(data, config);
  }
  
  return data;
};

const preparePieChartData = (
  data: ChartData,
  config: ChartConfig
): ChartData => {
  const labelKey = config.xAxisKey || '';
  const valueKey = config.yAxisKeys?.[0] || '';
  
  if (!labelKey || !valueKey) return [];
  
  return data.map(item => ({
    name: String(item[labelKey]),
    value: Number(item[valueKey]),
  }));
};

export const getChartColors = (count: number): string[] => {
  const baseColors = [
    '#2563EB', // Primary blue
    '#0D9488', // Teal
    '#F97316', // Orange
    '#8B5CF6', // Purple
    '#EC4899', // Pink
    '#84CC16', // Lime
    '#14B8A6', // Emerald
    '#EF4444', // Red
  ];
  
  // If we need more colors than the base set, generate additional ones
  if (count <= baseColors.length) {
    return baseColors.slice(0, count);
  }
  
  // Generate more colors by varying opacity
  const extraColors = [];
  const opacity = [0.8, 0.6];
  
  for (const opacityValue of opacity) {
    for (const color of baseColors) {
      // Convert hex to rgba with opacity
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      extraColors.push(`rgba(${r}, ${g}, ${b}, ${opacityValue})`);
    }
  }
  
  return [...baseColors, ...extraColors].slice(0, count);
};

export const getDefaultChartConfig = (chartType: ChartType, columns: any[]): ChartConfig => {
  const numericColumns = columns.filter(col => col.dataType === 'number');
  const stringColumns = columns.filter(col => col.dataType === 'string');
  
  let xAxisKey = '';
  let yAxisKeys: string[] = [];
  
  if (stringColumns.length > 0) {
    xAxisKey = stringColumns[0].key;
  } else if (numericColumns.length > 0) {
    xAxisKey = numericColumns[0].key;
  }
  
  if (numericColumns.length > 0) {
    yAxisKeys = [numericColumns[0].key];
    if (numericColumns.length > 1) {
      yAxisKeys.push(numericColumns[1].key);
    }
  }
  
  return {
    type: chartType,
    title: 'Chart Title',
    xAxisKey,
    yAxisKeys,
    columns: columns.map(col => ({
      ...col,
      isXAxis: col.key === xAxisKey,
      isYAxis: yAxisKeys.includes(col.key),
      isPieValue: chartType === 'pie' && col.key === yAxisKeys[0]
    }))
  };
};