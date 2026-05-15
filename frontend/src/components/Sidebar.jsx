import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { logout, user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: FileText, label: 'All Notes', path: '/notes' },
        { icon: User, label: 'Profile', path: '/profile' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <aside className="w-72 border-r border-white/10 bg-card hidden lg:flex flex-col h-screen sticky top-0">
            <div className="p-8">
                <Link to="/dashboard" className="flex items-center space-x-3 group">
                    <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center shadow-lg shadow-accent/30 group-hover:rotate-12 transition-all">
                        <FileText className="text-white" size={24} />
                    </div>
                    <h1 className="text-xl font-black bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        WORKSPACE
                    </h1>
                </Link>
            </div>

            <div className="px-6 mb-8">
                <button 
                    onClick={() => navigate('/notes/new')}
                    className="w-full flex items-center justify-center space-x-3 bg-accent hover:bg-accent/80 text-white p-4 rounded-2xl font-bold transition-all shadow-xl shadow-accent/20"
                >
                    <Plus size={20} />
                    <span>Create New Note</span>
                </button>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link 
                            key={item.path}
                            to={item.path} 
                            className={`flex items-center space-x-4 p-4 rounded-2xl transition-all group ${
                                isActive 
                                ? 'bg-accent/10 text-accent font-bold' 
                                : 'text-white/40 hover:bg-white/5 hover:text-white'
                            }`}
                        >
                            <item.icon size={22} className={isActive ? 'text-accent' : 'group-hover:text-white transition-colors'} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-white/5 space-y-6">
                <div className="flex items-center space-x-4 px-2">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center font-bold text-xl uppercase text-accent shadow-inner">
                        {user?.name?.[0]}
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-sm truncate">{user?.name}</p>
                        <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">Pro Plan</p>
                    </div>
                </div>
                <button 
                    onClick={logout}
                    className="flex items-center space-x-4 w-full p-4 rounded-2xl hover:bg-red-500/10 text-red-500 transition-all group"
                >
                    <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-bold">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
