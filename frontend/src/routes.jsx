import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tutor from './pages/Tutor';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tutor" element={<Tutor />} />
        {/* Dashboard will be added later */}
        <Route path="dashboard" element={<div className="p-8 text-center text-gray-500">Dashboard UI coming soon</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
