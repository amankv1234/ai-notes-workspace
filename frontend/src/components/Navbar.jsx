import React from 'react';
import { Bell, Search, Menu, Plus } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = ({ onMenuClick, onSearch }) => {
    return (
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 bg-background/80 backdrop-blur-2xl sticky top-0 z-30">
            <div className="flex items-center space-x-6 flex-1">
                <button 
                    onClick={onMenuClick}
                    className="lg:hidden p-2 hover:bg-white/5 rounded-xl transition-all"
                >
                    <Menu size={24} />
                </button>
                
                <div className="hidden md:block w-full max-w-xl">
                    <SearchBar onChange={onSearch} />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="md:hidden p-2 hover:bg-white/5 rounded-xl transition-all">
                    <Search size={20} className="text-white/40" />
                </button>
                
                <button className="p-2.5 bg-white/5 border border-white/10 rounded-2xl relative hover:border-accent/50 transition-all group">
                    <Bell size={20} className="text-white/60 group-hover:text-accent transition-colors" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-background shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                </button>
                
                <button className="hidden sm:flex items-center space-x-2 bg-white/5 border border-white/10 hover:border-white/30 px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-black/20">
                    <Plus size={18} className="text-accent" />
                    <span>Quick Create</span>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
