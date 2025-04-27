export interface DataRow {
  [key: string]: string | number;
}

export type ChartData = DataRow[];

export type ChartType = 'bar' | 'line' | 'pie' | 'scatter' | 'area';

export interface ColumnConfig {
  key: string;
  label: string;
  dataType: 'string' | 'number';
  isXAxis?: boolean;
  isYAxis?: boolean;
  isPieValue?: boolean;
}

export interface ChartConfig {
  type: ChartType;
  title: string;
  xAxisKey?: string;
  yAxisKeys?: string[];
  columns: ColumnConfig[];
}