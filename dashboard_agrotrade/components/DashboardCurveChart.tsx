"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Time-series mock data for the curve
const revenueData = [
  { name: 'Mon', revenue: 120000 },
  { name: 'Tue', revenue: 180000 },
  { name: 'Wed', revenue: 150000 },
  { name: 'Thu', revenue: 220000 },
  { name: 'Fri', revenue: 280000 },
  { name: 'Sat', revenue: 350000 },
  { name: 'Sun', revenue: 450000 },
];

export default function DashboardCurveChart() {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm mb-6">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900">Revenue Overview (Last 7 Days)</h2>
        <p className="text-sm text-gray-500">Total sales volume in DZD</p>
      </div>
      
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={revenueData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#166534" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#166534" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value) => [`${value} DZD`, 'Revenue']}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#166534" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}