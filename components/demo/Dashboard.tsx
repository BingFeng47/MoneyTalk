'use client'
import { useEffect, useState } from 'react'
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
import { useSupabase } from '@/app/demo/layout'
import Transaction from './Transaction'
import Overview from './Overview'


// Mock data for the dashboard
const accountOverview = {
  balance: 8055.00,
  pocket_balance: 2800,
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

interface transaction{
    id: number,
    user_id: number,
    date: string,
    amount: number,
    transaction_type: string,
    description: string,
    category: string,
    payment_method: string,
}


export function Dashboard() {
    // Supabase
    const supabase = useSupabase(); // Access the Supabase client
    const [transactions, setTransactions] = useState<transaction[]>([])

    // State
    const [selectedAccount, setSelectedAccount] = useState('all')
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        const fetchTransactions = async () => {
            const { data, error } = await supabase
                .from('transactions')
                .select('*')
                .order('date', { ascending: false })

            if (error) {
                console.error('Error fetching transactions:', error)
            } else {
                setTransactions(data)
            }
        }

        fetchTransactions()
    }, [supabase])

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
                    <Overview accountOverview={accountOverview} setActiveTab={setActiveTab} spendingData={spendingData} recentTransactions={transactions} savingsGoalData={savingsGoalData}/>
                </TabsContent>

                <TabsContent value="transaction" className="space-y-4">
                    <Transaction/>
                </TabsContent>

            </Tabs>
      </div>
    </div>
  )
}