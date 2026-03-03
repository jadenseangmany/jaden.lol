"use client";

import { motion } from "framer-motion";
import React from "react";

export function FadeInStagger({ children, className = "w-full flex justify-center h-full flex-col items-center z-10" }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
                visible: { transition: { staggerChildren: 0.15 } },
                hidden: {}
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function FadeInItem({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
