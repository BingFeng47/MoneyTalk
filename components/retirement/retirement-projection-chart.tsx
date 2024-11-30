'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface RetirementProjectionChartProps {
  currentAge: number
  targetRetirementAge: number
  currentSavings: number
  monthlySavings: number
  goalAmount: number
}

export default function RetirementProjectionChart({
  currentAge,
  targetRetirementAge,
  currentSavings,
  monthlySavings,
  goalAmount,
}: RetirementProjectionChartProps) {
  const projectionData = generateProjectionData(
    currentAge,
    targetRetirementAge,
    currentSavings,
    monthlySavings,
    goalAmount
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Savings Projection</CardTitle>
        <CardDescription>Projected growth of your retirement savings over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            savings: {
              label: "Savings",
              color: "hsl(var(--chart-1))",
            },
            goal: {
              label: "Goal",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <XAxis
                dataKey="age"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${(value)}`}
              />
              <Line
                type="monotone"
                dataKey="savings"
                strokeWidth={2}
                activeDot={{
                  r: 8,
                  style: { fill: "var(--color-savings)", opacity: 0.8 },
                }}
                style={
                  {
                    stroke: "var(--color-savings)",
                    opacity: 0.8,
                  } as React.CSSProperties
                }
              />
              <Line
                type="monotone"
                dataKey="goal"
                strokeWidth={2}
                style={
                  {
                    stroke: "var(--color-goal)",
                    opacity: 0.8,
                  } as React.CSSProperties
                }
              />
              <ChartTooltip content={<CustomTooltip />} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <ChartTooltipContent>
        <div className="text-sm font-bold">Age {label}</div>
        <div className="text-xs text-muted-foreground">
          Savings: {(payload[0].value)}
        </div>
        <div className="text-xs text-muted-foreground">
          Goal: {(payload[1].value)}
        </div>
      </ChartTooltipContent>
    )
  }

  return null
}

function generateProjectionData(
  currentAge: number,
  targetRetirementAge: number,
  currentSavings: number,
  monthlySavings: number,
  goalAmount: number
) {
  const data = []
  let currentSavingsAmount = currentSavings

  for (let age = currentAge; age <= targetRetirementAge; age++) {
    currentSavingsAmount += monthlySavings * 12
    // Assume a 5% annual return on investments
    currentSavingsAmount *= 1.05

    data.push({
      age,
      savings: Math.round(currentSavingsAmount),
      goal: goalAmount,
    })
  }

  return data
}

