import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Tutor from './pages/Tutor';
import Dashboard from './pages/Dashboard';
import Quiz from './pages/Quiz';
import Admin from './pages/Admin';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="tutor" element={<Tutor />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="quiz" element={<Quiz />} />
        <Route path="admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
