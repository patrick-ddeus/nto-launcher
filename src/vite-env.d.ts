/// <reference types="vite/client" />

interface Window {
  electron: {
    getAppInfo: () => Promise<{
      version: string;
      appPath: string;
      gamePath: string;
    }>;
    installUpdate: () => Promise<void>;
    downloadClient: (url: string) => Promise<any>;
    onDownloadProgress: (callback: any) => void;
    onUpdateStatus: (
      callback: (data: {
        status: string;
        info?: any;
        progress?: any;
        error?: string;
      }) => void
    ) => () => void;
    launchGame: () => Promise<{
      success: boolean;
      error?: string;
    }>;
    checkGameUpdates: (endpoint: string) => Promise<{
      hasUpdate: boolean;
      version: string;
      lastUpdate: string;
      downloadLink: string;
      error?: string;
    }>;
    platform: string;
  };
}
