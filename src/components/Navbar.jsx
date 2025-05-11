import React, { useState } from 'react';
import { NavLink } from "react-router";
import logo from '../assets/codeinajaLogo.svg';
import {links} from '../utils/content';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-4 md:px-12 py-4 bg-white shadow-sm w-full">
      {/* Logo */}
      <div className="flex items-center">
        <NavLink to="/" className="flex items-center">
          <span className="text-2xl font-bold text-black">Codein<span className='italic'>Aja</span></span>
          <div className="w-6 h-6 ml-1"><img src={logo} alt="logo codeinaja" /></div>
        </NavLink>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-600 focus:outline-none"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {links.map((link, index) => (
          <NavLink 
            key={index} 
            to={link.to} 
            className={({ isActive }) => 
              isActive 
                ? "text-orange-500 font-medium" 
                : "text-gray-600 hover:text-orange-500 transition-colors"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
      
      {/* Login/Register Buttons */}
      <div className="hidden md:flex items-center space-x-4">
        <NavLink 
          to="/register" 
          className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full hover:bg-orange-50 transition-colors"
        >
          Daftar
        </NavLink>
        <NavLink 
          to="/login" 
          className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
        >
          Masuk
        </NavLink>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-md py-4 md:hidden z-10">
          <div className="flex flex-col space-y-4 px-4">
            {links.map((link, index) => (
              <NavLink 
                key={index} 
                to={link.to} 
                className={({ isActive }) => 
                  isActive 
                    ? "text-orange-500 font-medium" 
                    : "text-gray-600"
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="flex flex-col space-y-2 pt-2">
              <NavLink 
                to="/register" 
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Daftar
              </NavLink>
              <NavLink 
                to="/login" 
                className="bg-orange-500 text-white px-4 py-2 rounded-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Masuk
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
