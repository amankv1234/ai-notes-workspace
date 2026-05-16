import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Save, Share2, Wand2, ListChecks, Type, Archive, X, Tag as TagIcon, CheckCircle2, ChevronLeft, Layout, Cpu, Clock, Send } from 'lucide-react';
import api from '../services/api';
import debounce from 'lodash/debounce';
import Loader from '../components/Loader';
import ShareModal from '../components/ShareModal';
import { useToast } from '../context/ToastContext';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const NoteEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [newTag, setNewTag] = useState('');
    const { addToast } = useToast();
    const editorRef = useRef(null);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                if (id === 'new') {
                    const { data } = await api.post('/api/notes');
                    navigate(`/notes/${data._id}`, { replace: true });
                    return;
                }
                const { data } = await api.get(`/api/notes/${id}`);
                setNote(data);
                setLoading(false);
            } catch (err) {
                navigate('/notes');
            }
        };
        fetchNote();
    }, [id, navigate]);

    const saveNote = async (updatedFields) => {
        setSaving(true);
        try {
            const { data } = await api.patch(`/api/notes/${id}`, updatedFields);
            setNote(prev => ({ ...prev, ...data }));
            setTimeout(() => setSaving(false), 1000);
        } catch (err) {
            setSaving(false);
        }
    };

    const debouncedSave = useRef(
        debounce((fields) => saveNote(fields), 1500)
    ).current;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prev => ({ ...prev, [name]: value }));
        debouncedSave({ [name]: value });
    };

    const runAI = async () => {
        if (!note.content || note.content.length < 10) {
            addToast('Not enough content to analyze! Write more.', 'info');
            return;
        }
        
        setAiLoading(true);
        addToast('📡 AI is analyzing your brilliant thoughts...', 'info');
        
        try {
            const { data } = await api.post(`/api/notes/${id}/generate-ai`);
            setNote(data);
            addToast('✨ AI Magic Complete!', 'success');
        } catch (err) {
            console.error("AI Magic failed on frontend");
            addToast(err.response?.data?.message || 'AI Magic failed. Try again!', 'error');
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-[1600px] mx-auto pb-24">
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)}
                note={note}
                onToggleShare={(shared) => saveNote({ shared })}
            />

            {/* Editor Toolbar */}
            <header className="flex items-center justify-between mb-10 pt-6">
                <div className="flex items-center gap-6">
                    <button 
                        onClick={() => navigate('/notes')}
                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all text-text-muted"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xs font-black uppercase tracking-widest text-text-muted">Editor Mode</h2>
                            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[8px] font-black text-emerald-500 uppercase tracking-widest">Live Sync</span>
                            </div>
                        </div>
                        <p className="text-[10px] font-medium text-text-muted/60 uppercase tracking-widest">Modified {new Date(note.updatedAt).toLocaleTimeString()}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 mr-4">
                        {saving ? (
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full border-2 border-accent border-t-transparent animate-spin" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-accent">Saving Changes</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Save size={12} className="text-emerald-500" />
                                <span className="text-[8px] font-black uppercase tracking-widest text-text-muted">All Saved</span>
                            </div>
                        )}
                    </div>
                    
                    <button 
                        onClick={() => setIsShareModalOpen(true)}
                        className="premium-button-secondary py-3 text-[10px]"
                    >
                        <Share2 size={14} />
                        <span>Share</span>
                    </button>
                    
                    <button 
                        onClick={() => saveNote({ archived: !note.archived })}
                        className="premium-button-secondary py-3 text-[10px]"
                    >
                        <Archive size={14} />
                        <span>{note.archived ? 'Restore' : 'Archive'}</span>
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                {/* Main Content Area */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="lg:col-span-8 glass-card p-12 space-y-10"
                >
                    <div className="space-y-4">
                        <input 
                            name="title"
                            value={note.title}
                            onChange={handleChange}
                            className="text-6xl font-display font-black bg-transparent border-none focus:ring-0 w-full outline-none placeholder:text-white/5 italic text-white leading-tight"
                            placeholder="Untilted Masterpiece..."
                        />
                        <div className="flex items-center gap-4 pt-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
                                <Layout size={12} className="text-accent" />
                                <select 
                                    name="category"
                                    value={note.category}
                                    onChange={handleChange}
                                    className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer text-text-muted"
                                >
                                    {['General', 'Meeting', 'Idea', 'Personal', 'Research'].map(cat => (
                                        <option key={cat} value={cat} className="bg-background-darker">{cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div className="relative group">
                        <textarea 
                            name="content"
                            value={note.content}
                            onChange={handleChange}
                            className="w-full min-h-[500px] bg-transparent border-none focus:ring-0 outline-none resize-none text-xl leading-relaxed text-text-secondary font-body placeholder:text-white/5"
                            placeholder="Capture your brilliance here..."
                        />
                        {/* Decorative background lines */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none">
                            {Array.from({ length: 20 }).map((_, i) => (
                                <div key={i} className="h-10 border-b border-white" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* AI & Insights Sidebar */}
                <aside className="lg:col-span-4 space-y-8 sticky top-10">
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-8 space-y-8 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all" />
                        
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                                    <Cpu size={18} className="text-accent" />
                                </div>
                                <h2 className="text-xl font-display font-bold text-white">Neural Engine</h2>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className={`w-2 h-2 rounded-full ${aiLoading ? 'bg-accent animate-ping' : 'bg-accent/20'}`} />
                            </div>
                        </div>

                        <button 
                            onClick={runAI}
                            disabled={aiLoading}
                            className="w-full group premium-button-primary py-5 text-[10px]"
                        >
                            <Wand2 size={16} className={aiLoading ? 'animate-spin' : 'group-hover:rotate-12 transition-transform duration-500'} />
                            <span>{aiLoading ? 'Processing Knowledge...' : 'Invoke AI Intelligence'}</span>
                        </button>

                        <div className="space-y-10 relative z-10">
                            {/* AI Summary Section */}
                            <AnimatePresence mode="wait">
                                {note.aiGeneratedSummary ? (
                                    <motion.div 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-accent">
                                            <div className="h-[1px] flex-1 bg-accent/20" />
                                            <span>Knowledge Summary</span>
                                            <div className="h-[1px] flex-1 bg-accent/20" />
                                        </div>
                                        <p className="text-sm text-text-muted leading-relaxed italic font-body text-center">
                                            "{note.aiGeneratedSummary}"
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="py-10 text-center space-y-2 opacity-30">
                                        <Sparkles size={24} className="mx-auto text-text-muted" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Awaiting AI Analysis</p>
                                    </div>
                                )}
                            </AnimatePresence>

                            {/* Action Items Section */}
                            {note.aiActionItems && note.aiActionItems.length > 0 && (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-accent-cyan">
                                        <div className="h-[1px] flex-1 bg-accent-cyan/20" />
                                        <span>Neural Next-Steps</span>
                                        <div className="h-[1px] flex-1 bg-accent-cyan/20" />
                                    </div>
                                    <div className="space-y-3">
                                        {note.aiActionItems.map((item, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group cursor-default"
                                            >
                                                <div className="w-5 h-5 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20 mt-0.5 group-hover:scale-110 transition-transform">
                                                    <CheckCircle2 size={12} className="text-accent-cyan" />
                                                </div>
                                                <span className="text-xs text-text-secondary leading-snug font-medium">{item}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Metadata Card */}
                    <div className="glass-card p-8 flex items-center justify-between opacity-50 hover:opacity-100 transition-opacity">
                        <div className="flex items-center gap-4">
                            <Clock size={16} className="text-text-muted" />
                            <div className="space-y-0.5">
                                <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Last Operation</p>
                                <p className="text-[10px] font-bold text-white">{new Date(note.updatedAt).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className="h-8 w-[1px] bg-white/10" />
                        <div className="text-right">
                            <p className="text-[8px] font-black uppercase tracking-widest text-text-muted">Word Count</p>
                            <p className="text-[10px] font-bold text-white">{note.content?.split(/\s+/).filter(Boolean).length || 0} Symbols</p>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default NoteEditor;

