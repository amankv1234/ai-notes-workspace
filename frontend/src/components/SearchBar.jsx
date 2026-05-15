import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search notes..." }) => {
    return (
        <div className="flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-2 w-full max-w-md focus-within:border-accent/50 transition-all">
            <Search size={18} className="text-white/40 mr-3" />
            <input 
                type="text" 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none text-white placeholder:text-white/20"
            />
        </div>
    );
};

export default SearchBar;
