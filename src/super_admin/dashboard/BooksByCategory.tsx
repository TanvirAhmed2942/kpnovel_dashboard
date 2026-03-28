"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const BAR_FILL = "#6332BB";
const GRID_STROKE = "#E5E7EB";
const TICK_COLOR = "#9CA3AF";

const chartData = [
  { category: "Fantasy", books: 12000 },
  { category: "Romance", books: 18000 },
  { category: "Action", books: 25000 },
  { category: "Mystery", books: 32000 },
  { category: "Sci-Fi", books: 41000 },
  { category: "Horror", books: 55000 },
];

function BooksByCategory() {
  return (
    <Card className="rounded-xl border border-violet-200/60 bg-white shadow-xs">
      <CardHeader className="px-6 pb-2 pt-6">
        <CardTitle className="text-base font-bold text-gray-900">
          Books by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-2">
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 12, right: 12, left: 4, bottom: 8 }}
              barCategoryGap="18%"
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={GRID_STROKE}
                vertical
                horizontal
              />
              <XAxis
                dataKey="category"
                axisLine={false}
                tickLine={false}
                tick={{ fill: TICK_COLOR, fontSize: 12 }}
                interval={0}
              />
              <YAxis
                domain={[0, 60000]}
                ticks={[0, 15000, 30000, 45000, 60000]}
                tickLine={{ stroke: TICK_COLOR }}
                axisLine={{ stroke: TICK_COLOR }}
                tick={{ fill: TICK_COLOR, fontSize: 12 }}
                width={52}
                tickFormatter={(v) => v.toLocaleString()}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
                labelStyle={{ color: "#111827", fontWeight: 600 }}
                formatter={(value) =>
                  value != null
                    ? [Number(value).toLocaleString(), "Books"]
                    : ["", ""]
                }
              />
              <Bar
                dataKey="books"
                fill={BAR_FILL}
                radius={[6, 6, 0, 0]}
                maxBarSize={48}
                isAnimationActive={false}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default BooksByCategory;
