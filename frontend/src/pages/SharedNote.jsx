import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Calendar, Sparkles, ArrowLeft, BrainCircuit, Rocket, Layout, Clock } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';

const SharedNote = () => {
    const { shareId } = useParams();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublicNote = async () => {
            try {
                const { data } = await api.get(`/api/notes/share/${shareId}`);
                setNote(data);
                setLoading(false);
            } catch (err) {
                setError("This note is no longer available or doesn't exist.");
                setLoading(false);
            }
        };
        fetchPublicNote();
    }, [shareId]);

    if (loading) return <Loader fullScreen />;

    if (error) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center relative z-10"
            >
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <Rocket className="text-text-muted" size={32} />
                </div>
                <h1 className="text-5xl font-display font-black text-white mb-4 italic tracking-tighter">Lost in Orbit.</h1>
                <p className="text-text-muted mb-10 max-w-sm mx-auto font-body">{error}</p>
                <Link to="/login" className="premium-button-primary px-10 py-5 text-xs">
                    Return to Mission Control
                </Link>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background-darker text-foreground selection:bg-accent/30 selection:text-white pb-32">
            {/* Nav */}
            <nav className="h-24 flex items-center justify-between px-10 max-w-[1400px] mx-auto sticky top-0 bg-background-darker/50 backdrop-blur-2xl z-50 border-b border-white/[0.03]">
                <div className="flex items-center gap-4 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-accent-purple flex items-center justify-center shadow-glow-purple group-hover:rotate-12 transition-all">
                        <BrainCircuit className="text-white" size={20} />
                    </div>
                    <span className="font-display font-black text-sm uppercase tracking-tighter text-white">Neural Share</span>
                </div>
                <Link to="/signup" className="premium-button-secondary py-3 text-[10px] group">
                    <span>Create Your Own Brain</span>
                    <Rocket size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
            </nav>

            <main className="max-w-[900px] mx-auto pt-24 px-8">
                <motion.header 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-10 mb-20"
                >
                    <div className="flex flex-wrap items-center gap-6">
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
                            <Clock size={12} className="text-accent-cyan" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-accent-cyan">
                                {new Date(note.updatedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                            <Layout size={12} className="text-text-muted" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{note.category}</span>
                        </div>
                    </div>
                    
                    <h1 className="text-7xl md:text-8xl font-display font-black leading-none text-white italic tracking-tight">
                        {note.title}
                    </h1>
                </motion.header>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-invert max-w-none"
                >
                    <div className="text-2xl leading-[1.6] text-text-secondary font-body whitespace-pre-wrap first-letter:text-6xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-white">
                        {note.content}
                    </div>
                </motion.div>

                {/* AI Neural Insights */}
                {(note.aiGeneratedSummary || (note.aiActionItems && note.aiActionItems.length > 0)) && (
                    <motion.div 
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-32 pt-20 border-t border-white/5 space-y-16"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-accent-purple/10 flex items-center justify-center border border-accent-purple/20 shadow-glow-purple">
                                <Sparkles className="text-accent-purple" size={24} />
                            </div>
                            <div className="space-y-1">
                                <h2 className="text-3xl font-display font-bold text-white italic">Neural Insights</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-purple">Synthesized Intelligence</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {note.aiGeneratedSummary && (
                                <div className="glass-card p-10 space-y-6 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-purple/10 rounded-full blur-3xl group-hover:bg-accent-purple/20 transition-all" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-purple relative z-10">Abstract Summary</h3>
                                    <p className="text-lg text-text-muted italic leading-relaxed font-body relative z-10">"{note.aiGeneratedSummary}"</p>
                                </div>
                            )}
                            
                            {note.aiActionItems?.length > 0 && (
                                <div className="glass-card p-10 space-y-8 relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-cyan/10 rounded-full blur-3xl group-hover:bg-accent-cyan/20 transition-all" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-cyan relative z-10">System Directives</h3>
                                    <ul className="space-y-4 relative z-10">
                                        {note.aiActionItems.map((item, i) => (
                                            <li key={i} className="flex items-start gap-4 group/item">
                                                <div className="w-2 h-2 rounded-full bg-accent-cyan mt-2 group-hover/item:scale-150 transition-transform shadow-glow-cyan" />
                                                <span className="text-sm text-text-muted font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </main>

            <footer className="mt-40 py-20 border-t border-white/[0.03] text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                    <BrainCircuit size={12} className="text-accent" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Powered by PEBLO Intelligence</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-muted/30">
                    &copy; 2026 PEBLO ARCHIVE. ALL SYSTEMS OPERATIONAL.
                </p>
            </footer>
        </div>
    );
};

export default SharedNote;

