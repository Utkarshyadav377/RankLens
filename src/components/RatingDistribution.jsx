import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const getCFColor = (rating) => {
  if (rating < 1200) return '#9ca3af'; // gray (Newbie / Pupil)
  if (rating < 1400) return '#22c55e'; // green (Apprentice)
  if (rating < 1600) return '#06b6d4'; // cyan (Specialist)
  if (rating < 1900) return '#3b82f6'; // blue (Expert)
  if (rating < 2200) return '#a855f7'; // teal (Candidate Master)
  if (rating < 2400) return '#f97316'; // orange (Master)
  return '#ef4444'; // red (Grandmaster)
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-white/[0.08] backdrop-blur-xl px-3 py-2 rounded-lg shadow-xl">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Difficulty Rating</p>
        <p className="text-sm font-bold text-white font-mono mt-0.5">{data.rating}</p>
        <div className="h-px bg-white/[0.06] my-1.5" />
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Solved</p>
        <p className="text-base font-bold text-emerald-400 font-mono mt-0.5">
          {data.solved} {data.solved === 1 ? 'problem' : 'problems'}
        </p>
      </div>
    );
  }
  return null;
};

const RatingDistribution = ({ distribution }) => {
  if (!distribution || distribution.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-slate-900/10 border border-dashed border-white/[0.06] rounded-2xl text-slate-500 italic text-sm">
        No rating distribution data available.
      </div>
    );
  }

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={distribution}
          margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
        >
          <XAxis
            dataKey="rating"
            stroke="#475569"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <YAxis
            stroke="#475569"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
          <Bar dataKey="solved" radius={[4, 4, 0, 0]}>
            {distribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getCFColor(entry.rating)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RatingDistribution;
