import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, FileText, Archive, Tag, TrendingUp, Calendar, Zap, ArrowUpRight, MousePointer2 } from 'lucide-react';
import api from '../services/api';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';
import NoteCard from '../components/NoteCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { gsap } from 'gsap';

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

    const chartData = useMemo(() => {
        if (!data?.weeklyActivity) return [];
        return data.weeklyActivity.map(day => ({
            name: day._id.split('-').slice(2).join('/'),
            count: day.count
        }));
    }, [data]);

    if (loading) return <Loader fullScreen />;

    return (
        <div className="space-y-12 pb-24">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pt-10">
                <div className="space-y-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20"
                    >
                        <Zap size={12} className="text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent">System Online</span>
                    </motion.div>
                    <h1 className="text-7xl font-display font-black tracking-tight text-white leading-none">
                        Command <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-cyan">Center.</span>
                    </h1>
                    <p className="text-text-muted font-body max-w-md">
                        Your intelligent second brain is optimized and ready. Here is a snapshot of your cognitive data.
                    </p>
                </div>
                
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/notes/new')}
                    className="premium-button-primary px-10 py-6 text-xs group"
                >
                    <Plus size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                    <span>Capture New Idea</span>
                </motion.button>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Neural Archives', value: data.totalNotes, icon: FileText, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
                    { label: 'Cold Storage', value: data.archivedNotes, icon: Archive, color: 'text-orange-400', bg: 'bg-orange-400/10' },
                    { label: 'AI Operations', value: data.aiStats.totalAIRequests, icon: Sparkles, color: 'text-accent-purple', bg: 'bg-accent-purple/10' },
                    { label: 'Knowledge Gain', value: data.aiStats.totalSummariesGenerated, icon: TrendingUp, color: 'text-accent-cyan', bg: 'bg-accent-cyan/10' }
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card-hover p-8 relative overflow-hidden group"
                    >
                        <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={22} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted mb-2">{stat.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-display font-bold text-white">{stat.value}</span>
                            <span className="text-[10px] font-bold text-emerald-500 flex items-center gap-0.5">
                                <ArrowUpRight size={10} /> +12%
                            </span>
                        </div>
                        
                        {/* Decorative Background Element */}
                        <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-accent/5 transition-colors" />
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Activity Section */}
                <div className="lg:col-span-2 space-y-8">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass-card p-10 space-y-10"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                                    <Calendar className="text-accent-blue" size={24} />
                                    Cognitive Activity
                                </h2>
                                <p className="text-xs text-text-muted font-medium">Tracking your note frequency over the last 7 days</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Live Sync</span>
                            </div>
                        </div>

                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                                    <XAxis 
                                        dataKey="name" 
                                        stroke="#94A3B8" 
                                        fontSize={10} 
                                        tickLine={false} 
                                        axisLine={false}
                                        tick={{ dy: 10 }}
                                    />
                                    <YAxis hide />
                                    <Tooltip 
                                        contentStyle={{ backgroundColor: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#F8FAFC', fontSize: '12px', fontWeight: 'bold' }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="count" 
                                        stroke="#8B5CF6" 
                                        strokeWidth={3}
                                        fillOpacity={1} 
                                        fill="url(#colorCount)" 
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </motion.div>

                    {/* Recent Notes Layout */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-display font-bold text-white">Latest Intelligence</h2>
                            <button 
                                onClick={() => navigate('/notes')}
                                className="text-[10px] font-black text-accent uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
                            >
                                Explorer
                                <MousePointer2 size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <AnimatePresence>
                                {data.recentNotes.map((note, i) => (
                                    <motion.div
                                        key={note._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <NoteCard 
                                            note={note} 
                                            onClick={() => navigate(`/notes/${note._id}`)}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Sidebar Metrics */}
                <div className="space-y-8">
                    {/* Top Connections (Tags) */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card p-10 space-y-8 overflow-hidden relative"
                    >
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-accent-cyan/10 rounded-full blur-3xl" />
                        
                        <h2 className="text-xl font-display font-bold text-white flex items-center gap-3 relative">
                            <Tag className="text-accent-cyan" size={20} />
                            Neural Nodes
                        </h2>
                        
                        <div className="space-y-4 relative">
                            {data.tagStats.map((tag, i) => (
                                <div key={i} className="flex items-center justify-between group cursor-pointer">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan group-hover:shadow-glow-cyan transition-all group-hover:scale-150" />
                                        <span className="text-sm font-body text-text-secondary group-hover:text-white transition-colors">#{tag._id}</span>
                                    </div>
                                    <span className="text-[10px] font-black text-text-muted bg-white/5 px-2.5 py-1 rounded-lg border border-white/5 group-hover:border-accent-cyan/30 transition-colors">
                                        {tag.count} Units
                                    </span>
                                </div>
                            ))}
                            {data.tagStats.length === 0 && (
                                <div className="text-center py-10 space-y-2">
                                    <p className="text-sm text-text-muted">No nodes connected yet.</p>
                                    <p className="text-[10px] font-black text-accent uppercase tracking-widest">Start tagging notes</p>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* AI Health Card */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-10 relative overflow-hidden group border-accent/20"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent" />
                        <Sparkles className="absolute -bottom-10 -right-10 text-accent/5 w-40 h-40 group-hover:rotate-12 transition-transform duration-1000" />
                        
                        <div className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-xl font-display font-bold text-white">AI Neural Load</h2>
                                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">High Efficiency Mode</p>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-text-secondary">Knowledge Density</span>
                                        <span className="text-white">84%</span>
                                    </div>
                                    <div className="h-2 bg-white/5 rounded-full overflow-hidden border border-white/5 p-0.5">
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: '84%' }}
                                            transition={{ duration: 2, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-accent via-accent-cyan to-accent-purple rounded-full shadow-glow-purple" 
                                        />
                                    </div>
                                </div>
                                
                                <p className="text-xs text-text-muted leading-relaxed italic border-l-2 border-accent pl-4 py-1">
                                    "Your AI has processed {data.aiStats.totalAIRequests} requests. Knowledge extraction is up 14% this week."
                                </p>
                            </div>
                            
                            <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all text-text-secondary">
                                View Analytics
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

