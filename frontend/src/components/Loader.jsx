import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
    const containerClasses = fullScreen 
        ? "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
        : "flex items-center justify-center p-8 w-full";

    return (
        <div className={containerClasses}>
            <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full shadow-lg shadow-accent/20"
            />
        </div>
    );
};

export default Loader;
