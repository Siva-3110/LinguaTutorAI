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
        className="max-w-4xl w-full z-10"
      >
        <div className="glass-panel-heavy p-10 md:p-14 rounded-3xl border border-cyan-500/30 text-center relative overflow-hidden flex flex-col items-center shadow-[0_0_30px_rgba(0,245,255,0.1)]">

          {/* Decorative Top Bar */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex mb-8 space-x-4"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-900/40 border border-cyan-500/50 text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
              <Cpu size={24} />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-purple-900/40 border border-purple-500/50 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
              <Activity size={24} />
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-pink-900/40 border border-pink-500/50 text-pink-400 drop-shadow-[0_0_8px_rgba(255,0,255,0.8)]">
              <Zap size={24} />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-100 tracking-tight uppercase"
          >
            Multilingual <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(0,245,255,0.5)]">AI Network</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl font-mono"
          >
            Initialize cognitive learning sequence. Master any language via direct neural interaction with LinguaTutor AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row justify-center gap-6 w-full max-w-md"
          >
            <Link
              to="/tutor"
              className="group relative w-full flex justify-center py-4 px-8 text-sm font-bold rounded-xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(0,245,255,0.4)] border border-cyan-400/50 items-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center">
                Initialize Link
                <Zap className="ml-2 w-4 h-4 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]" />
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
