import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Globe, Lock, ExternalLink } from 'lucide-react';

const ShareModal = ({ isOpen, onClose, note, onToggleShare }) => {
    const [copied, setCopied] = useState(false);
    const shareUrl = `${window.location.origin}/share/${note?.shareId}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-md"
                />
                
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-card border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-purple-500" />
                    
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-black italic tracking-tight">Share Workspace</h2>
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-all">
                            <X size={20} className="text-white/40" />
                        </button>
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                            <div className="flex items-center space-x-4">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${note.shared ? 'bg-accent/20 text-accent' : 'bg-white/5 text-white/20'}`}>
                                    {note.shared ? <Globe size={24} /> : <Lock size={24} />}
                                </div>
                                <div>
                                    <p className="text-sm font-bold">{note.shared ? 'Public' : 'Private'}</p>
                                    <p className="text-[10px] text-white/30 uppercase tracking-widest font-black">
                                        {note.shared ? 'Anyone with the link can view' : 'Only you can access this'}
                                    </p>
                                </div>
                            </div>
                            <button 
                                onClick={() => onToggleShare(!note.shared)}
                                className={`w-12 h-6 rounded-full relative transition-all ${note.shared ? 'bg-accent' : 'bg-white/10'}`}
                            >
                                <motion.div 
                                    animate={{ x: note.shared ? 24 : 4 }}
                                    className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-lg"
                                />
                            </button>
                        </div>

                        {note.shared && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-4"
                            >
                                <p className="text-[10px] font-black uppercase tracking-widest text-white/20 ml-2">Shareable Link</p>
                                <div className="flex items-center space-x-2">
                                    <div className="flex-1 bg-white/5 border border-white/5 rounded-xl px-4 py-3 text-xs font-medium text-white/40 truncate">
                                        {shareUrl}
                                    </div>
                                    <button 
                                        onClick={handleCopy}
                                        className="p-3 bg-accent text-white rounded-xl hover:bg-accent/80 transition-all shadow-lg shadow-accent/20"
                                    >
                                        {copied ? <Check size={18} /> : <Copy size={18} />}
                                    </button>
                                </div>
                                
                                <a 
                                    href={shareUrl} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-accent hover:text-white transition-colors pt-2"
                                >
                                    <span>Preview Public Page</span>
                                    <ExternalLink size={12} />
                                </a>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ShareModal;
