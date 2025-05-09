import React, { useState } from 'react';
import { Save, FolderOpen, RotateCw, HardDrive, Monitor, Cpu } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const SettingsPanel: React.FC = () => {
  const { appInfo } = useAppContext();
  const [settings, setSettings] = useState({
    installPath: appInfo?.gamePath || 'C:/Games/NarutoGame',
    autoUpdate: true,
    launchOnStartup: false,
    closeAfterLaunch: true,
    lowSpecMode: false,
    language: 'en',
    region: 'global',
    graphicsPreset: 'high'
  });
  
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setUnsavedChanges(true);
  };
  
  const handleSave = () => {
    // In a real app, save settings to storage
    setUnsavedChanges(false);
  };
  
  const handleReset = () => {
    // Reset to default settings
    setSettings({
      installPath: appInfo?.gamePath || 'C:/Games/NarutoGame',
      autoUpdate: true,
      launchOnStartup: false,
      closeAfterLaunch: true,
      lowSpecMode: false,
      language: 'en',
      region: 'global',
      graphicsPreset: 'high'
    });
    setUnsavedChanges(true);
  };
  
  return (
    <div className="h-full p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        
        <div className="flex space-x-3">
          <button
            onClick={handleReset}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-naruto-black-light hover:bg-naruto-black text-white transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            <span>Reset</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={!unsavedChanges}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              unsavedChanges 
                ? 'bg-naruto-orange hover:bg-naruto-orange-light text-white' 
                : 'bg-naruto-black-light text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Changes</span>
          </button>
        </div>
      </div>
      
      {/* Settings sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Installation */}
        <div className="bg-naruto-black-dark/80 rounded-lg p-4 border border-naruto-black-light">
          <div className="flex items-center space-x-2 mb-4">
            <HardDrive className="w-5 h-5 text-naruto-orange" />
            <h3 className="text-lg font-medium text-white">Installation</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Game Installation Path
              </label>
              <div className="flex">
                <input
                  type="text"
                  name="installPath"
                  value={settings.installPath}
                  onChange={handleChange}
                  className="flex-1 bg-naruto-black rounded-l border border-naruto-black-light py-2 px-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-naruto-orange"
                />
                <button className="bg-naruto-black-light px-3 rounded-r border-t border-r border-b border-naruto-black-light">
                  <FolderOpen className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoUpdate"
                name="autoUpdate"
                checked={settings.autoUpdate}
                onChange={handleChange}
                className="w-4 h-4 bg-naruto-black border-naruto-black-light rounded focus:ring-naruto-orange"
              />
              <label htmlFor="autoUpdate" className="ml-2 text-sm text-gray-300">
                Automatically check for updates
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="launchOnStartup"
                name="launchOnStartup"
                checked={settings.launchOnStartup}
                onChange={handleChange}
                className="w-4 h-4 bg-naruto-black border-naruto-black-light rounded focus:ring-naruto-orange"
              />
              <label htmlFor="launchOnStartup" className="ml-2 text-sm text-gray-300">
                Launch on system startup
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="closeAfterLaunch"
                name="closeAfterLaunch"
                checked={settings.closeAfterLaunch}
                onChange={handleChange}
                className="w-4 h-4 bg-naruto-black border-naruto-black-light rounded focus:ring-naruto-orange"
              />
              <label htmlFor="closeAfterLaunch" className="ml-2 text-sm text-gray-300">
                Close launcher after game starts
              </label>
            </div>
          </div>
        </div>
        
        {/* Game Settings */}
        <div className="bg-naruto-black-dark/80 rounded-lg p-4 border border-naruto-black-light">
          <div className="flex items-center space-x-2 mb-4">
            <Monitor className="w-5 h-5 text-naruto-orange" />
            <h3 className="text-lg font-medium text-white">Game Settings</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Graphics Preset
              </label>
              <select
                name="graphicsPreset"
                value={settings.graphicsPreset}
                onChange={handleChange}
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-naruto-orange"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="ultra">Ultra</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="lowSpecMode"
                name="lowSpecMode"
                checked={settings.lowSpecMode}
                onChange={handleChange}
                className="w-4 h-4 bg-naruto-black border-naruto-black-light rounded focus:ring-naruto-orange"
              />
              <label htmlFor="lowSpecMode" className="ml-2 text-sm text-gray-300">
                Low spec mode (for older computers)
              </label>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Language
              </label>
              <select
                name="language"
                value={settings.language}
                onChange={handleChange}
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-naruto-orange"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="ja">Japanese</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Game Region
              </label>
              <select
                name="region"
                value={settings.region}
                onChange={handleChange}
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300 focus:outline-none focus:ring-1 focus:ring-naruto-orange"
              >
                <option value="global">Global</option>
                <option value="na">North America</option>
                <option value="eu">Europe</option>
                <option value="asia">Asia</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* System Info */}
        <div className="lg:col-span-2 bg-naruto-black-dark/80 rounded-lg p-4 border border-naruto-black-light">
          <div className="flex items-center space-x-2 mb-4">
            <Cpu className="w-5 h-5 text-naruto-orange" />
            <h3 className="text-lg font-medium text-white">System Information</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Launcher Version
              </label>
              <input
                type="text"
                value={appInfo?.version || '1.0.0'}
                readOnly
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Game Version
              </label>
              <input
                type="text"
                value="1.0.0"
                readOnly
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Launcher Path
              </label>
              <input
                type="text"
                value={appInfo?.appPath || 'C:/Users/AppData/Roaming/NarutoGameLauncher'}
                readOnly
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Platform
              </label>
              <input
                type="text"
                value={window.electron?.platform || 'windows'}
                readOnly
                className="w-full bg-naruto-black rounded border border-naruto-black-light py-2 px-3 text-gray-300"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;