import React from 'react';
import { Gamepad2, Newspaper, Download, Settings } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'game', label: 'Play', icon: <Gamepad2 /> },
    { id: 'news', label: 'News', icon: <Newspaper /> },
    { id: 'updates', label: 'Updates', icon: <Download /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
  ];

  return (
    <div className="w-20 bg-naruto-black-dark flex flex-col items-center py-6 border-r border-naruto-black-light">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-12 h-12 rounded-full bg-naruto-orange flex items-center justify-center animate-pulse-slow">
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 24 24" 
            className="text-white"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
              fill="currentColor" 
              stroke="currentColor" 
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 flex flex-col items-center space-y-6">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-14 h-14 flex flex-col items-center justify-center rounded-lg transition-all duration-200 ${
              activeTab === item.id
                ? 'bg-naruto-orange text-white'
                : 'text-gray-400 hover:bg-naruto-black-light hover:text-white'
            }`}
          >
            <div className="text-xl">{item.icon}</div>
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;