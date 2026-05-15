import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Zap, Edit2, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <header className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-black mb-2">My Profile</h1>
                    <p className="text-white/40">Manage your account and preferences.</p>
                </div>
                <button className="flex items-center space-x-2 bg-white/5 border border-white/10 px-6 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-widest hover:border-accent transition-all">
                    <Edit2 size={16} className="text-accent" />
                    <span>Edit Profile</span>
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* User Card */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-card border border-white/10 rounded-[2.5rem] p-10 text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-accent" />
                        <div className="w-24 h-24 rounded-[2rem] bg-accent flex items-center justify-center text-4xl font-black text-white mx-auto mb-6 shadow-2xl shadow-accent/40">
                            {user?.name?.[0]}
                        </div>
                        <h2 className="text-xl font-bold mb-1">{user?.name}</h2>
                        <p className="text-white/40 text-sm mb-8">{user?.email}</p>
                        
                        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-black uppercase tracking-widest text-accent">
                            <Zap size={12} fill="currentColor" />
                            <span>Pro Member</span>
                        </div>
                    </div>

                    <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center space-x-3 p-5 rounded-[2rem] bg-red-500/5 border border-red-500/10 text-red-500 font-bold hover:bg-red-500/10 transition-all"
                    >
                        <LogOut size={20} />
                        <span>Sign Out of Account</span>
                    </button>
                </div>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-card border border-white/10 rounded-[2.5rem] p-10 space-y-8">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white/30 flex items-center">
                            <Shield size={18} className="mr-3" />
                            Account Details
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Full Name</p>
                                <div className="flex items-center space-x-3 text-white/80">
                                    <User size={18} className="text-accent" />
                                    <span className="font-bold">{user?.name}</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Email Address</p>
                                <div className="flex items-center space-x-3 text-white/80">
                                    <Mail size={18} className="text-accent" />
                                    <span className="font-bold">{user?.email}</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5 space-y-4">
                            <h4 className="text-xs font-bold">Preferences</h4>
                            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                                <div className="flex items-center space-x-3">
                                    <Zap size={18} className="text-yellow-500" />
                                    <span className="text-sm font-medium">Automatic AI Summaries</span>
                                </div>
                                <div className="w-10 h-5 bg-accent rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
