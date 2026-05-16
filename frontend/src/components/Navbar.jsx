import React from 'react';
import { Bell, Search, Menu, Plus, Zap, UserCircle } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = ({ onMenuClick, onSearch }) => {
    return (
        <header className="h-24 flex items-center justify-between px-10 bg-background/50 backdrop-blur-3xl sticky top-0 z-30 border-b border-white/[0.03]">
            <div className="flex items-center gap-8 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-3 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                >
                    <Menu size={20} />
                </button>
                
                <div className="hidden lg:flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                    <Zap size={14} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Neural Sync Active</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="p-3 bg-white/5 border border-white/10 rounded-2xl relative hover:border-accent/40 transition-all group overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Bell size={18} className="text-text-muted group-hover:text-white transition-colors relative z-10" />
                    <span className="absolute top-3 right-3 w-2 h-2 bg-accent rounded-full border-2 border-background-darker shadow-glow-blue z-10"></span>
                </button>
                
                <div className="h-8 w-[1px] bg-white/10 mx-2" />
                
                <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white">System Status</p>
                        <p className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-500">Optimized</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-text-muted group-hover:text-white group-hover:border-white/20 transition-all">
                        <UserCircle size={24} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;

