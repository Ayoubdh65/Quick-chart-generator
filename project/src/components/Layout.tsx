import React from 'react';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600">
            ChartCraft &copy; {new Date().getFullYear()} — Research Data Visualization Tool
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Transform your data into beautiful visualizations
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;