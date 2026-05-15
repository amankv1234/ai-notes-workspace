import React from 'react';
import { motion } from 'framer-motion';

const Skeleton = ({ className }) => {
    return (
        <div className={`overflow-hidden relative bg-white/5 rounded-xl ${className}`}>
            <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "linear" 
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
        </div>
    );
};

export const NoteCardSkeleton = () => (
    <div className="p-6 rounded-[2rem] bg-card border border-white/5 space-y-4">
        <div className="flex justify-between">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-5 rounded-full" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <div className="pt-4 border-t border-white/5 flex justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
        </div>
    </div>
);

export const DashboardStatsSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
            <Skeleton key={i} className="h-32 rounded-[2.5rem]" />
        ))}
    </div>
);

export default Skeleton;
