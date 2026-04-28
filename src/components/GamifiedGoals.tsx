import { motion } from "motion/react";
import { Award, Shield, Zap, Wind } from "lucide-react";

const badges = [
  { icon: Award, label: "Zero Waster", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Shield, label: "Green Guard", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Zap, label: "Energy Star", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Wind, label: "Carbon Neutral", color: "text-purple-500", bg: "bg-purple-500/10" },
];

export function GamifiedGoals({ level, xp }: { level: number; xp: number }) {
  const nextLevelXp = level * 250;
  const progress = (xp % 250) / 250 * 100;
  const xpRemaining = nextLevelXp - xp;

  return (
    <div className="h-full flex flex-col justify-between p-2">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold uppercase tracking-widest opacity-50">Level {level}</span>
          <span className="text-xs font-bold text-emerald-500">{xp.toLocaleString()} XP</span>
        </div>
        <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
          />
        </div>
        <p className="text-[10px] opacity-40 text-center">{xpRemaining} XP until Level {level + 1}</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {badges.map((Badge, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={`aspect-square rounded-2xl ${Badge.bg} flex items-center justify-center cursor-help`}
            title={Badge.label}
          >
            <Badge.icon size={20} className={Badge.color} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
