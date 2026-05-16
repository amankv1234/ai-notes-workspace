import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Zap, Edit2, LogOut, Key, Bell, ShieldCheck, Sparkles, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-10">
                <div className="space-y-2">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20"
                    >
                        <ShieldCheck size={12} className="text-accent-purple" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-accent-purple">Identity Verified</span>
                    </motion.div>
                    <h1 className="text-6xl font-display font-black tracking-tight text-white leading-none italic">
                        User <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent">Profile.</span>
                    </h1>
                </div>
                
                <button className="premium-button-secondary py-4 text-[10px] group">
                    <Edit2 size={14} className="group-hover:rotate-12 transition-transform" />
                    <span>Update Identity</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* User Card */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="lg:col-span-4 space-y-8"
                >
                    <div className="glass-card p-10 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/10 rounded-full blur-3xl group-hover:bg-accent-purple/20 transition-all" />
                        
                        <div className="relative z-10">
                            <div className="w-28 h-28 rounded-[2.5rem] bg-gradient-to-br from-accent-purple to-accent flex items-center justify-center text-4xl font-display font-black text-white mx-auto mb-8 shadow-glow-purple group-hover:rotate-6 transition-transform duration-500">
                                {user?.name?.[0]}
                            </div>
                            <h2 className="text-2xl font-display font-bold text-white mb-2">{user?.name}</h2>
                            <p className="text-text-muted text-sm mb-10 font-body">{user?.email}</p>
                            
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Membership</span>
                                    <div className="flex items-center gap-2 text-accent-purple">
                                        <Sparkles size={12} fill="currentColor" />
                                        <span className="text-[10px] font-black uppercase tracking-widest">Neural Pro</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">Status</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Operational</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-3 p-6 rounded-[2rem] bg-red-500/5 border border-red-500/10 text-red-500 font-display font-bold text-sm hover:bg-red-500/10 transition-all group"
                    >
                        <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Terminte Session</span>
                    </button>
                </motion.div>

                {/* Details Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-8 space-y-8"
                >
                    <div className="glass-card p-12 space-y-12">
                        <div className="space-y-10">
                            <h3 className="text-xl font-display font-bold text-white flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-accent-blue/10 flex items-center justify-center border border-accent-blue/20">
                                    <Shield size={20} className="text-accent-blue" />
                                </div>
                                System Credentials
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Legal Descriptor</p>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-blue/40 transition-colors">
                                        <User size={18} className="text-accent-blue group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-white">{user?.name}</span>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted">Neural Uplink</p>
                                    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-accent-blue/40 transition-colors">
                                        <Mail size={18} className="text-accent-blue group-hover:scale-110 transition-transform" />
                                        <span className="text-sm font-bold text-white">{user?.email}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-12 border-t border-white/[0.03] space-y-10">
                            <h4 className="text-xl font-display font-bold text-white flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20">
                                    <Rocket size={20} className="text-accent-cyan" />
                                </div>
                                Neural Configuration
                            </h4>
                            
                            <div className="space-y-4">
                                {[
                                    { icon: Zap, label: 'Autonomous AI Synthesis', active: true, color: 'text-yellow-500' },
                                    { icon: Bell, label: 'Knowledge Extraction Alerts', active: true, color: 'text-accent-purple' },
                                    { icon: Key, label: 'Biometric Access Protocol', active: false, color: 'text-accent-blue' },
                                ].map((pref, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/[0.08] transition-all group">
                                        <div className="flex items-center gap-5">
                                            <div className={`p-3 rounded-xl bg-white/5 ${pref.color}`}>
                                                <pref.icon size={18} />
                                            </div>
                                            <span className="text-sm font-bold text-text-secondary group-hover:text-white transition-colors">{pref.label}</span>
                                        </div>
                                        <div className={`w-12 h-6 rounded-full relative p-1 cursor-pointer transition-colors ${pref.active ? 'bg-accent shadow-glow-blue' : 'bg-white/10'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full transition-all ${pref.active ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Profile;

