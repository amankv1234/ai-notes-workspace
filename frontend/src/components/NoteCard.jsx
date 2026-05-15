import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ExternalLink, Trash2 } from 'lucide-react';

const NoteCard = ({ note, onClick, onDelete }) => {
    return (
        <motion.div 
            whileHover={{ y: -4 }}
            onClick={onClick}
            className="group p-6 rounded-2xl bg-card border border-white/10 hover:border-accent/50 transition-all cursor-pointer relative overflow-hidden"
        >
            {/* AI Indicator Gradient */}
            {note.aiSummary && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 blur-3xl -mr-16 -mt-16 pointer-events-none" />
            )}

            <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-widest font-bold text-accent bg-accent/10 px-2.5 py-1 rounded-md">
                    {note.category || 'General'}
                </span>
                <div className="flex items-center space-x-2">
                    {note.isPublic && <ExternalLink size={14} className="text-white/30" />}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
                        className="p-1.5 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>

            <h3 className="font-bold text-lg group-hover:text-accent transition-colors line-clamp-1 mb-2">
                {note.title}
            </h3>
            
            <p className="text-sm text-white/40 line-clamp-3 leading-relaxed mb-6">
                {note.content || 'Start writing your thoughts...'}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                <div className="flex items-center text-[10px] text-white/30">
                    <Calendar size={12} className="mr-1.5" />
                    {new Date(note.updatedAt).toLocaleDateString()}
                </div>
                {note.aiSummary && (
                    <div className="flex items-center space-x-1.5 text-[10px] font-bold text-purple-400">
                        <Sparkles size={12} />
                        <span className="uppercase tracking-tighter">AI Enhanced</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default NoteCard;
