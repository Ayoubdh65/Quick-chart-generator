import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import FileUpload from './components/FileUpload';
import DataTable from './components/DataTable';
import ChartDisplay from './components/ChartDisplay';
import ChartTypeSelector from './components/ChartTypeSelector';
import ChartConfigPanel from './components/ChartConfigPanel';
import { Eye, EyeOff, PanelLeft } from 'lucide-react';
import { parseCSV, getRecommendedChartType } from './utils/csvUtils';
import { getDefaultChartConfig, prepareChartData } from './utils/chartUtils';
import { ChartData, ChartType, ChartConfig, ColumnConfig } from './types';

function App() {
  const [data, setData] = useState<ChartData>([]);
  const [columns, setColumns] = useState<ColumnConfig[]>([]);
  const [chartType, setChartType] = useState<ChartType>('bar');
  const [chartConfig, setChartConfig] = useState<ChartConfig | null>(null);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasData, setHasData] = useState(false);
  
  useEffect(() => {
    if (columns.length > 0 && data.length > 0) {
      const recommendedType = getRecommendedChartType(columns);
      setChartType(recommendedType);
      setChartConfig(getDefaultChartConfig(recommendedType, columns));
    }
  }, [columns, data]);
  
  const handleFileLoaded = async (file: File) => {
    setIsLoading(true);
    try {
      const { data: parsedData, columns: parsedColumns } = await parseCSV(file);
      setData(parsedData);
      setColumns(parsedColumns);
      setHasData(true);
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file. Please check the format and try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleChartTypeChange = (type: ChartType) => {
    setChartType(type);
    
    if (columns.length > 0) {
      setChartConfig(getDefaultChartConfig(type, columns));
    }
  };
  
  const handleConfigChange = (config: ChartConfig) => {
    setChartConfig(config);
  };
  
  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };
  
  const processedData = chartConfig 
    ? prepareChartData(data, chartConfig) 
    : data;
  
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 animate-fadeIn">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Upload Your Research Data
                </h2>
                <p className="text-gray-600 mb-6">
                  Transform your CSV data into beautiful, interactive charts in seconds
                </p>
                <FileUpload onFileLoaded={handleFileLoaded} />
              </div>
            </div>
          </div>
          
          {isLoading && (
            <div className="lg:col-span-12 flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          )}
          
          {hasData && !isLoading && (
            <>
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-slideInLeft">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Chart Type</h2>
                  <ChartTypeSelector
                    selectedType={chartType}
                    onSelectType={handleChartTypeChange}
                  />
                </div>
                
                {chartConfig && (
                  <div className="animate-slideInLeft">
                    <ChartConfigPanel 
                      config={chartConfig} 
                      onConfigChange={handleConfigChange} 
                    />
                  </div>
                )}
              </div>
              
              <div className="lg:col-span-9 space-y-6">
                {chartConfig && (
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-slideInRight">
                    <ChartDisplay
                      data={processedData}
                      config={chartConfig}
                      height={400}
                    />
                  </div>
                )}
                
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Data Table</h2>
                    <button
                      onClick={toggleTableVisibility}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                    >
                      {isTableVisible ? (
                        <>
                          <EyeOff className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Hide Table</span>
                        </>
                      ) : (
                        <>
                          <Eye className="h-4 w-4 text-gray-600" />
                          <span className="text-gray-600">Show Table</span>
                        </>
                      )}
                    </button>
                  </div>
                  
                  <div className="animate-slideInUp">
                    <DataTable
                      data={data}
                      columns={columns}
                      visible={isTableVisible}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default App;