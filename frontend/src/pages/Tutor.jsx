import React from 'react';
import ChatBox from '../components/ChatBox';
import { History, Target } from 'lucide-react';

const Tutor = () => {
  return (
    <div className="flex flex-row flex-grow h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* Cyberpunk History Sidebar */}
      <div className="hidden md:flex flex-col w-64 glass-panel border-r border-cyan-500/30 p-4 shrink-0 shadow-[0_0_15px_rgba(0,245,255,0.05)] z-10 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 to-transparent pointer-events-none"></div>

        <div className="flex items-center mb-6 border-b border-cyan-800/50 pb-4 relative z-10">
          <History className="w-5 h-5 text-cyan-400 mr-2" />
          <h2 className="text-sm font-bold text-cyan-400 uppercase tracking-widest font-mono">Archive Logs</h2>
        </div>

        <div className="flex flex-col items-center justify-center h-48 opacity-50 relative z-10 border border-slate-700/50 border-dashed rounded-xl bg-slate-900/30">
          <Target className="w-8 h-8 text-slate-500 mb-2" />
          <div className="text-xs text-slate-400 font-mono uppercase tracking-widest text-center">No Data<br />Recorded</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <ChatBox />
    </div>
  );
};

export default Tutor;
