import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Save, Share2, Wand2, ListChecks, Type, Archive, X, Tag as TagIcon, CheckCircle2 } from 'lucide-react';
import api from '../services/api';
import debounce from 'lodash/debounce';
import Loader from '../components/Loader';
import ShareModal from '../components/ShareModal';

const NoteEditor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [newTag, setNewTag] = useState('');

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
            setSaving(false);
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
        if (!note.content || note.content.length < 10) return;
        setAiLoading(true);
        try {
            const { data } = await api.post(`/api/notes/${id}/generate-ai`);
            // Directly set the new note data from AI response
            setNote(data);
        } catch (err) {
            console.error("AI Magic failed on frontend");
        } finally {
            setAiLoading(false);
        }
    };

    if (loading) return <Loader fullScreen />;

    return (
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 relative pb-20">
            <ShareModal 
                isOpen={isShareModalOpen} 
                onClose={() => setIsShareModalOpen(false)}
                note={note}
                onToggleShare={(shared) => saveNote({ shared })}
            />

            {/* Main Editor Section */}
            <div className="lg:col-span-3 space-y-8">
                <input 
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    className="text-4xl font-black bg-transparent border-none focus:ring-0 w-full outline-none placeholder:text-white/10 italic"
                    placeholder="Untilted Masterpiece..."
                />
                
                <textarea 
                    name="content"
                    value={note.content}
                    onChange={handleChange}
                    className="w-full h-[60vh] bg-transparent border-none focus:ring-0 outline-none resize-none text-xl leading-relaxed text-white/80"
                    placeholder="Capture your brilliance here..."
                />
            </div>

            {/* AI Insights Sidebar */}
            <div className="space-y-6">
                <div className="bg-card border border-white/10 rounded-[2.5rem] p-8 sticky top-28 shadow-2xl shadow-black/40 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 flex items-center">
                            <Sparkles size={14} className="mr-2 text-purple-500" />
                            Intelligence
                        </h2>
                        {aiLoading && <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />}
                    </div>

                    <button 
                        onClick={runAI}
                        disabled={aiLoading}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 hover:border-accent/40 transition-all text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-3 group"
                    >
                        <Wand2 size={16} className={aiLoading ? 'animate-spin' : 'group-hover:rotate-12 transition-transform'} />
                        <span>{aiLoading ? 'Analyzing...' : 'Run AI Magic'}</span>
                    </button>

                    {/* Render AI Summary */}
                    {note.aiGeneratedSummary && (
                        <div className="space-y-3 pt-6 border-t border-white/5">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-accent">Summary</h3>
                            <p className="text-sm text-white/60 leading-relaxed italic">"{note.aiGeneratedSummary}"</p>
                        </div>
                    )}

                    {/* Render Action Items */}
                    {note.aiActionItems && note.aiActionItems.length > 0 && (
                        <div className="space-y-4 pt-6 border-t border-white/5">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-400">Action Items</h3>
                            <div className="space-y-3">
                                {note.aiActionItems.map((item, idx) => (
                                    <div key={idx} className="flex items-start space-x-3 group">
                                        <CheckCircle2 size={14} className="mt-0.5 text-white/20 group-hover:text-purple-400 transition-colors" />
                                        <span className="text-xs text-white/70 leading-snug">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NoteEditor;
