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
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    setIsOpen(false);
  };

  const handleSectionNavigation = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  };

  return (    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo */}
          <div className="flex-shrink-0 mr-8">
            <button
              onClick={handleHomeNavigation}
              className="text-2xl md:text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors py-2"
              aria-label="Przejdź do strony głównej"
              type="button"
            >
              Osk.BudVip
            </button>
          </div>

          {/* Menu desktopowe */}
          <div className="hidden md:flex items-center space-x-10">
            <button
              onClick={handleHomeNavigation}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group cursor-pointer"
              type="button"
            >
              <span>Strona główna</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </button>
            <button
              onClick={() => handleSectionNavigation("about")}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group cursor-pointer"
              type="button"
            >
              <span>O nas</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400 transform scale-x-0 transition-transform origin-left group-hover:scale-x-100"></span>
            </button>
            <button
              onClick={() => handleSectionNavigation("services")}
              className="text-gray-300 hover:text-yellow-400 transition-colors px-4 py-3 text-lg font-bold relative group cursor-pointer"
              type="button"
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

          {/* Przycisk menu mobilnego */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-3 rounded-full text-gray-400 hover:text-yellow-400 transition-colors"
            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
            type="button"
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

      {/* Menu mobilne */}      <div
        className={`${
          isOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
        } md:hidden fixed top-20 left-0 right-0 bottom-0 bg-black transition-all duration-300 ease-in-out z-50`}
        aria-hidden={!isOpen}
      >
        <div className="px-6 py-6 space-y-4 border-t border-gray-800">
          <button
            onClick={handleHomeNavigation}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-lg transition-colors text-lg cursor-pointer flex items-center"
            type="button"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Strona główna
          </button>
          <button
            onClick={() => handleSectionNavigation("about")}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-lg transition-colors text-lg cursor-pointer flex items-center"
            type="button"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            O nas
          </button>
          <button
            onClick={() => handleSectionNavigation("services")}
            className="w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-lg transition-colors text-lg cursor-pointer flex items-center"
            type="button"
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Usługi
          </button>
          <Link
            to="/realizacje"
            className="block w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-lg transition-colors text-lg flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Realizacje
          </Link>
          <Link
            to="/kontakt"
            className="block w-full text-left px-5 py-4 text-gray-300 hover:bg-yellow-400/20 hover:text-yellow-400 rounded-lg transition-colors text-lg flex items-center"
            onClick={() => setIsOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
