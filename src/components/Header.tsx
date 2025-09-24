import { ArrowRight } from 'lucide-react';

const Header = () => {
  return (
    <header className='absolute top-6 left-6 right-6 z-50 bg-white/95 backdrop-blur-sm rounded-lg shadow-sm'>
      <div className='px-8 py-4'>
        <div className='flex items-center justify-between'>
          {/* Navigation Links */}
          <nav className='flex items-center space-x-8'>
            <a
              href='#about'
              className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm'
            >
              About
            </a>
            <a
              href='#news'
              className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm'
            >
              News
            </a>
            <a
              href='#services'
              className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm'
            >
              Services
            </a>
            <a
              href='#team'
              className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm'
            >
              Our Team
            </a>
            <a
              href='#enquiry'
              className='text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200 text-sm'
            >
              Make Enquiry
            </a>
          </nav>

          {/* Contact Us Button */}
          <button className='flex items-center space-x-2 px-5 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group'>
            <span className='text-gray-700 font-medium text-sm'>
              Contact us
            </span>
            <ArrowRight className='w-4 h-4 text-gray-600 group-hover:translate-x-0.5 transition-transform duration-200' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
