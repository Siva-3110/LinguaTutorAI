import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Menu, Bell, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isOnline = useNetworkStatus();

  // Hide Navbar completely on Home page
  if (location.pathname === '/') return null;

  // Route title formatting
  const getPageTitle = (path) => {
    if (path === '/') return 'Command Center';
    const raw = path.split('/')[1];
    return raw ? raw.charAt(0).toUpperCase() + raw.slice(1) : 'Command Center';
  };

  return (
    <nav className="glass-panel border-b border-slate-800/50 relative z-10 w-full shrink-0">
      {!isOnline && (
        <div className="absolute top-0 left-0 w-full bg-red-600/50 backdrop-blur-md text-white text-xs text-center py-1.5 font-bold z-50 animate-pulse border-b border-red-400/50 tracking-wider uppercase shadow-[0_0_15px_rgba(255,0,0,0.5)]">
          [ SYSTEM OFFLINE: EDGE AI FALLBACK ACTIVE ]
        </div>
      )}

      <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${!isOnline ? 'pt-7' : ''}`}>
        <div className="flex justify-between items-center h-20">

          <div className="flex items-center space-x-4">
            <button className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-slate-800/50 transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-bold text-slate-100">
              {getPageTitle(location.pathname)}
            </h2>
          </div>


          <div className="flex items-center space-x-4">
            {/* AI Status Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-900/20 shadow-sm"
            >
              <div className="relative flex h-3 w-3 mr-3 mt-0.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </div>
              <span className="text-sm font-semibold text-blue-400">AI Active</span>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full text-slate-400 hover:text-yellow-400 transition-colors relative"
            >
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-pink-500 rounded-full shadow-[0_0_5px_rgba(255,0,255,0.8)]"></span>
            </motion.button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
