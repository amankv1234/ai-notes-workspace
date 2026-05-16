import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ExternalLink, Trash2, ArrowRight } from 'lucide-react';

const NoteCard = ({ note, onClick, onDelete }) => {
    return (
        <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={onClick}
            className="group relative p-8 rounded-[2rem] glass-card border-white/5 hover:border-accent/40 hover:bg-white/[0.04] transition-all cursor-pointer flex flex-col h-full"
        >
            {/* AI Highlight Glow */}
            {note.aiGeneratedSummary && (
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-[60px] group-hover:bg-accent/20 transition-colors duration-500" />
            )}

            <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-cyan bg-accent-cyan/10 px-3 py-1.5 rounded-xl border border-accent-cyan/20">
                        {note.category || 'General'}
                    </span>
                    {note.aiGeneratedSummary && (
                        <div className="flex items-center gap-1.5 text-[10px] font-black text-accent-purple uppercase tracking-[0.2em]">
                            <Sparkles size={12} className="animate-pulse" />
                            <span>AI Optimized</span>
                        </div>
                    )}
                </div>
                
                <div className="flex items-center gap-1">
                    {note.shared && (
                        <div className="p-2 rounded-xl bg-white/5 text-text-muted">
                            <ExternalLink size={14} />
                        </div>
                    )}
                    <button 
                        onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
                        className="p-2 rounded-xl bg-white/5 text-text-muted hover:bg-red-500/20 hover:text-red-500 transition-all opacity-0 group-hover:opacity-100"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
            </div>

            <div className="space-y-3 relative z-10 flex-1">
                <h3 className="text-xl font-display font-bold text-white group-hover:text-accent transition-colors line-clamp-1 leading-tight">
                    {note.title}
                </h3>
                
                <p className="text-sm text-text-muted font-body line-clamp-3 leading-relaxed">
                    {note.content || 'Capture your brilliance here...'}
                </p>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8 relative z-10">
                <div className="flex items-center text-[10px] font-black uppercase tracking-widest text-text-muted">
                    <Calendar size={12} className="mr-2 text-accent" />
                    {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
            </div>
            
            {/* Corner Decorative Shimmer */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
};

export default NoteCard;

