import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, SlidersHorizontal, ArrowDownAZ, Calendar } from 'lucide-react';
import api from '../services/api';
import NoteCard from '../components/NoteCard';
import TagFilter from '../components/TagFilter';
import Loader from '../components/Loader';
import SearchBar from '../components/SearchBar';
import debounce from 'lodash/debounce';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [sort, setSort] = useState('recent');
    const navigate = useNavigate();

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
        <div className="space-y-10">
            <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-4">
                    <h1 className="text-5xl font-black italic tracking-tight">The Archive</h1>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <SearchBar value={search} onChange={setSearch} placeholder="Search your brain..." />
                        <div className="flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-2 text-sm font-bold uppercase tracking-widest text-white/40">
                            <SlidersHorizontal size={16} className="mr-3" />
                            <select 
                                value={sort} 
                                onChange={(e) => setSort(e.target.value)}
                                className="bg-transparent border-none focus:ring-0 cursor-pointer text-white"
                            >
                                <option value="recent">Most Recent</option>
                                <option value="oldest">Oldest First</option>
                                <option value="alphabetical">A-Z</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <button 
                    onClick={() => navigate('/notes/new')}
                    className="flex items-center justify-center space-x-3 bg-accent text-white px-10 py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-accent/80 transition-all shadow-2xl shadow-accent/30 self-start lg:self-auto"
                >
                    <Plus size={20} />
                    <span>Create Note</span>
                </button>
            </header>

            <div className="pt-8 border-t border-white/5 space-y-12">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xs font-black uppercase tracking-widest text-white/20">Filter Categories</h2>
                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest bg-accent/10 px-2 py-1 rounded-md">
                            {notes.length} Total
                        </span>
                    </div>
                    <TagFilter 
                        tags={['General', 'Meeting', 'Idea', 'Personal', 'Research']} 
                        activeTag={category === 'All' ? null : category} 
                        onTagClick={(tag) => setCategory(tag || 'All')} 
                    />
                </div>

                {loading ? (
                    <Loader />
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {notes.map((note) => (
                            <NoteCard 
                                key={note._id} 
                                note={note} 
                                onClick={() => navigate(`/notes/${note._id}`)}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}

                {!loading && notes.length === 0 && (
                    <div className="py-40 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
                        <p className="text-white/20 text-xl font-black uppercase tracking-tighter">No connections found in the archive.</p>
                        <p className="text-white/10 text-sm mt-2">Try adjusting your filters or keywords.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotesList;
