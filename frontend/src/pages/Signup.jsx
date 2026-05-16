import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { User, Mail, Lock, ArrowRight, Sparkles, Rocket } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
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
            await register(formData.name, formData.email, formData.password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-background-darker overflow-hidden">
            {/* Left Section - Hero/Illustration */}
            <div ref={leftRef} className="hidden lg:flex flex-col justify-center p-20 relative overflow-hidden bg-background">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-purple/20 rounded-full blur-[120px] animate-blob" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-blue/20 rounded-full blur-[120px] animate-blob delay-2000" />
                </div>
                
                <div className="relative z-10 space-y-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Rocket size={14} className="text-accent-purple" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent-purple">Join the Future</span>
                    </div>
                    
                    <h1 className="text-7xl font-display font-black leading-[1.1] text-white italic">
                        Unleash Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent to-accent-cyan animate-gradient-x">
                            Creative Potential.
                        </span>
                    </h1>
                    
                    <p className="text-xl text-text-muted max-w-lg leading-relaxed font-body">
                        The smart way to capture, organize, and amplify your thoughts. Experience the next generation of productivity.
                    </p>

                    <div className="grid grid-cols-2 gap-8 pt-10">
                        <div className="space-y-2">
                            <h4 className="text-3xl font-display font-bold text-white">99.9%</h4>
                            <p className="text-sm text-text-muted">Uptime reliability</p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-3xl font-display font-bold text-white">2.5s</h4>
                            <p className="text-sm text-text-muted">Avg. response time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Form */}
            <div className="flex flex-col justify-center items-center p-6 relative">
                <div className="absolute top-0 left-0 w-full h-full lg:hidden -z-10">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-purple/10 rounded-full blur-[100px]" />
                </div>

                <motion.div 
                    ref={formRef}
                    className="w-full max-w-md glass-card p-10 space-y-8"
                >
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-accent-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-accent-purple/20">
                            <Sparkles size={32} className="text-accent-purple" />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-white">Create Account</h2>
                        <p className="text-text-muted">Join the community of modern thinkers</p>
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
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-purple transition-colors" size={18} />
                                <input 
                                    type="text" 
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all text-sm font-body"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-purple transition-colors" size={18} />
                                <input 
                                    type="email" 
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all text-sm font-body"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent-purple transition-colors" size={18} />
                                <input 
                                    type="password" 
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple outline-none transition-all text-sm font-body"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="premium-button bg-accent-purple text-white w-full group hover:shadow-glow-purple"
                        >
                            <span>Create Your Brain</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <div className="pt-6 text-center">
                        <p className="text-sm text-text-muted">
                            Already a member? <Link to="/login" className="text-white font-bold hover:text-accent-purple transition-colors">Sign in</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;

