import Papa from 'papaparse';
import { ChartData, ColumnConfig } from '../types';

export const parseCSV = (file: File): Promise<{ data: ChartData; columns: ColumnConfig[] }> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data as ChartData;
        
        // Filter out empty rows
        const filteredData = data.filter(row => 
          Object.values(row).some(value => value !== null && value !== '')
        );
        
        // Extract column information
        const sampleRow = filteredData[0] || {};
        const columns: ColumnConfig[] = Object.keys(sampleRow).map(key => {
          const dataType = typeof sampleRow[key] === 'number' ? 'number' : 'string';
          return {
            key,
            label: key,
            dataType,
          };
        });
        
        resolve({ data: filteredData, columns });
      },
      error: (error) => {
        reject(error);
      }
    });
  });
};

export const detectDataTypes = (data: ChartData): ColumnConfig[] => {
  if (!data.length) return [];
  
  const firstRow = data[0];
  return Object.keys(firstRow).map(key => {
    // Check data type by examining values across rows
    const isNumber = data.every(row => 
      row[key] === null || 
      row[key] === '' || 
      typeof row[key] === 'number' || 
      !isNaN(Number(row[key]))
    );
    
    return {
      key,
      label: key,
      dataType: isNumber ? 'number' : 'string',
    };
  });
};

export const getRecommendedChartType = (columns: ColumnConfig[]): ChartType => {
  const numberColumns = columns.filter(col => col.dataType === 'number').length;
  const stringColumns = columns.filter(col => col.dataType === 'string').length;
  
  if (numberColumns >= 2 && stringColumns >= 1) {
    return 'bar';
  } else if (numberColumns >= 2) {
    return 'line';
  } else if (numberColumns === 1 && stringColumns === 1) {
    return 'pie';
  } else {
    return 'bar';
  }
};