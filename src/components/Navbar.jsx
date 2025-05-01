import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (e, target) => {
    e.preventDefault();
    if (target.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: target } });
      } else {
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(target);
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const { state } = location;
    if (state?.scrollTo) {
      setTimeout(() => {
        document.querySelector(state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <nav className="fixed w-full z-50 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-3 text-xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors"
          >
            <span>Osk.BudVip</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {[
              { name: 'O nas', target: '#about' },
              { name: 'Usługi', target: '#services' },
              { name: 'Realizacje', target: '/realizacje' },
              { name: 'Kontakt', target: '/kontakt' }
            ].map((item) => (
              <div key={item.name} className="relative group">
                <a
                  href={item.target}
                  onClick={(e) => handleNavigation(e, item.target)}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            { name: 'O nas', target: '#about' },
            { name: 'Usługi', target: '#services' },
            { name: 'Realizacje', target: '/realizacje' },
            { name: 'Kontakt', target: '/kontakt' }
          ].map((item) => (
            <a
              key={item.name}
              href={item.target}
              onClick={(e) => handleNavigation(e, item.target)}
              className="block px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 text-base font-medium"
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;