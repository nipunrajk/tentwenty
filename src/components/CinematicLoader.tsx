import React, { useState, useEffect } from 'react';

interface CinematicLoaderProps {
  onLoadingComplete: () => void;
}

const CinematicLoader: React.FC<CinematicLoaderProps> = ({
  onLoadingComplete,
}) => {
  const [stage, setStage] = useState<'loading' | 'transitioning' | 'complete'>(
    'loading'
  );
  const [showWelcomeText, setShowWelcomeText] = useState(false);

  useEffect(() => {
    // Show welcome text after brief delay
    const welcomeTimer = setTimeout(() => {
      setShowWelcomeText(true);
    }, 800);

    // Start transition after 3 seconds
    const transitionTimer = setTimeout(() => {
      setStage('transitioning');
    }, 3000);

    // Complete loading after transition
    const completeTimer = setTimeout(() => {
      setStage('complete');
      onLoadingComplete();
    }, 5000);

    return () => {
      clearTimeout(welcomeTimer);
      clearTimeout(transitionTimer);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete]);

  if (stage === 'complete') return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
        stage === 'transitioning' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Dark background with animated rays */}
      <div className='absolute inset-0 bg-gray-900 overflow-hidden'>
        {/* Animated light rays */}
        <div className='absolute inset-0 flex items-center justify-center'>
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className='absolute w-px h-full bg-gradient-to-t from-transparent via-white/10 to-transparent origin-bottom animate-pulse'
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: '3s',
              }}
            />
          ))}
        </div>

        {/* Central glow effect */}
        <div className='absolute inset-0 flex items-center justify-center'>
          <div className='w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse' />
        </div>
      </div>

      {/* Content container */}
      <div className='relative z-10 flex flex-col items-center justify-center h-full text-white'>
        {/* Logo placeholder - minimalist design */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            stage === 'transitioning'
              ? 'opacity-0 scale-95'
              : 'opacity-100 scale-100'
          }`}
        >
          <div className='relative'>
            {/* Geometric logo design */}
            <div className='w-24 h-24 border-2 border-white/80 rotate-45 flex items-center justify-center'>
              <div className='w-12 h-12 border border-white/60 rotate-45'>
                <div className='w-full h-full flex items-center justify-center'>
                  <div className='w-2 h-2 bg-white rounded-full animate-pulse' />
                </div>
              </div>
            </div>

            {/* Logo text */}
            <div className='absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
              <span className='text-sm font-light tracking-[0.3em] text-white/70'>
                KCA
              </span>
            </div>
          </div>
        </div>

        {/* KCA International text with scale animation */}
        <div
          className={`text-center transition-all duration-2000 ease-out ${
            showWelcomeText ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          } ${stage === 'transitioning' ? 'opacity-0 scale-95' : ''}`}
        >
          <h1 className='text-6xl md:text-7xl lg:text-8xl font-extralight tracking-[0.15em] art-deco-text'>
            KCA International
          </h1>

          {/* Decorative line */}
          <div className='mt-8 flex items-center justify-center'>
            <div className='w-20 h-px bg-white/30'></div>
            <div className='w-2 h-2 bg-white/50 rounded-full mx-4'></div>
            <div className='w-20 h-px bg-white/30'></div>
          </div>
        </div>

        {/* Loading indicator */}
        <div
          className={`absolute bottom-16 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 ${
            stage === 'transitioning' ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className='flex space-x-1'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='w-1 h-1 bg-white/60 rounded-full animate-pulse'
                style={{ animationDelay: `${i * 0.3}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .art-deco-text {
          font-family: 'Georgia', 'Times New Roman', serif;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
          letter-spacing: 0.1em;
        }

        @keyframes rayPulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }

        .animate-pulse {
          animation: rayPulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default CinematicLoader;
