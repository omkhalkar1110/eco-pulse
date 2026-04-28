import { motion } from "motion/react";

interface SpeedometerProps {
  value: number; // 0 to 100
  title: string;
  label: string;
}

export function Speedometer({ value, title, label }: SpeedometerProps) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100 dark:text-slate-800"
          />
          <motion.circle
            cx="80"
            cy="80"
            r={radius}
            stroke="#10B981"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{value}%</span>
          <span className="text-[10px] uppercase tracking-widest opacity-50">{label}</span>
        </div>
      </div>
      <h3 className="text-sm font-medium tracking-tight opacity-80">{title}</h3>
    </div>
  );
}
