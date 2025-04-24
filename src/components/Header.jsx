import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update the scrollToSection function:
  const scrollToSection = (sectionId) => {
    const currentPath = window.location.pathname;
    
    if (currentPath !== '/') {
      // If not on home page, navigate and scroll
      navigate('/');
      // Wait for navigation to complete then scroll
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerOffset = 100; // Account for fixed header height
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    } else {
      // If on home page, just scroll
      const section = document.getElementById(sectionId);
      if (section) {
        const headerOffset = 100;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }
    setIsMenuOpen(false);
  };

  // Add useEffect to handle initial scroll if URL has hash
  useEffect(() => {
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const headerOffset = 100;
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);
  
  // Sprawdzenie czy jesteśmy na stronie głównej
  const location = window.location.pathname;
  const isHomePage = location === '/' || location === '/index.html';

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-3 bg-black shadow-lg' : 'py-5 bg-black/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-3xl font-bold text-yellow-400">
            Osk.BudVip
          </Link>
          
          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8 items-center">
            <NavLink to="/" isScrollLink={false}>Strona Główna</NavLink>
            <button 
              onClick={() => scrollToSection('services')}
              className="relative text-white hover:text-yellow-400 transition-colors duration-300 font-medium group"
            >
              Usługi
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="relative text-white hover:text-yellow-400 transition-colors duration-300 font-medium group"
            >
              O Nas
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <NavLink to="/realizacje" isScrollLink={false}>Realizacje</NavLink>
            <NavLink to="/kontakt" isScrollLink={false}>Kontakt</NavLink>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-black overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="p-6 flex flex-col space-y-4">
          <MobileNavLink to="/" onClick={() => setIsMenuOpen(false)}>Strona Główna</MobileNavLink>
          <button 
            onClick={() => scrollToSection('services')}
            className="text-white hover:text-yellow-400 transition-colors duration-300 text-lg text-left"
          >
            Usługi
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-yellow-400 transition-colors duration-300 text-lg text-left"
          >
            O Nas
          </button>
          <MobileNavLink to="/realizacje" onClick={() => setIsMenuOpen(false)}>Realizacje</MobileNavLink>
          <MobileNavLink to="/kontakt" onClick={() => setIsMenuOpen(false)}>Kontakt</MobileNavLink>
        </nav>
      </div>
    </header>
  );
}

// Komponent dla linków nawigacyjnych
const NavLink = ({ to, children }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (to === '/') {
      e.preventDefault();
      const currentPath = window.location.pathname;
      
      if (currentPath === '/') {
        // If already on home page, smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // If on different page, navigate to home and scroll to top
        navigate('/');
        window.scrollTo({
          top: 0
        });
      }
    }
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className="relative text-white hover:text-yellow-400 transition-colors duration-300 font-medium group"
    >
      {children}
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

// Komponent dla mobilnych linków nawigacyjnych
const MobileNavLink = ({ to, children, onClick }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    if (to === '/') {
      e.preventDefault();
      const currentPath = window.location.pathname;
      
      if (currentPath === '/') {
        // If already on home page, smooth scroll to top
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // If on different page, navigate to home and scroll to top
        navigate('/');
        window.scrollTo({
          top: 0
        });
      }
    }
    onClick?.(); // Call the original onClick if provided
  };

  return (
    <Link 
      to={to} 
      onClick={handleClick}
      className="text-white hover:text-yellow-400 transition-colors duration-300 text-lg"
    >
      {children}
    </Link>    
  );
};

export default Header;
