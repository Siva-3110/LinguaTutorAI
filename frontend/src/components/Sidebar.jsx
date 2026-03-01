import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Lightbulb, LayoutDashboard, BrainCircuit, Users, Settings } from 'lucide-react';

const Sidebar = () => {
    const routes = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'AI Tutor', path: '/tutor', icon: Lightbulb },
        { name: 'Quiz', path: '/quiz', icon: BrainCircuit },
        { name: 'Study Rooms', path: '/collab', icon: Users },
    ];

    return (
        <div className="w-20 md:w-64 h-full glass-panel border-r border-slate-800 flex flex-col justify-between hidden sm:flex shrink-0 z-20">
            <div className="py-6 px-4 md:px-6">
                <div className="flex flex-col items-center md:items-start mb-10">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-blue-600 shadow-md flex items-center justify-center mb-3">
                        <span className="text-xl font-bold text-white tracking-wide">LT</span>
                    </div>
                    <h1 className="text-slate-100 text-xl md:text-2xl font-bold hidden md:block">
                        LinguaTutor <span className="text-blue-500 font-black">AI</span>
                    </h1>
                </div>

                <nav className="flex flex-col gap-3">
                    {routes.map((route) => (
                        <NavLink
                            key={route.path}
                            to={route.path}
                            className={({ isActive }) => `
                relative flex items-center p-3 rounded-xl transition-all duration-300
                ${isActive ? 'bg-white/5 text-blue-400' : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-r-md shadow-[0_0_10px_rgba(0,245,255,0.8)]"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <route.icon className={`w-6 h-6 z-10 ${isActive ? 'drop-shadow-[0_0_8px_rgba(0,245,255,0.6)]' : ''}`} />
                                    <span className={`ml-4 font-semibold tracking-wide hidden md:block z-10 ${isActive ? 'drop-shadow-[0_0_5px_rgba(0,245,255,0.4)]' : ''}`}>
                                        {route.name}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>
            </div>

            <div className="p-4 md:p-6 mb-4">
                <div className="glass-panel p-3 rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Settings className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    <span className="ml-3 font-medium text-slate-300 hidden md:block group-hover:text-white transition-colors">Settings</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
