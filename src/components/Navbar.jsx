import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-yellow-400">
            Osk.BudVip
          </Link>

          {/* Menu na desktop */}
          <div className="hidden md:flex space-x-8">
            {[
              { nazwa: 'Strona główna', sciezka: '/' },
              { nazwa: 'Realizacje', sciezka: '/realizacje' },
              { nazwa: 'Kontakt', sciezka: '/kontakt' }
            ].map((item) => (
              <div key={item.nazwa} className="relative group">
                <Link
                  to={item.sciezka}
                  className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
                >
                  {item.nazwa}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-400 group-hover:w-full transition-all duration-300"/>
                </Link>
              </div>
            ))}
          </div>

          {/* Przycisk menu mobilnego */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {!isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobilne */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-black`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {[
            { nazwa: 'Strona główna', sciezka: '/' },
            { nazwa: 'Realizacje', sciezka: '/realizacje' },
            { nazwa: 'Kontakt', sciezka: '/kontakt' }
          ].map((item) => (
            <Link
              key={item.nazwa}
              to={item.sciezka}
              className="block px-3 py-2 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              {item.nazwa}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;