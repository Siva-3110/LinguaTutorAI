import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

// Lazy loading for performance optimization
const Home = lazy(() => import('./pages/Home'));
const Tutor = lazy(() => import('./pages/Tutor'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Quiz = lazy(() => import('./pages/Quiz'));
const RoomList = lazy(() => import('./pages/RoomList'));
const RoomChat = lazy(() => import('./pages/RoomChat'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="tutor" element={<Tutor />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="collab" element={<RoomList />} />
          <Route path="collab/:roomId" element={<RoomChat />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
