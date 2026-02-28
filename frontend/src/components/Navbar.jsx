import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getLinkClass = (path) => {
    return `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      location.pathname === path 
        ? 'bg-blue-600 text-white' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">LinguaTutor AI</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/tutor" className={getLinkClass('/tutor')}>Tutor</Link>
            <Link to="/dashboard" className={getLinkClass('/dashboard')}>Dashboard</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
