import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className="flex items-center space-x-3 text-xl font-bold text-gray-900"
          >
            <span>Osk.BudVip</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className={`text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/" ? "bg-gray-100" : ""
              }`}
            >
              Strona główna
            </Link>
            <Link
              to="/realizacje"
              className={`text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname.includes("/realizacje") ? "bg-gray-100" : ""
              }`}
            >
              Realizacje
            </Link>
            <Link
              to="/kontakt"
              className={`text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === "/kontakt" ? "bg-gray-100" : ""
              }`}
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:hidden bg-white shadow-lg`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-100 ${
              location.pathname === "/" ? "bg-gray-100" : ""
            }`}
          >
            Strona główna
          </Link>
          <Link
            to="/realizacje"
            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-100 ${
              location.pathname.includes("/realizacje") ? "bg-gray-100" : ""
            }`}
          >
            Realizacje
          </Link>
          <Link
            to="/kontakt"
            className={`block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-gray-700 hover:bg-gray-100 ${
              location.pathname === "/kontakt" ? "bg-gray-100" : ""
            }`}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;