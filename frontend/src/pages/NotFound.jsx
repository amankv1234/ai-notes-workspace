import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
            <div className="text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative inline-block mb-8"
                >
                    <h1 className="text-[12rem] font-black leading-none bg-gradient-to-b from-white/10 to-transparent bg-clip-text text-transparent">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Search size={80} className="text-accent opacity-20 animate-pulse" />
                    </div>
                </motion.div>
                
                <h2 className="text-4xl font-black mb-4 uppercase tracking-tighter">Lost in the Workspace?</h2>
                <p className="text-white/40 mb-12 max-w-md mx-auto leading-relaxed">
                    The page you're looking for has been archived by the AI or never existed in this dimension.
                </p>
                
                <Link 
                    to="/dashboard" 
                    className="inline-flex items-center space-x-3 px-10 py-4 rounded-[2rem] bg-accent text-white font-black uppercase tracking-widest hover:bg-accent/80 transition-all shadow-2xl shadow-accent/20"
                >
                    <Home size={20} />
                    <span>Return to Dashboard</span>
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
