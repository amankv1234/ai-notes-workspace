import React, { useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, LogOut, Plus, BrainCircuit, Sparkles, Command } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const sidebarRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(sidebarRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out' });
    }, []);

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', color: 'text-accent' },
        { icon: FileText, label: 'All Notes', path: '/notes', color: 'text-accent-cyan' },
        { icon: User, label: 'Profile', path: '/profile', color: 'text-accent-purple' },
        { icon: Settings, label: 'Settings', path: '/settings', color: 'text-accent-blue' },
    ];

    return (
        <aside ref={sidebarRef} className="w-80 border-r border-white/5 bg-background-darker hidden lg:flex flex-col h-screen sticky top-0 z-40">
            {/* Logo Section */}
            <div className="p-10">
                <Link to="/dashboard" className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center shadow-glow-purple group-hover:rotate-12 transition-all duration-500">
                        <BrainCircuit className="text-white" size={26} />
                    </div>
                    <div className="space-y-0.5">
                        <h1 className="text-xl font-display font-black tracking-tighter text-white">PEBLO</h1>
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-accent-purple">Neural Workspace</p>
                    </div>
                </Link>
            </div>

            {/* Action Section */}
            <div className="px-8 mb-10">
                <motion.button 
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/notes/new')}
                    className="premium-button-primary w-full py-5 text-[10px]"
                >
                    <Plus size={18} />
                    <span>Generate Idea</span>
                </motion.button>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 px-6 space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted/40 ml-4 mb-4">Core Systems</p>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`flex items-center justify-between p-4 rounded-2xl transition-all group relative overflow-hidden ${
                                isActive 
                                ? 'bg-white/5 text-white' 
                                : 'text-text-muted hover:text-white hover:bg-white/[0.02]'
                            }`}
                        >
                            <div className="flex items-center gap-4 relative z-10">
                                <item.icon size={20} className={`${isActive ? item.color : 'text-text-muted group-hover:text-white'} transition-colors duration-300`} />
                                <span className="text-sm font-display font-bold">{item.label}</span>
                            </div>
                            
                            {isActive && (
                                <motion.div 
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-gradient-to-r from-white/[0.02] to-transparent border-l-2 border-accent"
                                />
                            )}
                            
                            <Command size={12} className="opacity-0 group-hover:opacity-20 transition-opacity" />
                        </Link>
                    );
                })}
            </nav>

            {/* Footer / User Section */}
            <div className="p-8 mt-auto border-t border-white/5 space-y-8">
                <div className="flex items-center gap-4 px-2 group cursor-pointer">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-display font-bold text-xl text-accent-cyan shadow-inner overflow-hidden">
                            {user?.name?.[0]}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-background-darker" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-white truncate">{user?.name}</p>
                        <div className="flex items-center gap-1.5">
                            <Sparkles size={10} className="text-accent-purple" />
                            <p className="text-[8px] font-black text-text-muted uppercase tracking-widest">Neural Pro</p>
                        </div>
                    </div>
                </div>

                <button 
                    onClick={logout}
                    className="flex items-center gap-4 w-full p-4 rounded-2xl hover:bg-red-500/5 text-red-500/60 hover:text-red-500 transition-all group font-display font-bold text-sm"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Deauthorize</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;

