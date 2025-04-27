import React, { useCallback, useState } from 'react';
import { Upload, FileCheck, FilePlus, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFileLoaded: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileLoaded }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    handleFiles(files);
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFiles(files);
    }
  }, []);
  
  const handleFiles = useCallback((files: FileList) => {
    setError(null);
    
    if (files.length) {
      const file = files[0];
      
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        setFileName(file.name);
        onFileLoaded(file);
      } else {
        setError('Please upload a CSV file');
        setFileName(null);
      }
    }
  }, [onFileLoaded]);
  
  return (
    <div className="w-full space-y-2">
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
          ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${fileName ? 'bg-green-50 border-green-300' : ''}
          ${error ? 'bg-red-50 border-red-300' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv"
          onChange={handleFileInput}
        />
        
        <label 
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center justify-center"
        >
          {error ? (
            <>
              <AlertCircle className="h-12 w-12 text-red-500 mb-2" />
              <p className="text-red-600 font-medium">{error}</p>
              <p className="text-sm text-red-500 mt-2">Please try again with a CSV file</p>
            </>
          ) : fileName ? (
            <>
              <FileCheck className="h-12 w-12 text-green-500 mb-2" />
              <p className="text-green-600 font-medium">{fileName}</p>
              <p className="text-sm text-green-500 mt-2">File loaded successfully</p>
              <p className="text-xs text-gray-500 mt-1">Click or drag to replace</p>
            </>
          ) : (
            <>
              <div className="bg-blue-50 p-3 rounded-full mb-4">
                <Upload className="h-12 w-12 text-blue-500" />
              </div>
              <p className="text-lg font-medium text-gray-700">
                Drag and drop your CSV file here
              </p>
              <p className="text-sm text-gray-500 mt-1">or click to browse files</p>
              <div className="flex items-center justify-center mt-4 space-x-2 bg-gray-50 px-3 py-1.5 rounded-full">
                <FilePlus className="h-4 w-4 text-gray-400" />
                <span className="text-xs text-gray-500">CSV files only</span>
              </div>
            </>
          )}
        </label>
      </div>
      
      {fileName && (
        <p className="text-xs text-gray-500 text-center">
          Tip: You can drag and drop another file to replace the current one
        </p>
      )}
    </div>
  );
};

export default FileUpload;