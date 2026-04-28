import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { name: 'Mon', usage: 12 },
  { name: 'Tue', usage: 15 },
  { name: 'Wed', usage: 11 },
  { name: 'Thu', usage: 9 },
  { name: 'Fri', usage: 14 },
  { name: 'Sat', usage: 18 },
  { name: 'Sun', usage: 13 },
];

export function EnergyChart() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUsage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(30, 41, 59, 0.5)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888', fontSize: 10 }}
          />
          <YAxis 
            hide={true}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#111', border: 'none', borderRadius: '12px', fontSize: '12px' }}
            itemStyle={{ color: '#10B981' }}
          />
          <Area 
            type="monotone" 
            dataKey="usage" 
            stroke="#10B981" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorUsage)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
