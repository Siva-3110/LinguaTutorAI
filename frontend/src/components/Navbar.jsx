import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNetworkStatus } from '../hooks/useNetworkStatus';

const Navbar = () => {
  const location = useLocation();
  const isOnline = useNetworkStatus();

  const getLinkClass = (path) => {
    return `px - 3 py - 2 rounded - md text - sm font - medium transition - colors ${location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-gray-100'
      } `;
  };

  return (
    <nav className="bg-white shadow relative">
      {!isOnline && (
        <div className="absolute top-0 left-0 w-full bg-red-500 text-white text-xs text-center py-1 font-semibold z-50">
          Edge Mode Active: You are offline. Functionality is limited.
        </div>
      )}
      <div className={`max - w - 7xl mx - auto px - 4 sm: px - 6 lg: px - 8 ${!isOnline ? 'pt-6' : ''} `}>
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
            <Link to="/quiz" className={getLinkClass('/quiz')}>Quiz</Link>
            <Link to="/collab" className={getLinkClass('/collab')}>Study Rooms</Link>
            <Link to="/admin" className={getLinkClass('/admin')}>Admin Room</Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
