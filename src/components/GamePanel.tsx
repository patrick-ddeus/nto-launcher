import React, { useEffect, useState } from 'react';
import { Play, AlertTriangle, RefreshCw, Download } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import ntoIcon from '../assets/icon.png';
import ProgressBar from './LoadingBar';

const GamePanel: React.FC = () => {
  const { gameInfo, launchGame, setGameInfo } = useAppContext();
  console.log("🚀 ~ gameInfo:", gameInfo)
  const [isLaunching, setIsLaunching] = useState(false);
  const [launchError, setLaunchError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | null>(null);

  const [progress, setProgress] = useState(0);
  const [downloadSpeed, setDownloadSpeed] = useState(0);

  useEffect(() => {
    if (!gameInfo?.needsUpdate) {
      setProgress(100)
    } else {
      setProgress(0)
    }
  }, [gameInfo])

  useEffect(() => {
    window.electron?.onDownloadProgress(({ percent, speed }: { percent: number, speed: number }) => {
      setProgress(percent);
      setDownloadSpeed(speed);
    });
  }, []);

  const handleLaunchGame = async () => {
    setIsLaunching(true);
    setLaunchError(null);

    try {
      const result = await launchGame();
      if (!result.success) {
        setLaunchError(result.error || 'Failed to launch game');
      }
    } catch (error) {
      setLaunchError('Unexpected error launching game');
      console.error(error);
    } finally {
      setIsLaunching(false);
    }
  };

  const handleOnButtonClick = async () => {
    if (gameInfo?.installed && !gameInfo.needsUpdate) {
      handleLaunchGame()
      return
    }

    setIsChecking(true);
    setLoadingMessage('Baixando arquivos do cliente...');

    try {
      await window.electron.downloadClient(gameInfo?.downloadLink as string);
      setLoadingMessage('Concluído! Pronto para jogar');
      setGameInfo((prev) => ({
        ...prev,
        needsUpdate: false,
        installed: true,
      }));
    } catch (err) {
      setLoadingMessage('Erro ao baixar');
      console.error(err);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-6">
      <div className="relative w-full h-[100vh] rounded-2xl overflow-hidden mb-6">

        <div className='flex items-center justify-center w-full animate-float'>
          <img src={ntoIcon} className='h-56'></img>
        </div>

        <div className="absolute bottom-0 right-[0] p-6 w-full">
          <iframe
            src="https://discord.com/widget?id=702964219871625307&theme=dark"
            width="250px"
            height="300px"
            allowTransparency={true}
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          />

          {launchError && (
            <div className="mt-4 p-3 bg-naruto-red-dark/80 rounded-lg flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-naruto-yellow" />
              <span>{launchError}</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="font-naruto bg-gradient-to-br border-transparent  rounded-xl p-5  border flex flex-col gap-2">
          <div className="flex items-center gap-2 text-naruto-orange">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            <h3 className="text-md font-semibold uppercase tracking-wide font-naruto">Status do servidor</h3>
          </div>
          <div className="flex justify-between text-sm text-gray-200 px-2">
            <span>Online:</span>
            <div className='gap-2 flex'>
              <span className="font-bold text-green-300">248</span>
              <span className="font-bold text-green-300">Jogadores</span>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 px-2">
            <span>Uptime:</span>
            <span>99.98%</span>
          </div>
          <div className="ml-2 text-sm">
            <p className="text-orange-100 font-semibold">Versão atual:</p>
            <p className="text-lime-300 font-bold text-lg">v1.0.0</p>

          </div>
        </div>
        <div></div>
      </div>

      <div className="flex space-x-4 mt-8 justify-end items-center ">
        {!isLaunching && (
          <>
            {/* <div className='w-full flex justify-center -mb-2 items-center'>
              <p>Baixando...</p>
            </div> */}
            <ProgressBar progress={progress} message={loadingMessage || undefined} downloadSpeed={downloadSpeed} />
          </>
        )}

        <div className='cursor-pointer transform transition-transform duration-200 hover:scale-105 mt-4'>
          {/* <img src={cordaBg}></img> */}

          <>
            {isLaunching ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Launching...</span>
              </>
            ) : (
              <button
                onClick={handleOnButtonClick}
                disabled={isChecking || isLaunching}
                className={`flex items-center space-x-2 px-12 py-3 rounded-lg text-white font-medium transition-all duration-200  
                bg-gradient-to-b ${gameInfo?.installed
                    ? 'bg-naruto-orange hover:bg-naruto-orange-light'
                    : 'bg-gray-600 '
                  } ${gameInfo?.needsUpdate
                    ? 'from-naruto-blue-dark via-naruto-blue to-naruto-blue-light animate-glow-blue'
                    : 'animate-glow from-naruto-orange-dark via-naruto-orange to-naruto-orange-light'}`}
              >
                {isChecking ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin mb-1" />
                    <span className='animate-pulse font-naruto'>Baixando...</span>
                  </>
                ) : (
                  <>
                    {gameInfo?.needsUpdate ? <Download className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    <span className="font-naruto mt-1">{gameInfo?.needsUpdate ? 'Atualizar' : 'Jogar'}</span>
                  </>
                )}
              </button>
              // <div className='font-naruto flex items-center gap-3 font-bold text-2xl'>
              //   <Play className="w-5 h-5" />
              //   <span>Jogar</span>
              // </div>
            )}

          </>
        </div>


      </div>
    </div >
  );
};

export default GamePanel;