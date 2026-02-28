import React, { useState } from 'react';

const Tutor = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hello! I am LinguaTutor AI. What would you like to learn today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');

    // Simulate AI thinking and responding
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `This is a simulated response to "${currentInput}". AI integration is coming in future steps!`
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-row flex-grow h-[calc(100vh-64px)] overflow-hidden bg-gray-50">
      {/* Optional Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Chat History</h2>
        <div className="text-sm text-gray-500">No previous chats.</div>
      </div>

      {/* Main Chat Area */}
      <div className="flex flex-col flex-grow w-full relative">
        <div className="flex-grow p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[75%] px-4 py-3 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Box */}
        <div className="p-4 bg-white border-t border-gray-200">
          <form onSubmit={handleSend} className="max-w-4xl mx-auto flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tutor;
