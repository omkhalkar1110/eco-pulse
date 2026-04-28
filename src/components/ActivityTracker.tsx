import { motion, AnimatePresence } from "motion/react";
import { X, Plus, Activity, Cloud, Droplets, Zap } from "lucide-react";
import { useState } from "react";
import { cn } from "@/src/lib/utils";

const activities = [
  { id: 'commute', icon: Activity, label: "Public Transport (Bus/Metro)", impact: -2.2 },
  { id: 'water', icon: Droplets, label: "Local/Traditional Water Source", impact: -0.6 },
  { id: 'energy', icon: Zap, label: "LED Bulb Swap", impact: -1.1 },
  { id: 'waste', icon: Cloud, label: "Waste Segregation (Dry/Wet)", impact: -1.4 },
];

export function ActivityTracker({ isOpen, onClose, onComplete }: { isOpen: boolean; onClose: () => void; onComplete: (impact: number) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleComplete = () => {
    if (!selected) return;
    const act = activities.find(a => a.id === selected);
    if (act) {
      onComplete(Math.abs(act.impact));
      setSelected(null);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[60]"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 100 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 100 }}
            className="fixed bottom-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 w-full max-w-lg bg-white dark:bg-obsidian rounded-t-4xl sm:rounded-4xl p-6 sm:p-8 z-[70] border-t sm:border border-gray-100 dark:border-slate-800/50 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Log Eco Action</h2>
                <p className="text-sm opacity-50 mt-1">What sustainable choice did you make today?</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {activities.map((act) => (
                <button
                  key={act.id}
                  onClick={() => setSelected(act.id)}
                  className={cn(
                    "p-6 rounded-2xl border transition-all flex flex-col items-start gap-4 active:scale-95 text-left",
                    selected === act.id 
                      ? "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.1)]" 
                      : "bg-gray-50 dark:bg-white/5 border-transparent hover:border-gray-200 dark:hover:border-white/10"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center",
                    selected === act.id ? "bg-emerald-500 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-500"
                  )}>
                    <act.icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{act.label}</p>
                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">{act.impact} kg CO2</p>
                  </div>
                </button>
              ))}
            </div>

            <button 
              disabled={!selected}
              onClick={handleComplete}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
            >
              <Plus size={20} className="group-hover:rotate-90 transition-transform" />
              Complete Action
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
