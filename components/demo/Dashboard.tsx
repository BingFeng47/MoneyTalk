'use client'
import { useState } from 'react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'
import { ArrowDownIcon, ArrowUpIcon, DollarSign, CreditCard, Wallet, PieChart, ArrowRightLeft, AlertCircle, Cannabis, Leaf, Sprout, Clover } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

// Mock data for the dashboard
const accountOverview = {
  balance: 28055.88,
  income: 8008,
  expenses: 6800,
  savings: 1208
}

const spendingData = [
  { category: 'Housing', amount: 1200 },
  { category: 'Food', amount: 500 },
  { category: 'Transportation', amount: 300 },
  { category: 'Utilities', amount: 200 },
  { category: 'Entertainment', amount: 150 },
  { category: 'Healthcare', amount: 100 },
]

const savingsGoalData = [
  { name: 'Jan', actual: 500, target: 600 },
  { name: 'Feb', actual: 700, target: 600 },
  { name: 'Mar', actual: 800, target: 600 },
  { name: 'Apr', actual: 900, target: 600 },
  { name: 'May', actual: 1100, target: 600 },
  { name: 'Jun', actual: 1300, target: 600 },
]

const recentTransactions = [
  { id: 1, description: 'Grocery Store', amount: -75.50, date: '2023-06-15', category: 'Food' },
  { id: 2, description: 'Salary Deposit', amount: 3000, date: '2023-06-14', category: 'Income' },
  { id: 3, description: 'Electric Bill', amount: -120, date: '2023-06-13', category: 'Utilities' },
  { id: 4, description: 'Online Shopping', amount: -59.99, date: '2023-06-12', category: 'Shopping' },
  { id: 5, description: 'Restaurant', amount: -45, date: '2023-06-11', category: 'Food' },
]

export function Dashboard() {
  const [selectedAccount, setSelectedAccount] = useState('all')
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Dashboard</h1>
                <div>
                    <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                        <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="all">
                            <span className="flex justify-center items-center gap-3">
                            <Cannabis strokeWidth={1.5} size={16} /> All Accounts
                            </span>
                        </SelectItem>
                        <SelectItem value="checking">
                            <span className="flex justify-center items-center gap-3">
                            <Leaf strokeWidth={1.5} size={16} /> Checking Accounts
                            </span>
                        </SelectItem>
                        <SelectItem value="savings">
                            <span className="flex justify-center items-center gap-3">
                            <Sprout strokeWidth={1.5} size={16} /> Savings Accounts
                            </span>
                        </SelectItem>
                        <SelectItem value="investment">
                            <span className="flex justify-center items-center gap-3">
                            <Clover strokeWidth={1.5} size={16} /> Investment Accounts
                            </span>
                        </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-4 p-8 pt-6">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="transaction">Transactions</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                        Total Balance
                        </CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM{accountOverview.balance.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +2.5% from last month
                        </p>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Income</CardTitle>
                        <ArrowUpIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM{accountOverview.income.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +5% from last month
                        </p>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                        <ArrowDownIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM{accountOverview.expenses.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +12% from last month
                        </p>
                        </CardContent>
                        </Card>
                        <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Savings</CardTitle>
                        <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                        <div className="text-2xl font-bold">RM{accountOverview.savings.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">
                        +7% from last month
                        </p>
                        </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        <Card className="col-span-4">
                        <CardHeader>
                        <CardTitle>Spending Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={spendingData}>
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
                        </ResponsiveContainer>
                        </CardContent>
                        </Card>
                        <Card className="col-span-4 sm:col-span-3">
                        <CardHeader>
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                        You made 12 transactions this month.
                        </CardDescription>
                        </CardHeader>
                        <CardContent>
                        <div className="space-y-8">
                        {recentTransactions.map((transaction) => (
                            <div key={transaction.id} className="flex items-center">
                            <Avatar className="h-9 w-9">
                            <AvatarImage src="/avatars/01.png" alt="Avatar" />
                            <AvatarFallback>{transaction.category[0]}</AvatarFallback>
                            </Avatar>
                            <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{transaction.description}</p>
                            <p className="text-sm text-muted-foreground">
                            {transaction.date}
                            </p>
                            </div>
                            <div className={`ml-auto font-medium RM{transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.amount > 0 ? '+' : '-'}RM{Math.abs(transaction.amount).toFixed(2)}
                            </div>
                            </div>
                        ))}
                        </div>
                        </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
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
                            tickFormatter={(value) => `RM${value}`}
                            />
                            <Line type="monotone" dataKey="actual" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} strokeDasharray="5 5" />
                        </LineChart>
                        </ResponsiveContainer>
                        </CardContent>
                        </Card>
                        <Card className="col-span-4 sm:col-span-3">
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
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
      </div>
    </div>
  )
}