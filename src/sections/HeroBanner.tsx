import React from 'react';

const HeroBanner = (): React.ReactElement => {
  return (
    <section
      className='relative h-screen bg-cover bg-center'
      style={{ backgroundImage: "url('/mockups/moshholder.jpg')" }}
    >
      {/* Overlay for better text readability */}
      <div className='absolute inset-0 bg-black/20'></div>

      <div className='relative z-10 flex flex-col justify-center items-start h-full text-white px-6 max-w-7xl mx-auto'>
        {/* Welcome text */}
        <p className='text-lg font-light mb-4 opacity-90'>
          Welcome To TwinTwenty Farms
        </p>

        {/* Main heading */}
        <h1 className='text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8'>
          From Our Farms
          <br />
          To Your Hands
        </h1>

        {/* Small image/thumbnail */}
        <div className='flex items-end space-x-4'>
          <div className='w-24 h-16 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md overflow-hidden'>
            <img
              src='/mockups/moshholder.jpg'
              alt='Farm thumbnail'
              className='w-full h-full object-cover opacity-80'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
