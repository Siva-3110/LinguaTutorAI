import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Cpu, Zap, Activity } from 'lucide-react';

const Home = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-transparent px-4 sm:px-6 lg:px-8 relative overflow-hidden h-[calc(100vh-64px)]">

      {/* Animated Background Gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/20 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-7xl w-full z-10 px-4"
      >
        <div className="glass-panel-heavy py-16 px-10 md:py-24 md:px-20 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden flex flex-col items-center shadow-[0_0_30px_rgba(0,245,255,0.1)]">

          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>



          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight whitespace-nowrap px-4"
          >
            The Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">Language Tutor</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-medium"
          >
            Master any language through personalized AI conversations and interactive study rooms.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md"
          >
            <Link
              to="/tutor"
              className="group relative w-full flex justify-center py-4 px-8 font-bold rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-cyan-400/50 items-center overflow-hidden text-lg"
            >
              <span className="relative z-10 flex items-center">
                Start Learning
                <Zap className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
