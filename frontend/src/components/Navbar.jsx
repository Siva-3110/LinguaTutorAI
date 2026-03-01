import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNetworkStatus } from '../hooks/useNetworkStatus';
import { Menu, Bell, Search, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const location = useLocation();
  const isOnline = useNetworkStatus();

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
            <button className="sm:hidden p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800/50 transition-colors">
              <Menu size={24} />
            </button>
            <h2 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 tracking-wide uppercase drop-shadow-[0_0_5px_rgba(0,245,255,0.3)]">
              {getPageTitle(location.pathname)}
            </h2>
          </div>

          <div className="flex flex-1 justify-center max-w-lg mx-4 hidden md:flex">
            <div className="relative w-full max-w-md group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-cyan-500 group-focus-within:text-pink-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search database..."
                className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-lg leading-5 bg-slate-900/50 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 focus:bg-slate-900 transition-all shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] sm:text-sm"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* AI Status Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-900/20 shadow-[0_0_10px_rgba(0,245,255,0.2)]"
            >
              <div className="relative flex h-3 w-3 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 shadow-[0_0_8px_rgba(0,245,255,1)]"></span>
              </div>
              <span className="text-sm font-bold text-cyan-400 uppercase tracking-wider">AI Active</span>
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
