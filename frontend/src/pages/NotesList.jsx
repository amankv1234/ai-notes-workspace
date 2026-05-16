import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SlidersHorizontal, ArrowDownAZ, Calendar, Search, Filter, LayoutGrid, Zap } from 'lucide-react';
import api from '../services/api';
import NoteCard from '../components/NoteCard';
import TagFilter from '../components/TagFilter';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import debounce from 'lodash/debounce';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('recent');
    const navigate = useNavigate();
    const headerRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(headerRef.current, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out' });
    }, []);

    const fetchNotes = async (searchVal, catVal, sortVal) => {
        setLoading(true);
        try {
            const { data } = await api.get('/api/notes', {
                params: {
                    search: searchVal,
                    category: catVal,
                    sort: sortVal
                }
            });
            setNotes(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    const debouncedFetch = useCallback(
        debounce((s, c, st) => fetchNotes(s, c, st), 500),
        []
    );

    useEffect(() => {
        debouncedFetch(search, category, sort);
    }, [search, category, sort]);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this note permanently?')) {
            try {
                await api.delete(`/api/notes/${id}`);
                setNotes(notes.filter(n => n._id !== id));
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="space-y-12 pb-24">
            {/* Header Section */}
            <header ref={headerRef} className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pt-10">
                <div className="space-y-6 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-cyan/10 border border-accent-cyan/20">
                        <LayoutGrid size={12} className="text-accent-cyan" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent-cyan">Neural Archive</span>
                    </div>
                    <h1 className="text-7xl font-display font-black tracking-tighter text-white italic leading-none">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-cyan to-accent-blue">Archive.</span>
                    </h1>
                    
                    <div className="flex flex-col md:flex-row gap-4 max-w-4xl">
                        <div className="flex-1 relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" size={18} />
                            <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Query your consciousness..."
                                className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent outline-none transition-all font-body text-sm"
                            />
                        </div>
                        
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-text-muted hover:border-white/20 transition-all cursor-pointer group">
                            <SlidersHorizontal size={14} className="mr-3 text-accent transition-transform group-hover:rotate-180 duration-500" />
                            <select 
                                value={sort} 
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 cursor-pointer text-white appearance-none outline-none"
                            >
                                <option value="recent">Chronological</option>
                                <option value="oldest">Antiquated</option>
                                <option value="alphabetical">Lexical</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/notes/new')}
                    className="premium-button-primary px-12 py-6 text-xs group shrink-0"
                >
                    <Plus size={20} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>New Memory</span>
                </motion.button>
            </header>

            {/* Filter Section */}
            <div className="pt-12 border-t border-white/5 space-y-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Filter size={18} className="text-text-muted" />
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white">Categories</h3>
                            <p className="text-[10px] font-medium text-text-muted uppercase tracking-widest">Filter by thought type</p>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                        {['All', 'General', 'Meeting', 'Idea', 'Personal', 'Research'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    category === cat 
                                    ? 'bg-accent text-white shadow-glow-purple' 
                                    : 'text-text-muted hover:text-white hover:bg-white/5'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="py-20 flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {notes.map((note, i) => (
                                <motion.div
                                    key={note._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <NoteCard 
                                        note={note} 
                                        onClick={() => navigate(`/notes/${note._id}`)}
                                        onDelete={handleDelete}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {!loading && notes.length === 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-40 text-center glass-card border-dashed border-white/5"
                    >
                        <Zap size={40} className="mx-auto text-text-muted mb-6 opacity-20" />
                        <h3 className="text-2xl font-display font-bold text-white mb-2">The Void is Empty</h3>
                        <p className="text-text-muted font-body">No connections were found for your current search parameters.</p>
                        <button 
                            onClick={() => {setSearch(''); setCategory('All');}}
                            className="mt-8 text-[10px] font-black text-accent uppercase tracking-[0.2em] hover:text-white transition-colors underline underline-offset-8"
                        >
                            Reset System Filters
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default NotesList;

