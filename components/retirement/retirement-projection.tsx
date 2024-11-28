"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

interface RetirementProjectionProps {
  data: any // You may want to define a more specific type here
}

export default function RetirementProjection({ data }: RetirementProjectionProps) {
  const { currentFinancialStatus, retirementGoal, assumptions } = data
  const { currentAge, currentSavings, monthlySavings } = currentFinancialStatus
  const { targetRetirementAge } = retirementGoal
  const { expectedInvestmentReturn, retirementContributionIncreaseRate } = assumptions

  const projectionData = []
  let currentYear = new Date().getFullYear()
  let currentAmount = currentSavings
  let currentMonthlySavings = monthlySavings

  for (let age = currentAge; age <= targetRetirementAge; age++) {
    projectionData.push({
      age,
      year: currentYear,
      amount: Math.round(currentAmount)
    })

    currentAmount = currentAmount * (1 + expectedInvestmentReturn / 100) + currentMonthlySavings * 12
    currentMonthlySavings *= (1 + retirementContributionIncreaseRate / 100)
    currentYear++
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Savings Projection</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            amount: {
              label: "Projected Savings",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={projectionData}>
              <XAxis dataKey="age" />
              <YAxis
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="var(primary)"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}