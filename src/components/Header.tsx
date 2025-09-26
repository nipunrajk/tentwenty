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
              className='text-gray-700 hover:text-gray-900 font-light transition-colors duration-200 text-sm tracking-wide'
            >
              About
            </a>
            <a
              href='#portfolio'
              className='text-gray-700 hover:text-gray-900 font-light transition-colors duration-200 text-sm tracking-wide'
            >
              News
            </a>
            <a
              href='#services'
              className='text-gray-700 hover:text-gray-900 font-light transition-colors duration-200 text-sm tracking-wide'
            >
              Services
            </a>
            <a
              href='#team'
              className='text-gray-700 hover:text-gray-900 font-light transition-colors duration-200 text-sm tracking-wide'
            >
              Our Team
            </a>
            <a
              href='#contact'
              className='text-gray-700 hover:text-gray-900 font-light transition-colors duration-200 text-sm tracking-wide'
            >
              Make Enquiry
            </a>
          </nav>

          <button className='flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-sm hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 group'>
            <span className='text-gray-700 font-light text-sm tracking-wide'>
              Contact Us
            </span>
            <ArrowRight className='w-4 h-4 text-gray-600 group-hover:translate-x-0.5 transition-transform duration-200' />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
