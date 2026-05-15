import React from 'react';
import { Sparkles, ListChecks, Type, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const AIOutputCard = ({ title, content, type = 'summary', onApply }) => {
    const [copied, setCopied] = useState(false);

    const icons = {
        summary: <Type size={18} className="text-purple-400" />,
        actionItems: <ListChecks size={18} className="text-blue-400" />,
        general: <Sparkles size={18} className="text-accent" />
    };

    const handleCopy = () => {
        const text = Array.isArray(content) ? content.join('\n') : content;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-card border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center space-x-3">
                    {icons[type] || icons.general}
                    <h3 className="text-xs font-bold uppercase tracking-widest text-white/80">{title}</h3>
                </div>
                <button 
                    onClick={handleCopy}
                    className="p-1.5 hover:bg-white/5 rounded-lg transition-all text-white/40 hover:text-white"
                >
                    {copied ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                </button>
            </div>
            <div className="p-5">
                {Array.isArray(content) ? (
                    <ul className="space-y-3">
                        {content.map((item, i) => (
                            <li key={i} className="text-sm text-white/60 flex items-start leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 mr-3 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></span>
                                {item}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-white/60 italic leading-relaxed">
                        "{content}"
                    </p>
                )}
                
                {onApply && (
                    <button 
                        onClick={onApply}
                        className="mt-6 w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                    >
                        Apply to Note
                    </button>
                )}
            </div>
        </div>
    );
};

export default AIOutputCard;
