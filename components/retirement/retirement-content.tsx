'use client'

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { InfoIcon } from 'lucide-react'
import { useSupabase } from "@/app/demo/layout"
import { Alert, AlertDescription, AlertTitle } from "../ui/alert"
// import RetirementProjectionChart from "./retirement-projection-chart"

interface RetirementPlanData {
  user_id: string
  target_retirement_age: number
  monthly_income_after_retirement: number
  life_expentancy: number
  current_age: number
  current_savings: number
  monthly_savings: number
  annual_income: number
  shortfall_amount: number
  saving_requires_per_month: number
}

interface User {
  id: number
  name: string
  age: number
  gender: string
  contact: string
  address: string
  email: string
  balance: number
  cimb_balance: number
  maybank_balance: number
  monthly_income: number
  monthly_expenses: number
}

export default function RetirementContent() {
  const [retirementPlanData, setRetirementPlanData] = useState<RetirementPlanData | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const supabase = useSupabase()

  useEffect(() => {
    const fetchData = async () => {
      await supabase.from('retirement_plan').select('*').order('created_at', { ascending: false }).then(({ data, error }) => {
        if (error) throw error
        setRetirementPlanData(data[0] || null)
      })

      const { data: userData, error: userError } = await supabase.from('user').select('*').eq('id', 2024001).single()
      if (userError) console.error('Error fetching user data:', userError)
      else setUser(userData)
    }

    fetchData()

    const channel = supabase
      .channel('retirement-plan-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'retirement_plan' }, payload => {
        setRetirementPlanData(payload.new as RetirementPlanData)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  if (!retirementPlanData || !user) {
    return (
      <div className="flex items-center justify-center h-96 flex-col gap-3">
        <p className="text-gray-500">No retirement plan data found</p>
        <Button onClick={() => console.log('Create retirement plan')} variant="default">Create Retirement Plan</Button>
      </div>
    )
  }

  const balance = user.cimb_balance + user.maybank_balance
  const goal = (retirementPlanData.life_expentancy - retirementPlanData.target_retirement_age) * retirementPlanData.monthly_income_after_retirement * 12
  const yearsUntilRetirement = retirementPlanData.target_retirement_age - retirementPlanData.current_age
  const progressPercentage = (balance / goal) * 100
  const shortfall = goal - balance
  const requiredMonthlySavings = shortfall / (yearsUntilRetirement * 12)
  const currentMonthlySavings = user.monthly_income - user.monthly_expenses

  return (
    <div className="space-y-6 p-6">
      <Alert>
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Retirement Plan Overview</AlertTitle>
        <AlertDescription>
          You're on track to retire at age {retirementPlanData.target_retirement_age}. Keep up the good work!
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FinancialStatusCard user={user} retirementPlanData={retirementPlanData} />
        <RetirementGoalsCard retirementPlanData={retirementPlanData} yearsUntilRetirement={yearsUntilRetirement} />
      </div>

      <RetirementProgressCard
        balance={balance}
        goal={goal}
        progressPercentage={progressPercentage}
        shortfall={shortfall}
        requiredMonthlySavings={requiredMonthlySavings}
        currentMonthlySavings={currentMonthlySavings}
      />

      {/* <RetirementProjectionChart
        currentAge={retirementPlanData.current_age}
        targetRetirementAge={retirementPlanData.target_retirement_age}
        currentSavings={balance}
        monthlySavings={currentMonthlySavings}
        goalAmount={goal}
      /> */}
    </div>
  )
}

function FinancialStatusCard({ user, retirementPlanData }: { user: User, retirementPlanData: RetirementPlanData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Financial Status</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Current Age</dt>
            <dd className="text-lg font-semibold">{retirementPlanData.current_age}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Current Savings</dt>
            <dd className="text-lg font-semibold">{(user.cimb_balance + user.maybank_balance)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Monthly Savings</dt>
            <dd className="text-lg font-semibold">{(user.monthly_income - user.monthly_expenses)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
            <dd className="text-lg font-semibold">{(retirementPlanData.annual_income)}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

function RetirementGoalsCard({ retirementPlanData, yearsUntilRetirement }: { retirementPlanData: RetirementPlanData, yearsUntilRetirement: number }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm font-medium text-gray-500">Target Retirement Age</dt>
            <dd className="text-lg font-semibold">{retirementPlanData.target_retirement_age}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Years Until Retirement</dt>
            <dd className="text-lg font-semibold">{yearsUntilRetirement}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Monthly Income After Retirement</dt>
            <dd className="text-lg font-semibold">{(retirementPlanData.monthly_income_after_retirement)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Life Expectancy</dt>
            <dd className="text-lg font-semibold">{retirementPlanData.life_expentancy} years</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  )
}

function RetirementProgressCard({ balance, goal, progressPercentage, shortfall, requiredMonthlySavings, currentMonthlySavings }: {
  balance: number
  goal: number
  progressPercentage: number
  shortfall: number
  requiredMonthlySavings: number
  currentMonthlySavings: number
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Retirement Savings Progress</CardTitle>
        <CardDescription>Track your progress towards your retirement goal</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="w-full h-4 mb-2" />
        <div className="flex justify-between text-sm text-gray-500">
          <span>Current: {(balance)}</span>
          <span>Goal: {(goal)}</span>
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-semibold">Shortfall: RM {(shortfall.toFixed(2))}</p>
          <p className="text-sm text-gray-500">Required monthly savings: RM {requiredMonthlySavings.toFixed(2)}</p>
          <p className="text-sm text-gray-500">Current monthly savings: RM {(currentMonthlySavings.toFixed(2))}</p>
        </div>
        {currentMonthlySavings < requiredMonthlySavings && (
          <Alert variant="default" className="mt-4">
            <AlertTitle>Savings Gap</AlertTitle>
            <AlertDescription>
              You're currently saving RM {(currentMonthlySavings.toFixed(2))} per month, but you need to save RM {(requiredMonthlySavings.toFixed(2))} to reach your retirement goal. Consider increasing your monthly savings by RM {(requiredMonthlySavings - currentMonthlySavings).toFixed(2)}.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

