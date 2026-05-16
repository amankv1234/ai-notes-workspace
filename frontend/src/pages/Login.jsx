import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles, BrainCircuit, ArrowRight, Lock, Mail } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const formRef = useRef(null);
    const leftRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(leftRef.current, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: 'power4.out' })
          .fromTo(formRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, "-=0.5");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background-darker overflow-hidden">
            {/* Left Section - Hero/Illustration */}
            <div ref={leftRef} className="hidden lg:flex flex-col justify-center p-20 relative overflow-hidden bg-background">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-cyan/20 rounded-full blur-[120px] animate-blob delay-2000" />
                </div>
                
                <div className="relative z-10 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Sparkles size={14} className="text-accent" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Next Generation AI</span>
                    </div>
                    
                    <h1 className="text-7xl font-display font-black leading-[1.1] text-white italic">
                        Your Second Brain <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-cyan to-accent-purple animate-gradient-x">
                            Powered by AI.
                        </span>
                    </h1>
                    
                    <p className="text-xl text-text-muted max-w-lg leading-relaxed font-body">
                        The ultimate workspace for your notes, ideas, and tasks. Organise your life with the power of modern intelligence.
                    </p>

                    <div className="flex items-center gap-8 pt-10">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-background-darker bg-card overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-text-secondary">
                            <span className="font-bold text-white">2,000+</span> creatives already joined
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex flex-col justify-center items-center p-6 relative">
                <div className="absolute top-0 left-0 w-full h-full lg:hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />
                </div>

                <motion.div 
                    ref={formRef}
                    className="w-full max-w-md glass-card p-10 space-y-8"
                >
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent/20">
                            <BrainCircuit size={32} className="text-accent" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">Welcome Back</h2>
                        <p className="text-text-muted">Enter your credentials to access your brain</p>
                    </div>

                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm font-body"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all text-sm font-body"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="premium-button-primary w-full group"
                        >
                            <span>Sign Into Workspace</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-sm text-text-muted">
                            New here? <Link to="/signup" className="text-white font-bold hover:text-accent transition-colors">Create an account</Link>
                        </p>
                    </div>
                </motion.div>
                
                <p className="mt-12 text-[10px] font-black uppercase tracking-[0.3em] text-text-muted/30">
                    &copy; 2026 AI Notes Workspace. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;

