import React from 'react';
import { Minimize2, X, HelpCircle } from 'lucide-react';

interface HeaderProps {
  appInfo?: {
    version: string;
    appPath: string;
    gamePath: string;
  } | null;
}

const Header: React.FC<HeaderProps> = ({ appInfo }) => {
  return (
    <header className="h-12 bg-naruto-black-dark flex justify-between items-center px-4 border-b border-naruto-black-light">
      <div className="flex items-center space-x-2">
        <h1 className="text-naruto-orange font-semibold text-lg">Naruto Game Launcher</h1>
        <span className="text-xs text-gray-400">v{appInfo?.version || '1.0.0'}</span>
      </div>
      
      <div className="app-controls flex items-center space-x-2">
        <button className="p-1 hover:bg-naruto-black-light rounded-full transition-colors">
          <HelpCircle className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-1 hover:bg-naruto-black-light rounded-full transition-colors">
          <Minimize2 className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-1 hover:bg-naruto-red rounded-full transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </header>
  );
};

export default Header;