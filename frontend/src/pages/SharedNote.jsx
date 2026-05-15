import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FileText, Calendar, Sparkles, ArrowLeft } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';

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
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="text-center">
                <h1 className="text-4xl font-black mb-4">Oops!</h1>
                <p className="text-white/40 mb-8 max-w-sm mx-auto">{error}</p>
                <Link to="/login" className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all font-bold">
                    Go to Workspace
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-accent/30">
            {/* Header */}
            <nav className="h-20 border-b border-white/5 flex items-center justify-between px-8 max-w-5xl mx-auto">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                        <FileText className="text-white" size={18} />
                    </div>
                    <span className="font-black text-sm uppercase tracking-tighter">Shared Workspace</span>
                </div>
                <Link to="/login" className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors flex items-center">
                    Get Your Own Workspace <ArrowLeft size={14} className="ml-2 rotate-180" />
                </Link>
            </nav>

            <main className="max-w-4xl mx-auto py-16 px-6">
                <header className="mb-12">
                    <div className="flex items-center space-x-3 text-white/30 text-xs font-bold uppercase tracking-widest mb-6">
                        <Calendar size={14} />
                        <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                        <span className="w-1 h-1 rounded-full bg-white/10 mx-2"></span>
                        <span className="text-accent">{note.category}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black leading-tight mb-8">
                        {note.title}
                    </h1>
                </header>

                <div className="prose prose-invert max-w-none mb-16">
                    <div className="text-lg leading-relaxed text-white/70 whitespace-pre-wrap">
                        {note.content}
                    </div>
                </div>

                {/* AI Insights Section */}
                {(note.aiSummary || (note.aiActionItems && note.aiActionItems.length > 0)) && (
                    <div className="pt-16 border-t border-white/5 space-y-12">
                        <div className="flex items-center space-x-3">
                            <Sparkles className="text-purple-500" size={24} />
                            <h2 className="text-xl font-black uppercase tracking-tight">AI Generated Insights</h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {note.aiSummary && (
                                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-purple-400 mb-4">Summary</h3>
                                    <p className="text-white/50 italic leading-relaxed">"{note.aiSummary}"</p>
                                </div>
                            )}
                            
                            {note.aiActionItems?.length > 0 && (
                                <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5">
                                    <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4">Action Items</h3>
                                    <ul className="space-y-3">
                                        {note.aiActionItems.map((item, i) => (
                                            <li key={i} className="text-sm text-white/40 flex items-start">
                                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 mr-3 shrink-0"></span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            <footer className="py-20 border-t border-white/5 text-center mt-20">
                <p className="text-xs font-bold uppercase tracking-widest text-white/20">
                    Created with AI Notes Workspace
                </p>
            </footer>
        </div>
    );
};

export default SharedNote;
