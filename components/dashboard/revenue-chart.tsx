"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashboardSeriesPoint } from "@/types/app";

export function RevenueChart({ data }: { data: DashboardSeriesPoint[] }) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e7e5e4" />
          <XAxis dataKey="month" stroke="#78716c" tickLine={false} axisLine={false} />
          <YAxis stroke="#78716c" tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: "rgba(245, 245, 244, 0.85)" }} />
          <Bar dataKey="revenue" radius={[12, 12, 0, 0]} fill="#1c1917" />
          <Bar dataKey="orders" radius={[12, 12, 0, 0]} fill="#d97706" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

