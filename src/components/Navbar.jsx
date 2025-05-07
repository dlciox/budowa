import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleHomeNavigation = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
    setIsOpen(false);
  };

  const handleSectionNavigation = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo z większym marginesem */}
          <div className="flex-shrink-0 mr-8">
            <button
              onClick={handleHomeNavigation}
              className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors py-2"
            >
              Osk.BudVip
            </button>
          </div>

          {/* Menu na desktop z lepszymi marginesami */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={handleHomeNavigation}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group"
            >
              <span>Strona główna</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </button>
            <button
              onClick={() => handleSectionNavigation('about')}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group"
            >
              <span>O nas</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </button>
            <button
              onClick={() => handleSectionNavigation('services')}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group"
            >
              <span>Usługi</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </button>
            <Link
              to="/realizacje"
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group"
            >
              <span>Realizacje</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </Link>
            <Link
              to="/kontakt"
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group"
            >
              <span>Kontakt</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </Link>
          </div>

          {/* Przycisk menu mobilnego z lepszymi marginesami */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <svg 
              className="h-7 w-7" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Menu mobilne z lepszymi marginesami */}
      <div 
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } md:hidden fixed top-20 left-0 right-0 bottom-0 bg-black transition-all duration-300 ease-in-out z-50`}
      >
        <div className="px-6 py-6 space-y-4 bg-black border-t border-gray-800">
          <button
            onClick={handleHomeNavigation}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-lg"
          >
            Strona główna
          </button>
          <button
            onClick={() => handleSectionNavigation('about')}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-lg"
          >
            O nas
          </button>
          <button
            onClick={() => handleSectionNavigation('services')}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-lg"
          >
            Usługi
          </button>
          <Link
            to="/realizacje"
            className="block w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-lg"
          >
            Realizacje
          </Link>
          <Link
            to="/kontakt"
            className="block w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors text-lg"
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;