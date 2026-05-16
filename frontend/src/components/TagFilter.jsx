import React from 'react';
import { Tag, Hash } from 'lucide-react';

const TagFilter = ({ tags, activeTag, onTagClick }) => {
    return (
        <div className="flex flex-wrap gap-3">
            <button 
                onClick={() => onTagClick(null)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    activeTag === null 
                    ? 'bg-accent border-accent text-white shadow-glow-blue' 
                    : 'bg-white/5 border-white/10 hover:border-white/20 text-text-muted hover:text-white'
                }`}
            >
                Universe
            </button>
            {tags.map((tag) => (
                <button 
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                        activeTag === tag 
                        ? 'bg-accent border-accent text-white shadow-glow-blue' 
                        : 'bg-white/5 border-white/10 hover:border-white/20 text-text-muted hover:text-white'
                    }`}
                >
                    <Hash size={10} className={activeTag === tag ? 'text-white' : 'text-accent'} />
                    <span>{tag}</span>
                </button>
            ))}
        </div>
    );
};

export default TagFilter;

