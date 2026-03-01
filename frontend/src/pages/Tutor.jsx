import React from 'react';
import ChatBox from '../components/ChatBox';
import { History, MessageSquareDashed } from 'lucide-react';

const Tutor = () => {
  return (
    <div className="flex flex-row flex-grow h-[calc(100vh-64px)] overflow-hidden bg-transparent">
      {/* SaaS History Sidebar */}
      <div className="hidden md:flex flex-col w-64 glass-panel border-r border-slate-700/50 p-4 shrink-0 shadow-md z-10 relative bg-slate-900/40">

        <div className="flex items-center mb-6 border-b border-slate-700 pb-4 relative z-10">
          <History className="w-5 h-5 text-blue-400 mr-3" />
          <h2 className="text-sm font-semibold text-slate-200">Chat History</h2>
        </div>

        <div className="flex flex-col items-center justify-center h-48 opacity-60 relative z-10 border border-slate-700/50 border-dashed rounded-xl bg-slate-800/20">
          <MessageSquareDashed className="w-8 h-8 text-slate-400 mb-3" />
          <div className="text-xs text-slate-400 text-center font-medium">No history<br />available</div>
        </div>
      </div>

      {/* Main Chat Area */}
      <ChatBox />
    </div>
  );
};

export default Tutor;
