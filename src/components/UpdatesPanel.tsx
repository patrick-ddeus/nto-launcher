import React, { useState } from 'react';
import { HardDrive, Download, CheckCircle, RefreshCw, FileDown } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const UpdatesPanel: React.FC = () => {
  const { gameInfo, checkGameUpdates } = useAppContext();
  const [isChecking, setIsChecking] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  
  // Mock data for demonstration
  const updateFiles = gameInfo?.updateFiles || [
    { name: 'game.exe', size: 25000000 },
    { name: 'assets/characters.pak', size: 50000000 },
    { name: 'assets/levels.pak', size: 75000000 }
  ];
  
  const totalSize = gameInfo?.updateSize || 150000000;
  
  const handleCheckUpdates = async () => {
    setIsChecking(true);
    try {
      await checkGameUpdates();
    } finally {
      setIsChecking(false);
    }
  };
  
  const startDownload = () => {
    setDownloading(true);
    setDownloadProgress(0);
    
    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        const newProgress = prev + Math.random() * 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          // Simulate completed download after reaching 100%
          setTimeout(() => {
            setDownloading(false);
          }, 1000);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <div className="h-full p-6 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Game Updates</h2>
        
        <button
          onClick={handleCheckUpdates}
          disabled={isChecking}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-naruto-black-light hover:bg-naruto-black text-white transition-colors"
        >
          {isChecking ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Checking...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Check for Updates</span>
            </>
          )}
        </button>
      </div>
      
      {/* Current version info */}
      <div className="bg-naruto-black-dark/80 rounded-lg p-4 mb-6 border border-naruto-black-light">
        <div className="flex items-center space-x-3">
          <HardDrive className="w-6 h-6 text-naruto-orange" />
          <div>
            <h3 className="text-lg font-medium text-white">Current Game Version</h3>
            <p className="text-gray-400">Version {gameInfo?.version || '1.0.0'} installed</p>
          </div>
        </div>
      </div>
      
      {/* Update available */}
      {gameInfo?.needsUpdate ? (
        <div className="bg-naruto-black-dark/80 rounded-lg overflow-hidden border border-naruto-black-light mb-6">
          <div className="p-4 bg-naruto-orange/10 border-b border-naruto-black-light">
            <div className="flex items-center space-x-3">
              <Download className="w-6 h-6 text-naruto-orange" />
              <div>
                <h3 className="text-lg font-medium text-white">Update Available</h3>
                <p className="text-gray-400">Version {gameInfo?.latestVersion || '1.0.1'} - {formatFileSize(totalSize)} total</p>
              </div>
            </div>
          </div>
          
          {/* Update files list */}
          <div className="p-4">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Files to Update</h4>
            
            <div className="space-y-3 mb-4">
              {updateFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileDown className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-300">{file.name}</span>
                  </div>
                  <span className="text-gray-500 text-sm">{formatFileSize(file.size)}</span>
                </div>
              ))}
            </div>
            
            {/* Download button or progress */}
            {downloading ? (
              <div className="space-y-2">
                <div className="w-full h-2 bg-naruto-black-light rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-naruto-orange"
                    style={{ width: `${downloadProgress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Downloading... {downloadProgress.toFixed(1)}%</span>
                  <span>{formatFileSize(totalSize * downloadProgress / 100)} / {formatFileSize(totalSize)}</span>
                </div>
              </div>
            ) : downloadProgress === 100 ? (
              <div className="flex items-center space-x-2 text-naruto-leaf">
                <CheckCircle className="w-5 h-5" />
                <span>Download Complete - Ready to Play!</span>
              </div>
            ) : (
              <button
                onClick={startDownload}
                className="w-full py-3 bg-naruto-orange hover:bg-naruto-orange-light text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>Download Update</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-naruto-black-dark/80 rounded-lg p-4 border border-naruto-black-light mb-6">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-naruto-leaf" />
            <div>
              <h3 className="text-lg font-medium text-white">Game is Up to Date</h3>
              <p className="text-gray-400">You have the latest version installed</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Update history */}
      <h3 className="text-xl font-bold text-white mb-4">Update History</h3>
      
      <div className="space-y-4">
        {[
          {
            version: '1.0.0',
            date: '2025-05-01',
            description: 'Initial Release - Includes basic game functionality, character selection, and first three missions.'
          },
          {
            version: '0.9.5',
            date: '2025-04-15',
            description: 'Beta Release - Fixed critical bugs and improved performance. Added tutorial missions.'
          },
          {
            version: '0.9.0',
            date: '2025-03-20',
            description: 'Alpha Release - First playable version with limited features and test environments.'
          }
        ].map((update, index) => (
          <div key={index} className="bg-naruto-black-dark/80 rounded-lg p-4 border border-naruto-black-light">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-naruto-orange">Version {update.version}</h4>
              <span className="text-sm text-gray-500">{update.date}</span>
            </div>
            <p className="text-gray-400 text-sm">{update.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpdatesPanel;