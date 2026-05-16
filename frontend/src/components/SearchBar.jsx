import React from 'react';
import { Search, Command } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search notes..." }) => {
    return (
        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-3 w-full group focus-within:border-accent/40 transition-all">
            <Search size={18} className="text-text-muted mr-4 group-focus-within:text-accent transition-colors" />
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-white placeholder:text-text-muted/40 font-body"
            />
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 border border-white/10 ml-3">
                <Command size={10} className="text-text-muted" />
                <span className="text-[10px] font-black text-text-muted">K</span>
            </div>
        </div>
    );
};

export default SearchBar;

