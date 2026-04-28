import { Wind, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function AQIMonitor() {
  const aqi = 68; // Sample AQI for Bengaluru
  
  const getStatus = (val: number) => {
    if (val <= 50) return { label: "Good", color: "text-emerald-500", bg: "bg-emerald-500/10" };
    if (val <= 100) return { label: "Satisfactory", color: "text-amber-500", bg: "bg-amber-500/10" };
    return { label: "Poor", color: "text-red-500", bg: "bg-red-500/10" };
  };

  const status = getStatus(aqi);

  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", status.bg, status.color)}>
            <Wind size={20} />
          </div>
          <div>
            <h4 className="text-sm font-bold">AQI Pulse</h4>
            <p className="text-[10px] opacity-50 uppercase tracking-wider">Bengaluru Central</p>
          </div>
        </div>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Info size={14} />
        </button>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold">{aqi}</span>
          <span className={cn("text-xs font-bold", status.color)}>{status.label}</span>
        </div>
        <div className="w-full h-1 bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className={cn("h-full transition-all duration-1000", status.color.replace('text', 'bg'))} 
            style={{ width: `${Math.min(100, (aqi/200)*100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
