import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    setIsOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      // Set timeout to allow navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Obsługa scrollowania po nawigacji na stronę główną
  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      setTimeout(() => {
        const sectionId = location.state.scrollTo;
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, [location]);

  const handleNavigation = (path) => {
    setIsOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link 
            to="/" 
            className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Osk.BudVip
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('/')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Strona główna
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              O nas
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Usługi
            </button>
            <button
              onClick={() => handleNavigation('/realizacje')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Realizacje
            </button>
            <button
              onClick={() => handleNavigation('/kontakt')}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Kontakt
            </button>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black border-t border-gray-800`}>
        <div className="px-4 py-4 space-y-3">
          <button
            onClick={() => handleNavigation('/')}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            Strona główna
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            O nas
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            Usługi
          </button>
          <button
            onClick={() => handleNavigation('/realizacje')}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            Realizacje
          </button>
          <button
            onClick={() => handleNavigation('/kontakt')}
            className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
          >
            Kontakt
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;