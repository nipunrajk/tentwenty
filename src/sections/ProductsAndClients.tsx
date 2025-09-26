import React, { useState, useEffect, useRef } from 'react';

const ProductsAndClients = () => {
  const [currentSlide, setCurrentSlide] = useState(1); // Start with middle slide (index 1)
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const sectionRef = useRef(null);

  // Interior design portfolio
  const slides = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=600&fit=crop',
      title: 'Client 2',
      location: 'New York, USA',
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=600&fit=crop',
      title: 'Client 1',
      location: 'Dubai, United Arab Emirates',
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?w=400&h=600&fit=crop',
      title: 'Client 3',
      location: 'New York, USA',
    },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Mouse/Touch handlers for dragging
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const currentX = e.clientX;
    const diff = currentX - startX;
    setDragOffset(diff);

    // Trigger slide change if dragged far enough
    const threshold = 100;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Drag right - go to previous slide
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else {
        // Drag left - go to next slide
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
      setIsDragging(false);
      setDragOffset(0);
      setStartX(0);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;

    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    setDragOffset(diff);

    const threshold = 100;
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      } else {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
      setIsDragging(false);
      setDragOffset(0);
      setStartX(0);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchEnd = handleMouseUp;

  // Add global mouse/touch event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, startX]);

  return (
    <section ref={sectionRef} className='py-20 bg-gray-50'>
      {/* Content container for text */}
      <div className='max-w-7xl mx-auto px-6'>
        {/* Animated Title */}
        <div className='text-center mb-16'>
          <h2
            className={`text-5xl md:text-6xl font-extralight text-gray-900 mb-8 transition-all duration-1000 ease-out tracking-wide ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{ fontFamily: 'Georgia, Times New Roman, serif' }}
          >
            Quality Products
          </h2>

          {/* Animated Paragraph */}
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 ease-out delay-300 font-light tracking-wide ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-12'
            }`}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
            blanditiis dignissimos excepturi eius sunt at aliquam iusto facere
            ab exercitationem pariatur provident illum repellat, necessitatibus
            sint similique repudiandae? Consectetur recusandae similique
            quibusdam quaerat ex magnam tenetur deserunt fuga voluptate
            voluptas.
          </p>
        </div>
      </div>

      {/* Full width container for images */}
      <div className='relative w-full h-[600px] mb-16 overflow-hidden'>
        {/* Left Image - extends beyond left edge */}
        <div
          className={`absolute -left-48 md:-left-32 lg:-left-20 top-12 transition-all duration-700 ease-out z-10 ${
            isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className='select-none' style={{ transform: 'rotate(-15deg)' }}>
            <img
              src={
                slides[(currentSlide - 1 + slides.length) % slides.length].image
              }
              alt='Previous'
              className='w-80 h-96 md:w-96 md:h-[480px] lg:w-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl'
              draggable={false}
            />
          </div>
        </div>

        {/* Center Image with Blue Border and Drag */}
        <div
          className={`absolute left-1/2 transform -translate-x-1/2 top-0 z-30 transition-all duration-700 ease-out cursor-grab active:cursor-grabbing ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{ transitionDelay: '800ms' }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Blue border container */}
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className='w-80 h-96 md:w-96 md:h-[480px] lg:w-[400px] lg:h-[500px] object-cover rounded-2xl select-none'
            draggable={false}
          />

          {/* Drag indicator */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='w-15 h-15 rounded-full bg-white flex items-center justify-center'>
              <span className='text-gray-800 font-medium'>Drag</span>
            </div>
          </div>
        </div>

        {/* Right Image - extends beyond right edge */}
        <div
          className={`absolute -right-48 md:-right-32 lg:-right-20 top-12 transition-all duration-700 ease-out z-10 ${
            isVisible ? 'opacity-70 translate-y-0' : 'opacity-0 translate-y-16'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          <div className='select-none' style={{ transform: 'rotate(12deg)' }}>
            <img
              src={slides[(currentSlide + 1) % slides.length].image}
              alt='Next'
              className='w-80 h-96 md:w-96 md:h-[480px] lg:w-[400px] lg:h-[500px] object-cover rounded-2xl shadow-2xl'
              draggable={false}
            />
          </div>
        </div>
      </div>

      {/* Back to contained layout for text content */}
      <div className='max-w-7xl mx-auto px-6'>
        {/* Current slide info */}
        <div className='text-center mb-8'>
          <h3
            className={`text-3xl font-bold text-gray-900 mb-2 transition-all duration-500 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            key={`title-${currentSlide}`}
          >
            {slides[currentSlide].title}
          </h3>
          <p
            className={`text-gray-600 text-lg transition-all duration-500 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            key={`location-${currentSlide}`}
          >
            {slides[currentSlide].location}
          </p>
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        .cursor-grab {
          cursor: grab;
        }

        .cursor-grabbing {
          cursor: grabbing;
        }

        .active\\:cursor-grabbing:active {
          cursor: grabbing;
        }

        /* Prevent text selection during drag */
        .select-none {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </section>
  );
};

export default ProductsAndClients;
