import React, { useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { AlertCircle, ArrowDownIcon, ArrowUpIcon, CreditCard, DollarSign, PieChart, Wallet } from 'lucide-react'
import { BarChart } from 'recharts'
import { Bar, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import { format } from 'date-fns'
import { useSupabase } from '@/app/demo/layout'
import DashboardInsights from '../DashboardInsights'

interface OverviewProps {
  goals: Array<{
    user_id: number;
    title: string;
    date: string;
    target_amount: number;
    current_amount: number;
    completed: boolean;
    description: string;
    image_url: string;
    monthly_contribution: number;

  }>;  

  balance: number;

  recentTransactions: Array<{
        id: number;
        user_id: number;
        date: string;
        amount: number;
        transaction_type: string;
        description: string;
        category: string;
        payment_method: string;
    }>;
  savingsGoalData: Array<{ name: string; actual: number; target: number }>;
  setActiveTab: (tab: string) => void;
}



export default function Overview({  goals, balance, recentTransactions, savingsGoalData, setActiveTab }: OverviewProps) {

    return (
    <div className='flex flex-col gap-4'>
    <div className="grid gap-4 auto-rows-fr md:grid-cols-2 lg:grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Balance
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM {balance.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +2.5% from last month
                        </p>
                        </CardContent>
                        </Card>
                        
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                        <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">
                            RM {recentTransactions
                                .filter(transaction => 
                                    transaction.transaction_type === 'debit' 
                                    // &&
                                    // transaction.date && // Ensure date exists
                                    // !isNaN(new Date(transaction.date).getTime()) && // Validate date
                                    // new Date(transaction.date).getMonth() === new Date().getMonth() && // Same month
                                    // new Date(transaction.date).getFullYear() === new Date().getFullYear() // Same year
                                )
                                .reduce((total, transaction) => total + (transaction.amount || 0), 0) // Ensure amount is valid
                                .toFixed(2)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                        +12% from last month
                        </p>
                        </CardContent>
                        </Card>

                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pocket Balance</CardTitle>
                        <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM {goals.reduce((total, goal) => total + goal.current_amount, 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +5% from last month
                        </p>
                        </CardContent>
                        </Card>

                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pocket Monthly Contribution</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM {goals.reduce((total, goal) => total + goal.monthly_contribution, 0).toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +7% from last month
                        </p>
                        </CardContent>
                        </Card>
                    </div>
                    <DashboardInsights/>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
                        <Card className="col-span-4">
                        <CardHeader>
                        <CardTitle>Spending Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                                {(() => {
                                    const combinedData = recentTransactions
                                    .filter(transaction => {
                                        const transactionDate = new Date(transaction.date);
                                        const now = new Date();
                                        return transaction.transaction_type === 'debit' 
                                    })
                                    .reduce((acc: { category: string; amount: number }[], transaction) => {
                                        const existingCategory = acc.find(item => item.category === transaction.category);
                                        if (existingCategory) {
                                            existingCategory.amount += transaction.amount;
                                        } else {
                                            acc.push({ category: transaction.category, amount: transaction.amount });
                                        }
                                        return acc;
                                    }, [])
                                    .sort((a, b) => b.amount - a.amount);
                                    return (
                                        <BarChart data={combinedData}>
                                            <XAxis
                                                dataKey="category"
                                                stroke="#777777"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                            />
                                            <YAxis
                                                stroke="#777777"
                                                fontSize={12}
                                                tickLine={false}
                                                axisLine={false}
                                                tickFormatter={(value) => `RM${value}`}
                                            />
                                            <Bar dataKey="amount" fill="#682bd7" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    );
                                })()}
                        </ResponsiveContainer>
                        </CardContent>
                        </Card>
                        <Card className="col-span-4 sm:col-span-3">
                        <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                         There are {recentTransactions.filter(transaction => new Date(transaction.date).getMonth() === new Date().getMonth()).length} transactions this month.
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-8">
                        {recentTransactions.slice(0, 5).map((transaction) => (
                            <div key={transaction.id} className="flex items-center jc">
                            <Avatar className="h-9 w-9 bg-primary/20 flex justify-center items-center rounded-full">
                            {/* <AvatarImage src="/avatars/01.png" alt="Avatar" /> */}
                            <AvatarFallback>{transaction.category[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                            {format(new Date(transaction.date), 'yyyy-MM-dd')}
                            </p>
                            </div>
                            <div className={`ml-auto  text-right ${
                                transaction.transaction_type === 'credit' ? 'text-green-600' : 'text-red-600'
                            } `}>
                                {transaction.transaction_type === 'credit' ? '+' : '-'}RM{transaction.amount.toFixed(2)}
                            </div>
                            </div>
                        ))}
                        </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))' }}>
                        <Card className="col-span-4">
                        <CardHeader>
                        <CardTitle>Savings Goal Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                        <LineChart data={savingsGoalData}>
                            <XAxis
                            dataKey="name"
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            />
                            <YAxis
                            stroke="#888888"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `RM ${value}`}
                            />
                            <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                        </ResponsiveContainer>
                        </CardContent>
                        </Card>
                        {/* <Card className="col-span-4 sm:col-span-3">
                        <CardHeader>
                        <CardTitle>Financial Insights</CardTitle>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-4">
                        <div className="flex items-center">
                            <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                            <p className="text-sm">Your dining out expenses are 15% higher than last month.</p>
                        </div>
                        <div className="flex items-center">
                            <ArrowUpIcon className="mr-2 h-4 w-4 text-green-500" />
                            <p className="text-sm">You're on track to meet your savings goal this month!</p>
                        </div>
                        <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4 text-blue-500" />
                            <p className="text-sm">Consider paying off your credit card balance to avoid interest.</p>
                        </div>
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button className="w-full" onClick={() => setActiveTab("analytics")}>
                        <PieChart className="mr-2 h-4 w-4" /> View Detailed Analysis
                        </Button>
                        </CardFooter>
                        </Card> */}
                    </div>
                    </div>
  )
}
