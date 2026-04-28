import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function BentoItem({ children, className, delay = 0 }: BentoItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.01, translateY: -4 }}
      className={cn(
        "bento-item group bg-white dark:bg-gradient-to-br dark:from-slate-900/80 dark:to-black border border-gray-100 dark:border-slate-800/50 shadow-sm hover:shadow-xl",
        "hover:border-emerald-500/30 dark:hover:border-emerald-500/20 transition-all duration-500",
        "rounded-[2rem] p-6 sm:p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export function BentoGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-auto sm:auto-rows-[160px] md:auto-rows-[180px] gap-4 md:gap-6", className)}>
      {children}
    </div>
  );
}
