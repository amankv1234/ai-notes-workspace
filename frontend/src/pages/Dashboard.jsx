import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Sparkles, FileText, Archive, Tag, TrendingUp, Calendar } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/notes/dashboard');
                setData(data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) return <Loader fullScreen />;

    // Simple Bar Chart Component for Activity
    const ActivityChart = ({ activity }) => {
        const max = Math.max(...activity.map(a => a.count), 1);
        return (
            <div className="flex items-end justify-between h-32 px-4 gap-2">
                {activity.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center group">
                        <motion.div 
                            initial={{ height: 0 }}
                            animate={{ height: `${(day.count / max) * 100}%` }}
                            className="w-full bg-accent/20 border border-accent/30 rounded-t-lg group-hover:bg-accent/40 transition-all relative"
                        >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-accent text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                {day.count}
                            </div>
                        </motion.div>
                        <span className="text-[8px] uppercase tracking-tighter text-white/20 mt-2 font-black">
                            {day._id.split('-').slice(1).join('/')}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-12 pb-20">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-6xl font-black italic tracking-tighter mb-4">Command Center</h1>
                    <p className="text-white/30 font-bold uppercase tracking-[0.2em] text-[10px]">
                        Your productivity at a glance.
                    </p>
                </div>
                <button 
                    onClick={() => navigate('/notes/new')}
                    className="bg-white text-black px-10 py-5 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-white/5"
                >
                    Capture Idea
                </button>
            </header>

            {/* Top Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Notes', value: data.totalNotes, icon: FileText, color: 'text-blue-400' },
                    { label: 'In Archive', value: data.archivedNotes, icon: Archive, color: 'text-orange-400' },
                    { label: 'AI Operations', value: data.aiStats.totalAIRequests, icon: Sparkles, color: 'text-purple-400' },
                    { label: 'Summaries', value: data.aiStats.totalSummariesGenerated, icon: TrendingUp, color: 'text-emerald-400' }
                ].map((stat, i) => (
                    <div key={i} className="bg-card border border-white/5 p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group hover:border-white/20 transition-all">
                        <div className={`p-4 rounded-2xl bg-white/5 ${stat.color} mb-6 inline-block`}>
                            <stat.icon size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
                        <p className="text-4xl font-black">{stat.value}</p>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/[0.02] rounded-tl-full" />
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Activity Chart Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-white/5 rounded-[3rem] p-10 space-y-10">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-black uppercase tracking-tight flex items-center">
                                <Calendar className="mr-3 text-accent" size={20} />
                                Weekly Activity
                            </h2>
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Last 7 Days</span>
                        </div>
                        <ActivityChart activity={data.weeklyActivity} />
                    </div>

                    {/* Recent Notes */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-white/5 pb-6">
                            <h2 className="text-xl font-black uppercase tracking-tight">Recent Archives</h2>
                            <button onClick={() => navigate('/notes')} className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors">
                                View Full Archive
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {data.recentNotes.map(note => (
                                <NoteCard 
                                    key={note._id} 
                                    note={note} 
                                    onClick={() => navigate(`/notes/${note._id}`)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tags & AI Insights */}
                <div className="space-y-12">
                    {/* Top Tags */}
                    <div className="bg-card border border-white/5 rounded-[3rem] p-10 space-y-8">
                        <h2 className="text-xl font-black uppercase tracking-tight flex items-center">
                            <Tag className="mr-3 text-emerald-500" size={20} />
                            Top Connections
                        </h2>
                        <div className="space-y-4">
                            {data.tagStats.map((tag, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:scale-150 transition-transform" />
                                        <span className="text-sm font-bold text-white/60 group-hover:text-white transition-colors">{tag._id}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-white/20 bg-white/5 px-2 py-1 rounded-md">{tag.count}</span>
                                </div>
                            ))}
                            {data.tagStats.length === 0 && (
                                <p className="text-[10px] font-bold text-white/10 uppercase text-center py-4">No tags analyzed yet.</p>
                            )}
                        </div>
                    </div>

                    {/* AI Status Card */}
                    <div className="bg-gradient-to-br from-purple-500/20 to-accent/20 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden group">
                        <Sparkles className="absolute -top-4 -right-4 text-white/5 w-32 h-32 rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                        <h2 className="text-xl font-black uppercase tracking-tight mb-6">AI Utilization</h2>
                        <div className="space-y-6 relative z-10">
                            <div>
                                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">
                                    <span>Knowledge Compression</span>
                                    <span>{data.aiStats.totalSummariesGenerated} Units</span>
                                </div>
                                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '65%' }}
                                        className="h-full bg-gradient-to-r from-purple-500 to-accent" 
                                    />
                                </div>
                            </div>
                            <p className="text-[10px] text-white/30 leading-relaxed font-medium">
                                Your AI has processed {data.aiStats.totalAIRequests} requests this month, helping you condense information faster.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
