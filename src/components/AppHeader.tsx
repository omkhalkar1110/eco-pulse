import { Leaf, Sun, Moon, Sparkles, Menu, Search, Command, TrendingUp } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/src/lib/utils";
import { useState, useEffect } from "react";

const ecoInsights = [
  "Global CO2 concentrations: 421.5 ppm",
  "India added 2.3GW Solar capacity this month",
  "Plastic waste down 12% in Bengaluru",
  "Renewable energy share: 42.5% today",
  "Community goal: 50 tons CO2 saved"
];

export function AppHeader({ 
  onOpenAssistant, 
  score = 72 
}: { 
  onOpenAssistant: () => void;
  score?: number;
}) {
  const { theme, toggleTheme } = useTheme();
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setInsightIndex((prev) => (prev + 1) % ecoInsights.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Calculate pulse color based on sustainability score
  const pulseColor = score >= 75 
    ? "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]" 
    : score >= 50 
      ? "bg-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
      : "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]";

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex flex-col">
      {/* Top Banner Ticker */}
      <div className="bg-emerald-500/10 dark:bg-emerald-500/5 py-1.5 border-b border-emerald-500/10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={insightIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-500 drop-shadow-sm"
            >
              <TrendingUp size={12} />
              <span>{ecoInsights[insightIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-white/50 dark:bg-obsidian/50 backdrop-blur-xl border-b border-gray-100 dark:border-slate-800/50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Logo with Pulse */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-lg shadow-emerald transition-shadow duration-500">
                <Leaf className="text-black" size={20} strokeWidth={2.5} />
              </div>
              {/* The Live Pulse Indicator */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 1, 0.8] 
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className={cn(
                  "absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-obsidian transition-all duration-1000",
                  pulseColor
                )}
              />
            </div>
            <span className="text-xl font-semibold tracking-tight hidden sm:inline">Eco<span className="text-emerald-500 opacity-80">Pulse</span></span>
          </div>

          {/* AI Command Bar */}
          <div className="flex-1 max-w-xl group relative hidden lg:block">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
              <Search size={16} />
            </div>
            <input 
              type="text" 
              placeholder="Search or ask AI..." 
              className="w-full bg-gray-100 dark:bg-slate-900/50 border border-transparent focus:border-emerald-500/30 rounded-full py-2.5 pl-12 pr-12 text-xs font-medium outline-none transition-all focus:ring-4 focus:ring-emerald-500/10"
            />
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[10px] text-slate-500">
                <Command size={10} />
                <span>K</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <nav className="hidden xl:flex items-center gap-8">
              {["Marketplace", "Community"].map((item) => (
                <button key={item} className="text-sm font-medium transition-all hover:text-emerald-500 text-gray-400">
                  {item}
                </button>
              ))}
              <div className="h-4 w-px bg-gray-200 dark:bg-slate-800 mx-2" />
            </nav>

            <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-900/50 p-1 rounded-full border border-gray-200 dark:border-slate-800">
              <button 
                onClick={() => theme === 'dark' && toggleTheme()}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  theme === 'light' ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-white"
                )}
              >
                <Sun size={14} />
              </button>
              <button 
                onClick={() => theme === 'light' && toggleTheme()}
                className={cn(
                  "p-1.5 rounded-full transition-all",
                  theme === 'dark' ? "bg-emerald-500/20 text-emerald-400 shadow-sm" : "text-gray-500 hover:text-gray-900"
                )}
              >
                <Moon size={14} />
              </button>
            </div>
            
            <button 
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-3 sm:px-6 py-2 sm:py-2.5 bg-white dark:bg-white text-black hover:bg-emerald-400 dark:hover:bg-emerald-400 rounded-full text-xs font-bold transition-all shadow-lg active:scale-95"
            >
              <Sparkles size={14} className="text-emerald-500 dark:text-emerald-500 sm:text-inherit" />
              <span className="hidden sm:inline">Ask Assistant</span>
            </button>

            <button className="md:hidden p-2">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
