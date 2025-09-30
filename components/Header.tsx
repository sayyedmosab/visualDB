
import React from 'react';
import { Database, Zap } from 'lucide-react';

interface HeaderProps {
  onGenerate: () => void;
  isLoading: boolean;
}

const Header: React.FC<HeaderProps> = ({ onGenerate, isLoading }) => {
  return (
    <header className="absolute top-0 left-0 right-0 bg-gray-900/50 backdrop-blur-sm p-4 z-10 flex justify-between items-center border-b border-gray-700">
      <div className="flex items-center space-x-3">
        <Database className="text-cyan-400 w-8 h-8" />
        <h1 className="text-2xl font-bold text-white tracking-wider">
          Architexture <span className="text-cyan-400">AI</span>
        </h1>
      </div>
      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="flex items-center justify-center px-4 py-2 bg-cyan-500 text-white font-semibold rounded-md hover:bg-cyan-600 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <Zap className="w-5 h-5 mr-2" />
            Generate DB Model
          </>
        )}
      </button>
    </header>
  );
};

export default Header;
