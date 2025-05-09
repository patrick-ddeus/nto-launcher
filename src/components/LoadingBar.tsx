import React from 'react';
import sharinganImg from '../assets/sharingan.png';

type Props = {
  progress: number;
  message?: string;
  downloadSpeed?: number;
};

const getBarGradient = (progress: number) => {
  if (progress === 100) {
    return 'from-naruto-orange-dark via-naruto-orange to-naruto-orange-light';
  } else if (progress >= 50) {
    return 'from-naruto-yellow-dark via-naruto-yellow to-naruto-yellow-light';
  } else {
    return 'from-naruto-blue-dark via-naruto-blue to-naruto-blue-light';
  }
};

const ProgressBar: React.FC<Props> = ({ progress, message, downloadSpeed }) => {
  return (
    <div className='w-full relative'>
      {message && (
        <div className="flex gap-4 text-center left-[30%] -top-3 absolute font-naruto text-white animate-pulse text-base">
          <span>{message}</span> | <span> {downloadSpeed} KB/s</span>
        </div>
      )}
      <div className="relative w-full max-w-[750px] mx-auto mt-4">

        <div className="relative h-12 border border-black bg-black/80 rounded overflow-hidden">
          <div
            className={`h-full bg-gradient-to-b ${getBarGradient(progress)} transition-all duration-300 animate-gradient-x flex items-center justify-end px-2 text-xs font-bold text-white`}
            style={{ width: `${progress}%` }}
          >
            {progress !== 100 &&
              <div className="animate-spin w-5 h-5">
                <img src={sharinganImg} alt="loading" className="w-full h-full" />
              </div>}
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-naruto text-white">
            {progress}%
          </div>
        </div>
      </div>
    </div>

  );
};
export default ProgressBar;
