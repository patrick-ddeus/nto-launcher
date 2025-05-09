import { useEffect, useState } from 'react';
import Header from './components/Header';
import GamePanel from './components/GamePanel';
import NewsPanel from './components/NewsPanel';
import SettingsPanel from './components/SettingsPanel';
import UpdatesPanel from './components/UpdatesPanel';
import { AlertCircle, CheckCircle2, Download, Info } from 'lucide-react';
import { useAppContext } from './context/AppContext';
import bgImage from './assets/naruto.jpg';

function App() {
  const [activeTab, setActiveTab] = useState('game');
  const { updateStatus, appInfo, setUpdateStatus } = useAppContext();
  const [notification, setNotification] = useState<{
    type: 'info' | 'warning' | 'success' | 'error';
    message: string;
    visible: boolean;
  } | null>(null);

  useEffect(() => {
    // Set up listener for update status events
    const unsubscribe = window.electron?.onUpdateStatus((data) => {
      setUpdateStatus(data);

      // Show notification based on update status
      if (data.status === 'available') {
        showNotification('info', 'A new launcher update is available');
      } else if (data.status === 'error') {
        showNotification('error', `Update error: ${data.error || 'Unknown error'}`);
      } else if (data.status === 'ready') {
        showNotification('success', 'Update ready to install');
      }
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const showNotification = (
    type: 'info' | 'warning' | 'success' | 'error',
    message: string
  ) => {
    setNotification({ type, message, visible: true });

    // Auto-hide notification after 5 seconds
    setTimeout(() => {
      setNotification(prev => prev ? { ...prev, visible: false } : null);
    }, 5000);
  };

  const renderNotificationIcon = () => {
    if (!notification) return null;

    switch (notification.type) {
      case 'info':
        return <Info className="w-5 h-5 text-naruto-blue-light" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-naruto-yellow-dark" />;
      case 'success':
        return <CheckCircle2 className="w-5 h-5 text-naruto-leaf-light" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-naruto-red-light" />;
      default:
        return null;
    }
  };

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'game':
        return <GamePanel />;
      case 'news':
        return <NewsPanel />;
      case 'updates':
        return <UpdatesPanel />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <GamePanel />;
    }
  };

  return (
    <div className="flex h-screen bg-red-500 text-white overflow-hidden">
      {/* Sidebar navigation */}
      {/* <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} /> */}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80" />
        {/* <Header appInfo={appInfo} /> */}

        <main className="flex-1 overflow-auto relative">
          <div
            className="absolute inset-0 bg-cover bg-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b " />

          <div className="relative z-10 h-full">
            {renderActivePanel()}
          </div>
        </main>

        {/* Footer status bar */}
        <footer className="bg-naruto-black-dark h-8 flex items-center px-4 text-xs text-gray-400 border-t border-naruto-black-light">
          <div className="flex items-center space-x-2">
            <span>
              {updateStatus?.status === 'downloading'
                ? `Downloading update: ${Math.round(updateStatus.progress?.percent || 0)}%`
                : `Launcher version: ${appInfo?.version || '1.0.0'}`}
            </span>
          </div>
        </footer>
      </div>

      {/* Notification */}
      {notification?.visible && (
        <div className={`fixed bottom-10 right-10 max-w-md p-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in-right transition-all duration-300 ease-in-out
          ${notification.type === 'info' ? 'bg-naruto-blue-dark/90' : ''}
          ${notification.type === 'warning' ? 'bg-naruto-yellow-dark/90' : ''}
          ${notification.type === 'success' ? 'bg-naruto-leaf-dark/90' : ''}
          ${notification.type === 'error' ? 'bg-naruto-red-dark/90' : ''}
        `}>
          {renderNotificationIcon()}
          <span>{notification.message}</span>
          <button
            className="ml-3 text-white/70 hover:text-white transition-colors"
            onClick={() => setNotification(prev => prev ? { ...prev, visible: false } : null)}
          >
            ✕
          </button>
        </div>
      )}

      {/* Update available notification */}
      {updateStatus?.status === 'ready' && (
        <div className="fixed bottom-20 right-10 bg-naruto-orange-dark/90 p-4 rounded-lg shadow-lg max-w-md animate-glow">
          <div className="flex items-center space-x-3">
            <Download className="w-5 h-5 text-white" />
            <span>Update ready to install!</span>
          </div>
          <div className="mt-2 flex space-x-2">
            <button
              className="px-4 py-1 bg-naruto-orange hover:bg-naruto-orange-light text-white rounded transition-colors"
              onClick={() => window.electron?.installUpdate()}
            >
              Install Now
            </button>
            <button
              className="px-4 py-1 bg-naruto-black-light hover:bg-naruto-black text-white rounded transition-colors"
              onClick={() => setUpdateStatus(prev => ({ ...prev, status: 'dismissed' }))}
            >
              Later
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;