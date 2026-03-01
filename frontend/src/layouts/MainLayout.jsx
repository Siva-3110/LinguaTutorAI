import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  return (
    <div className="h-screen w-full flex overflow-hidden bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
