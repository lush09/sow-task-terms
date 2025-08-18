import React, { useState } from 'react';
import '../index.css';

const Header = ({ onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const toggleLanguageMenu = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    setIsOpen(false);
    // Notify parent component about language change
    if (onLanguageChange) {
      onLanguageChange(language);
    }
  };

  return (
    <header className="w-full flex items-center p-4 lg:p-6 xl:p-8 bg-transparent max-w-7xl mx-auto z-50">
      {/* Logo - hidden on mobile */}
      <div className="hidden lg:flex items-center">
        <img 
          src="https://storage.123fakturera.se/public/icons/diamond.png" 
          alt="Logo" 
          className="h-8 w-auto"
        />
      </div>
      
      {/* Mobile menu button */}
      <button 
        className="lg:hidden text-white focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          {isMobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          )}
        </svg>
      </button>
      
      <div className="flex-1 flex justify-end items-center">
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 mr-8">
          <a href="#home" className="text-white hover:text-gray-200 font-medium text-base xl:text-lg transition-colors">Home</a>
          <a href="#order" className="text-white hover:text-gray-200 font-medium text-base xl:text-lg transition-colors">Order</a>
          <a href="#customers" className="text-white hover:text-gray-200 font-medium text-base xl:text-lg transition-colors">Our Customers</a>
          <a href="#about" className="text-white hover:text-gray-200 font-medium text-base xl:text-lg transition-colors">About us</a>
          <a href="#contact" className="text-white hover:text-gray-200 font-medium text-base xl:text-lg transition-colors">Contact us</a>
        </nav>
        
          {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-gray-800 lg:hidden z-40">
            <div className="flex flex-col space-y-4 p-4">
              <a href="#home" className="text-white hover:text-gray-200 font-medium py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
              <a href="#order" className="text-white hover:text-gray-200 font-medium py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Order</a>
              <a href="#customers" className="text-white hover:text-gray-200 font-medium py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Our Customers</a>
              <a href="#about" className="text-white hover:text-gray-200 font-medium py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>About us</a>
              <a href="#contact" className="text-white hover:text-gray-200 font-medium py-2 px-4 rounded hover:bg-gray-700" onClick={() => setIsMobileMenuOpen(false)}>Contact us</a>
            </div>
          </div>
        )}
      </div>
      
      {/* Language Selector - Always visible */}
      <div className="relative">
        <button 
          className="text-white hover:text-gray-200 px-3 py-2 rounded-md font-medium flex items-center space-x-3 transition-colors"
          onClick={toggleLanguageMenu}
        >
          <div className="flex items-center space-x-2">
            <span className="text-base xl:text-lg">{currentLanguage}</span>
            <img 
              src={currentLanguage === 'English' ? 
                'https://storage.123fakturere.no/public/flags/GB.png' : 
                'https://storage.123fakturere.no/public/flags/SE.png'}
              alt={currentLanguage}
              className="h-4 w-6 object-cover rounded"
            />
          </div>
        </button>
        {isOpen && (
          <div className="absolute right-0 bg-white rounded-md shadow-lg py-1 z-50">
            <div 
              className="px-4 py-2 text-lg font-medium space-x-2 text-gray-700 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => changeLanguage('Svenska')}
            >
              <span>Svenska</span>
              <img 
                src="https://storage.123fakturere.no/public/flags/SE.png" 
                alt="Svenska" 
                className="h-4 w-6 object-cover rounded"
              />
            </div>
            <div 
              className="px-4 py-2 text-lg font-medium space-x-2 text-gray-700 hover:bg-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => changeLanguage('English')}
            >
              <span>English</span>
              <img 
                src="https://storage.123fakturere.no/public/flags/GB.png" 
                alt="English" 
                className="h-4 w-6 object-cover rounded"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;