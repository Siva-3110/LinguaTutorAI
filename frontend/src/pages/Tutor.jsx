import React from 'react';
import ChatBox from '../components/ChatBox';

const Tutor = () => {
  return (
    <div className="flex flex-row flex-grow h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Optional Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Chat History</h2>
        <div className="text-sm text-gray-500">No previous chats.</div>
      </div>

      {/* Main Chat Area */}
      <ChatBox />
    </div>
  );
};

export default Tutor;
