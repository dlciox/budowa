import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Zamykamy menu po zmianie ścieżki
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
    window.scrollTo(0, 0); // Przewiń na górę po nawigacji
  };

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation('/')}
              className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            >
              Osk.BudVip
            </button>
          </div>

          {/* Menu na desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className={`text-${location.pathname === '/' ? 'yellow-400' : 'gray-300'} hover:text-yellow-400 transition-colors px-3 py-2`}
            >
              Strona główna
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-3 py-2"
            >
              O nas
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-3 py-2"
            >
              Usługi
            </button>
            <button
              onClick={() => handleNavigation('/realizacje')}
              className={`text-${location.pathname.includes('/realizacje') ? 'yellow-400' : 'gray-300'} hover:text-yellow-400 transition-colors px-3 py-2`}
            >
              Realizacje
            </button>
            <button
              onClick={() => handleNavigation('/kontakt')}
              className={`text-${location.pathname === '/kontakt' ? 'yellow-400' : 'gray-300'} hover:text-yellow-400 transition-colors px-3 py-2`}
            >
              Kontakt
            </button>
          </div>

          {/* Przycisk menu mobilnego */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <svg 
              className="h-6 w-6" 
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

      {/* Menu mobilne */}
      <div 
        className={`${
          isOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        } md:hidden fixed top-16 left-0 right-0 bottom-0 bg-black transition-all duration-300 ease-in-out z-50`}
      >
        <div className="px-4 py-4 space-y-2 bg-black border-t border-gray-800">
          <button
            onClick={() => handleNavigation('/')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              location.pathname === '/' ? 'bg-yellow-400 text-black' : 'text-gray-300'
            } hover:bg-yellow-400 hover:text-black transition-colors`}
          >
            Strona główna
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors"
          >
            O nas
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="w-full text-left px-4 py-3 text-gray-300 hover:bg-yellow-400 hover:text-black rounded-lg transition-colors"
          >
            Usługi
          </button>
          <button
            onClick={() => handleNavigation('/realizacje')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              location.pathname.includes('/realizacje') ? 'bg-yellow-400 text-black' : 'text-gray-300'
            } hover:bg-yellow-400 hover:text-black transition-colors`}
          >
            Realizacje
          </button>
          <button
            onClick={() => handleNavigation('/kontakt')}
            className={`w-full text-left px-4 py-3 rounded-lg ${
              location.pathname === '/kontakt' ? 'bg-yellow-400 text-black' : 'text-gray-300'
            } hover:bg-yellow-400 hover:text-black transition-colors`}
          >
            Kontakt
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;