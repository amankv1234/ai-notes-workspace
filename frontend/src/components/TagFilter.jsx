import React from 'react';
import { Tag } from 'lucide-react';

const TagFilter = ({ tags, activeTag, onTagClick }) => {
    return (
        <div className="flex flex-wrap gap-2">
            <button 
                onClick={() => onTagClick(null)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    activeTag === null 
                    ? 'bg-accent border-accent text-white' 
                    : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'
                }`}
            >
                All
            </button>
            {tags.map((tag) => (
                <button 
                    key={tag}
                    onClick={() => onTagClick(tag)}
                    className={`flex items-center space-x-2 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        activeTag === tag 
                        ? 'bg-accent border-accent text-white' 
                        : 'bg-white/5 border-white/10 hover:border-white/30 text-white/60'
                    }`}
                >
                    <Tag size={12} />
                    <span>{tag}</span>
                </button>
            ))}
        </div>
    );
};

export default TagFilter;
