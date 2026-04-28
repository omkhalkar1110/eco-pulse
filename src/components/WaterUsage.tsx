import { Droplets, TrendingDown } from "lucide-react";

export function WaterUsage() {
  return (
    <div className="flex flex-col h-full justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
          <Droplets size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold">Water Savings</h4>
          <p className="text-[10px] opacity-50 uppercase tracking-wider">This Month</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">420</span>
            <span className="text-xs text-slate-500">Liters Saved</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <TrendingDown size={12} className="text-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-bold">-12% vs Apr</span>
          </div>
        </div>
        
        <div className="flex gap-1 h-8 items-end">
          {[40, 60, 30, 80, 50, 70, 45].map((h, i) => (
            <div 
              key={i} 
              className="flex-1 bg-blue-500/20 rounded-t-sm hover:bg-blue-500/40 transition-colors cursor-pointer"
              style={{ height: `${h}%` }}
              title={`Day ${i+1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
