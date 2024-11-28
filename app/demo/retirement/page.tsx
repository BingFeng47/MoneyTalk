'use client'
import InvestmentPortfolio from "@/components/retirement/investment-portfolio"
import RetirementProjection from "@/components/retirement/retirement-projection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react";
import { useAccount, useSupabase } from "../layout";
import { Button } from "@/components/ui/button"
import Insights from "@/components/RetirementInsights"
import RetirementInsights from "@/components/RetirementInsights"

interface RetirementPlanData {
    user_id: string;
    target_retirement_age: number;
    monthly_income_after_retirement: number;
    life_expentancy: number;
    current_age: number;
    current_savings: number;
    monthly_savings: number;
    annual_income: number;
    shortfall_amount: number;
    saving_requires_per_month: number;
}

interface User{
    id: number,
    name: string,
    age: number,
    gender: string,
    contact: string,
    address: string,
    email: string,
    balance: number,
    cimb_balance: number,
    maybank_balance: number,
    monthly_income: number,
    monthly_expenses: number,
} 


export default function Retirement() {
    const [retirementPlanData, setRetirementPlanData] = useState<RetirementPlanData | null>(null)
    const [user, setUser] = useState<User>()

    const supabase = useSupabase()
    useEffect(() => {
        supabase.from('retirement_plan').select('*').then(({ data, error }) => {
            if (error) throw error
            setRetirementPlanData(data[0] || null)
        })

        supabase.from('user').select('*').eq('id', 2024001).then(({ data, error }) => {
            if (error) throw error
            setUser(data[0]|| null)
        })

    }, [])

    useEffect(() => {
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


 
  const {account} = useAccount()
  const balance = ((user?.cimb_balance ?? 0) + (user?.maybank_balance ?? 0)).toFixed(2)
  const goal = (((retirementPlanData?.life_expentancy ?? 0)-(retirementPlanData?.target_retirement_age ?? 0))*(retirementPlanData?.monthly_income_after_retirement ?? 0)).toFixed(2)
  const yearsUntilRetirement = (retirementPlanData?.target_retirement_age ?? 0) - (retirementPlanData?.current_age ?? 0)
  const progressPercentage = parseFloat(balance)/parseFloat(goal)* 100
  const savingsPerMonth = ((parseFloat(goal) - parseFloat(balance)) / yearsUntilRetirement).toFixed(2)
  const monthlySavings = (user?.monthly_income ?? 0) - (user?.monthly_expenses ?? 0)
  return (
    <div className="w-full pb-10">
      <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Retirement Plan</h1>
            <p className='uppercase text-gray-400 text-sm px-6'>{account}</p>
            </div>
        </div>

        {retirementPlanData?
        <div className="flex  flex-col gap-5 px-5 pt-10">
            <RetirementInsights/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
            <CardHeader>
                <CardTitle>Current Financial Status</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                <div>
                    <dt className="text-sm font-medium text-gray-500">Current Age</dt>
                    <dd className="text-lg font-semibold">{retirementPlanData?.current_age}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Current Savings</dt>
                    <dd className="text-lg font-semibold">RM {  balance}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Monthly Savings</dt>
                    <dd className="text-lg font-semibold">RM {monthlySavings}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Annual Income</dt>
                    <dd className="text-lg font-semibold">RM {retirementPlanData?.annual_income}</dd>
                </div>
                </dl>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Retirement Goals</CardTitle>
            </CardHeader>
            <CardContent>
                <dl className="grid grid-cols-2 gap-4">
                <div>
                    <dt className="text-sm font-medium text-gray-500">Target Retirement Age</dt>
                    <dd className="text-lg font-semibold">{retirementPlanData?.target_retirement_age}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Years Until Retirement</dt>
                    <dd className="text-lg font-semibold">{yearsUntilRetirement}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Monthly Income After Retirement</dt>
                    <dd className="text-lg font-semibold">RM {retirementPlanData?.monthly_income_after_retirement}</dd>
                </div>
                <div>
                    <dt className="text-sm font-medium text-gray-500">Life Expectancy</dt>
                    <dd className="text-lg font-semibold">{retirementPlanData?.life_expentancy} years</dd>
                </div>
                </dl>
            </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
            <CardTitle>Retirement Savings Progress</CardTitle>
            <CardDescription>You're on track to retire at age {retirementPlanData?.target_retirement_age}</CardDescription>
            </CardHeader>
            <CardContent>
            <Progress value={progressPercentage} className="w-full h-4 mb-2" />
            <div className="flex justify-between text-sm text-gray-500">
                <span>Current: RM {balance}</span>
                <span>Goal: RM {goal}</span>
            </div>
            <div className="mt-4 text-center">
                <p className="text-lg font-semibold">Shortfall: RM {parseFloat(goal) - parseFloat(balance)}</p>
                <p className="text-sm text-gray-500">Required monthly savings: RM {savingsPerMonth}</p>
            </div>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* <RetirementProjection data={retirementPlanData} /> */}
            {/* <InvestmentPortfolio data={retirementPlanData.investmentPortfolio} /> */}
        </div>
        </div>
        
      :
        <div className="flex items-center justify-center h-96 flex-col gap-3">
            <p className="text-gray-500">No retirement plan data found</p>
            <Button onClick={() => console.log('Create retirement plan')} variant="default" className="">Create Retirement Plan</Button>
        </div>
        }
      
    </div>
  )
}

