/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
interface AppContextProps {
  appInfo: {
    version: string;
    appPath: string;
    gamePath: string;
  } | null;
  updateStatus: {
    status: string;
    info?: unknown;
    progress?: unknown;
    error?: string;
  } | null;
  gameInfo: {
    installed: boolean;
    version: string;
    needsUpdate: boolean;
    downloadLink: string;
    lastUpdate: string;
  } | null;
  setUpdateStatus: React.Dispatch<React.SetStateAction<any>>;
  setGameInfo: React.Dispatch<React.SetStateAction<{
    installed: boolean;
    version: string;
    needsUpdate: boolean;
    downloadLink: string;
    lastUpdate: string;
  }>>;
  checkGameUpdates: () => Promise<any>;
  launchGame: () => Promise<any>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [appInfo, setAppInfo] = useState<null | {
    version: string;
    appPath: string;
    gamePath: string;
  }>(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [gameInfo, setGameInfo] = useState({
    installed: true,
    version: '4.0',
    needsUpdate: false,
    downloadLink: '',
    lastUpdate: ''
  });

  useEffect(() => {
    const fetchAppInfo = async () => {
      if (window.electron) {
        try {
          const info = await window.electron.getAppInfo();
          setAppInfo(info);
        } catch (error) {
          console.error('Failed to fetch app info:', error);
        }
      }
    };

    fetchAppInfo();
    checkGameUpdates()
  }, []);

  const checkGameUpdates = async () => {
    if (!window.electron) return null;

    try {
      const updateInfo = await window.electron.checkGameUpdates('https://nto-launcher-api.onrender.com/server-info');

      if (updateInfo.hasUpdate) {
        setGameInfo(prev => ({
          ...prev,
          needsUpdate: true,
          installed: false,
          latestVersion: updateInfo.version,
          downloadLink: updateInfo.downloadLink,
          lastUpdate: updateInfo.lastUpdate
        }));
      }

      return updateInfo;
    } catch (error) {
      console.error('Failed to check for game updates:', error);
      return { hasUpdate: false, error };
    }
  };

  const launchGame = async () => {
    if (!window.electron) return { success: false, error: 'Electron not available' };

    try {
      return await window.electron.launchGame();
    } catch (error) {
      console.error('Failed to launch game:', error);
      return { success: false, error };
    }
  };

  return (
    <AppContext.Provider
      value={{
        appInfo,
        updateStatus,
        gameInfo,
        setUpdateStatus,
        setGameInfo,
        checkGameUpdates,
        launchGame,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};