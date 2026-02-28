import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-grow flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Your AI Multilingual <span className="text-blue-600">Learning Companion</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Learn anything in your language with AI
          </p>
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            to="/tutor"
            className="group relative w-full sm:w-auto flex justify-center py-3 px-8 border border-transparent text-lg font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-md hover:shadow-lg"
          >
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
