import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const { state } = location;
    if (state?.scrollTo) {
      setTimeout(() => {
        const element = document.getElementById(state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors">
            Osk.BudVip
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {[
              { nazwa: 'Strona Główna', akcja: () => navigate('/') },
              { nazwa: 'O nas', akcja: () => scrollToSection('about') },
              { nazwa: 'Usługi', akcja: () => scrollToSection('services') },
              { nazwa: 'Realizacje', akcja: () => navigate('/realizacje') },
              { nazwa: 'Kontakt', akcja: () => navigate('/kontakt') }
            ].map((item) => (
              <div key={item.nazwa} className="relative group">
                <button
                  onClick={item.akcja}
                  className="text-gray-300 hover:text-white px-3 py-2 text-lg font-medium transition-colors"
                >
                  {item.nazwa}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"/>
                </button>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-3"
            >
              {!isOpen ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black border-t border-gray-800`}>
        <div className="px-4 py-4 space-y-3">
          {[
            { nazwa: 'Strona Główna', akcja: () => navigate('/') },
            { nazwa: 'O nas', akcja: () => scrollToSection('about') },
            { nazwa: 'Usługi', akcja: () => scrollToSection('services') },
            { nazwa: 'Realizacje', akcja: () => navigate('/realizacje') },
            { nazwa: 'Kontakt', akcja: () => navigate('/kontakt') }
          ].map((item) => (
            <button
              key={item.nazwa}
              onClick={item.akcja}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg text-lg transition-colors"
            >
              {item.nazwa}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;