"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { month: "1月", cases: 12, education: 8, matching: 5 },
  { month: "2月", cases: 15, education: 12, matching: 7 },
  { month: "3月", cases: 10, education: 15, matching: 9 },
  { month: "4月", cases: 18, education: 10, matching: 6 },
  { month: "5月", cases: 14, education: 18, matching: 11 },
  { month: "6月", cases: 20, education: 14, matching: 8 },
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          </div>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
              <span className="text-sm font-medium">{entry.name}: </span>
              <span className="text-sm text-muted-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }
  return null
}

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>活動統計</CardTitle>
        <CardDescription>月別の活動データ</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" tick={{ fill: "hsl(var(--foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--foreground))" }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ paddingTop: "20px" }} iconType="circle" />
              <Bar dataKey="cases" name="症例" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="education" name="教育" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="matching" name="マッチング" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
