"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts"

interface InvestmentPortfolioProps {
  data: Array<{
    type: string
    value: number
    expectedReturnRate: number
  }>
}

export default function InvestmentPortfolio({ data }: InvestmentPortfolioProps) {
  const COLORS = ["hsl(var(--chart-1))", "hsl(var(--chart-2))"]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Portfolio</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Value",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<ChartTooltipContent />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4">
          {data.map((item, index) => (
            <div key={item.type} className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span>{item.type}</span>
              </div>
              <div className="text-right">
                <div>${item.value.toLocaleString()}</div>
                <div className="text-sm text-gray-500">
                  {((item.value / total) * 100).toFixed(1)}% | {item.expectedReturnRate}% return
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

