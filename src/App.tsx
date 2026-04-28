import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { AppHeader } from "./components/AppHeader";
import { BentoGrid, BentoItem } from "./components/BentoGrid";
import { Speedometer } from "./components/Speedometer";
import { EnergyChart } from "./components/EnergyChart";
import { ProductDiscovery } from "./components/ProductDiscovery";
import { GamifiedGoals } from "./components/GamifiedGoals";
import { AIAssistant } from "./components/AIAssistant";
import { ActivityTracker } from "./components/ActivityTracker";
import { AQIMonitor } from "./components/AQIMonitor";
import { WaterUsage } from "./components/WaterUsage";
import { motion } from "motion/react";
import { Zap, Users, Trophy, ArrowUpRight, CloudSun } from "lucide-react";
import { cn } from "@/src/lib/utils";

export default function App() {
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [stats, setStats] = useState({
    score: 72,
    savings: 12.4,
    xp: 2450,
    level: 12
  });

  const handleActivityComplete = (impact: number) => {
    setStats(prev => ({
      ...prev,
      score: Math.min(100, prev.score + Math.round(impact * 2)),
      savings: Number((prev.savings + impact).toFixed(1)),
      xp: prev.xp + 50
    }));
    // Simple level up logic
    if (stats.xp + 50 >= stats.level * 250) {
      setStats(prev => ({ ...prev, level: prev.level + 1 }));
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-paper dark:bg-obsidian text-gray-900 dark:text-white transition-colors duration-500 pb-20">
        <AppHeader 
          onOpenAssistant={() => setIsAssistantOpen(true)} 
          score={stats.score}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 sm:pt-40 lg:pt-48 space-y-8 sm:space-y-12">
          {/* Hero Section / Welcome */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-2">
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold block">
                  Active Intelligence
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl lg:text-5xl font-light leading-[1.1] max-w-2xl text-slate-100"
              >
                Your carbon footprint is <span className="font-semibold text-emerald-400 italic">12% lower</span> this month.
              </motion.h1>
              <p className="text-slate-400 font-medium max-w-md text-sm sm:text-base leading-relaxed">
                Optimized energy routing in your locale has saved <span className="text-white">{stats.savings}kg</span> of CO₂ emissions.
              </p>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsTrackerOpen(true)}
              className="px-8 py-4 bg-white text-black rounded-2xl sm:rounded-full font-bold text-sm shadow-xl hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 active:scale-95 shrink-0"
            >
              <Zap size={18} fill="currentColor" />
              Log Activity
            </motion.button>
          </header>

          <BentoGrid>
            {/* Row 1: Actionable Insight & Environmental Context */}
            {/* Daily Challenge */}
            <BentoItem className="md:col-span-2" delay={0.1}>
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/5">
                    <Trophy size={20} />
                  </div>
                  <h4 className="text-sm font-bold lowercase tracking-tight italic text-amber-500">Local Quest</h4>
                </div>
                <div>
                  <p className="text-sm font-semibold opacity-80">Metro Commuter</p>
                  <p className="text-[10px] opacity-40 mt-1">Earn 'Urban Nomad' badge.</p>
                </div>
              </div>
            </BentoItem>

            {/* Weather Tip */}
            <BentoItem className="md:col-span-2" delay={0.2}>
              <div className="flex flex-col h-full justify-between gap-4">
                 <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                    <CloudSun size={20} />
                  </div>
                  <h4 className="text-sm font-bold">Eco Tip</h4>
                </div>
                <div>
                  <p className="text-xs font-semibold opacity-80 italic">"High humidity today. Prefer traditional cooling (Matkas) over AC for energy Hydration."</p>
                </div>
              </div>
            </BentoItem>

            {/* AQI Monitor */}
            <BentoItem className="md:col-span-2" delay={0.3}>
              <AQIMonitor />
            </BentoItem>

            {/* Row 2 & 3: Deep Analytics & Core Impact */}
            {/* Energy Analytics */}
            <BentoItem className="row-span-2 md:col-span-4 md:row-span-2" delay={0.4}>
              <div className="h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Energy Analytics</h3>
                    <p className="text-xs opacity-50">Predictive usage for May 2026</p>
                  </div>
                  <div className="flex gap-1 bg-gray-100 dark:bg-slate-900/50 p-1 rounded-lg self-end sm:self-auto">
                    {['24h', '7d', '30d'].map(t => (
                      <button key={t} className={cn(
                        "px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all",
                        t === '7d' ? "bg-white dark:bg-slate-800 text-emerald-500" : "opacity-40 hover:opacity-100"
                      )}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 min-h-[220px]">
                  <EnergyChart />
                </div>
              </div>
            </BentoItem>

            {/* Main Carbon Footprint */}
            <BentoItem className="row-span-2 md:col-span-2 md:row-span-2 flex flex-col justify-between" delay={0.5}>
              <div className="flex justify-between items-start mb-4 md:mb-0">
                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500 font-bold block">Impact Pulse</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <ArrowUpRight size={18} />
                </div>
              </div>
              <Speedometer value={stats.score} title="Carbon Efficiency" label="Sustainable Score" />
              <div className="pt-4 mt-4 border-t border-gray-100 dark:border-slate-800/50">
                <p className="text-xs opacity-50 leading-relaxed text-center md:text-left">
                  You've avoided <span className="text-emerald-500 font-bold">{stats.savings}kg</span> of CO₂ emissions this week. 
                </p>
              </div>
            </BentoItem>

            {/* Row 4: Secondary Metrics & Gamification */}
            {/* Water Usage */}
            <BentoItem className="md:col-span-2" delay={0.6}>
              <WaterUsage />
            </BentoItem>

            {/* Neighborhood Impact */}
            <BentoItem className="md:col-span-2" delay={0.7}>
              <div className="flex flex-col h-full justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/5">
                    <Users size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">Community</h4>
                    <p className="text-[10px] opacity-50">Bengaluru Network</p>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold">1.2 Tons</p>
                  <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-1">Total Savings</p>
                </div>
              </div>
            </BentoItem>

            {/* Badges and Progress */}
            <BentoItem className="md:col-span-2" delay={0.8}>
              <GamifiedGoals level={stats.level} xp={stats.xp} />
            </BentoItem>

            {/* Product Discovery Gallery */}
            <div className="md:col-span-6 mt-8">
              <ProductDiscovery />
            </div>
          </BentoGrid>
        </main>

        <AIAssistant 
          isOpen={isAssistantOpen} 
          onClose={() => setIsAssistantOpen(false)} 
        />
        <ActivityTracker 
          isOpen={isTrackerOpen} 
          onClose={() => setIsTrackerOpen(false)} 
          onComplete={handleActivityComplete}
        />
      </div>
    </ThemeProvider>
  );
}
