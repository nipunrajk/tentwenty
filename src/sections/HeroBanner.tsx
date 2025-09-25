import React from 'react';

const HeroBanner = (): React.ReactElement => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  // Sample farm images - replace with your actual images
  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&h=1080&fit=crop',
      thumbnail:
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
      title: 'From Our Farms',
      subtitle: 'To Your Hands',
      description: 'Premium organic vegetables',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1920&h=1080&fit=crop',
      thumbnail:
        'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      title: 'Fresh Harvest',
      subtitle: 'Every Season',
      description: 'Sustainable farming practices',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
      thumbnail:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      title: 'Quality Assured',
      subtitle: 'Farm to Table',
      description: 'Locally grown produce',
    },
    {
      id: 4,
      image:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920&h=1080&fit=crop',
      thumbnail:
        'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      title: 'Natural Growing',
      subtitle: 'Pure & Organic',
      description: 'Chemical-free cultivation',
    },
  ];

  const nextSlide = () => {
    setIsTransitioning(true);

    // After transition completes, update slide and reset
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsTransitioning(false);
      setProgress(0);
    }, 1000); // Match transition duration
  };

  // Progress animation and auto-advance
  React.useEffect(() => {
    if (isTransitioning) return; // Don't update progress during transition

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setTimeout(() => {
            nextSlide();
          }, 100);
          return 0;
        }
        return prev + 2; // Adjust speed by changing this value (2% every 100ms = 5s total)
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentSlide, isTransitioning]);

  // Calculate border stroke-dasharray and stroke-dashoffset for progress
  const borderLength = 2 * (184 + 120);
  const strokeDashoffset = borderLength - (borderLength * progress) / 100;

  // Get next slide index for transition
  const nextSlideIndex = (currentSlide + 1) % slides.length;

  return (
    <section className='relative h-screen overflow-hidden'>
      {/* Current slide background */}
      <div
        className='absolute inset-0 bg-cover bg-center transition-none'
        style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
      />

      {/* Single strip reveal transition overlay */}
      {isTransitioning && (
        <div className='absolute inset-0 z-5'>
          <div
            className='absolute inset-0 bg-cover bg-center'
            style={{
              backgroundImage: `url('${slides[nextSlideIndex].image}')`,
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              animation: 'singleStripReveal 1s ease-out forwards',
            }}
          />
        </div>
      )}

      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/30 z-10'></div>

      <div className='relative z-20 flex flex-col justify-center items-start h-full text-white px-6 max-w-7xl mx-auto'>
        {/* Welcome text */}
        <p className='text-lg font-light mb-4 opacity-90'>
          Welcome To TwinTwenty Farms
        </p>

        {/* Main heading with transition animation */}
        <div className='overflow-hidden'>
          <h1
            key={currentSlide} // Key change triggers re-animation
            className='text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8 animate-slideInUp'
          >
            {slides[currentSlide].title}
            <br />
            {slides[currentSlide].subtitle}
          </h1>
        </div>

        {/* Slider controls container */}
        <div className='flex items-end space-x-8'>
          {/* Thumbnail with animated border */}
          <div className='relative'>
            {/* Outer container for border */}
            <div className='relative w-48 h-32 p-3'>
              {/* Inner image container */}
              <div className='w-full h-full rounded-md overflow-hidden relative bg-black/20'>
                <img
                  src={slides[currentSlide].thumbnail}
                  alt='Current slide thumbnail'
                  className='w-full h-full object-cover'
                />

                {/* "Next" label overlay */}
                <div className='absolute inset-0 bg-black/40 flex items-center justify-center'>
                  <span className='text-white font-medium text-lg'>Next</span>
                </div>
              </div>

              {/* Animated border SVG */}
              <svg
                className='absolute inset-0 w-full h-full pointer-events-none'
                viewBox='0 0 192 128'
                fill='none'
              >
                <rect
                  x='4'
                  y='4'
                  width='184'
                  height='120'
                  stroke='rgba(255,255,255,0.3)'
                  strokeWidth='2'
                  rx='8'
                  fill='none'
                />
                <rect
                  x='4'
                  y='4'
                  width='184'
                  height='120'
                  stroke='white'
                  strokeWidth='3'
                  rx='8'
                  fill='none'
                  strokeDasharray={borderLength}
                  strokeDashoffset={strokeDashoffset}
                  className='transition-all duration-100 ease-linear'
                  style={{
                    strokeLinecap: 'round',
                  }}
                />
              </svg>
            </div>

            {/* Slide description */}
            <div className='mt-3 text-sm text-white/70'>
              {slides[currentSlide].description}
            </div>
          </div>

          {/* Current/Total indicator */}
          <div className='flex items-center space-x-4'>
            <span className='text-2xl font-mono text-white'>
              {String(currentSlide + 1).padStart(2, '0')}
            </span>

            {/* Progress line */}
            <div className='w-24 h-px bg-white/30 relative'>
              <div
                className='h-full bg-white transition-all duration-100 ease-linear'
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className='text-2xl font-mono text-white/50'>
              {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>

      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes singleStripReveal {
          0% {
            transform: scaleY(0);
          }
          100% {
            transform: scaleY(1);
          }
        }

        @keyframes slideInUp {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroBanner;
