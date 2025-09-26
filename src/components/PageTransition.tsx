import React, { useState, useEffect } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  isVisible,
}) => {
  const [showContent, setShowContent] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);

  useEffect(() => {
    if (isVisible) {
      // Show content immediately
      setShowContent(true);

      // Show welcome overlay briefly
      const overlayTimer = setTimeout(() => {
        setShowWelcomeOverlay(true);
      }, 500);

      // Hide welcome overlay
      const hideOverlayTimer = setTimeout(() => {
        setShowWelcomeOverlay(false);
      }, 3500);

      return () => {
        clearTimeout(overlayTimer);
        clearTimeout(hideOverlayTimer);
      };
    }
  }, [isVisible]);

  return (
    <div
      className={`transition-all duration-1500 ease-out ${
        showContent ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Main content */}
      <div
        className={`transition-transform duration-2000 ease-out ${
          showContent ? 'scale-100' : 'scale-105'
        }`}
      >
        {children}
      </div>

      {/* Welcome text overlay */}
      {showWelcomeOverlay && (
        <div className='fixed inset-0 z-40 pointer-events-none'>
          <div className='absolute inset-0 bg-black/20' />
          <div className='flex items-center justify-center h-full'>
            <div
              className={`text-center text-white transition-all duration-1000 ${
                showWelcomeOverlay
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <h1 className='text-3xl md:text-4xl font-light tracking-wider mb-2 art-deco-overlay'>
                Welcome to
              </h1>
              <h2 className='text-4xl md:text-5xl font-extralight tracking-[0.15em] art-deco-overlay'>
                KCA International
              </h2>

              {/* Decorative line */}
              <div className='mt-6 flex items-center justify-center'>
                <div className='w-12 h-px bg-white/40'></div>
                <div className='w-1.5 h-1.5 bg-white/60 rounded-full mx-3'></div>
                <div className='w-12 h-px bg-white/40'></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .art-deco-overlay {
          font-family: 'Georgia', 'Times New Roman', serif;
          text-shadow: 0 0 30px rgba(0, 0, 0, 0.8), 0 0 60px rgba(0, 0, 0, 0.4);
          letter-spacing: 0.1em;
        }
      `}</style>
    </div>
  );
};

export default PageTransition;
