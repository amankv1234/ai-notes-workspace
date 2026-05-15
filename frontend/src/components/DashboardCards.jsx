import React from 'react';
import { Clock, Sparkles, Share2, FileText } from 'lucide-react';

const DashboardCard = ({ label, value, icon: Icon, color }) => (
    <div className="bg-card border border-white/10 p-6 rounded-2xl flex items-center space-x-5 hover:border-white/20 transition-all shadow-xl shadow-black/20">
        <div className={`p-4 rounded-2xl bg-white/5 ${color} shadow-inner`}>
            <Icon size={24} />
        </div>
        <div>
            <p className="text-xs font-bold uppercase tracking-widest text-white/30 mb-1">{label}</p>
            <p className="text-3xl font-black">{value}</p>
        </div>
    </div>
);

const DashboardCards = ({ stats }) => {
    const data = [
        { label: 'Total Notes', value: stats.total, icon: FileText, color: 'text-blue-500' },
        { label: 'AI Insights', value: stats.aiProcessed, icon: Sparkles, color: 'text-purple-500' },
        { label: 'Public Links', value: stats.shared, icon: Share2, color: 'text-emerald-500' },
        { label: 'Recent Activity', value: '24', icon: Clock, color: 'text-orange-500' }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.map((item, i) => <DashboardCard key={i} {...item} />)}
        </div>
    );
};

export default DashboardCards;
