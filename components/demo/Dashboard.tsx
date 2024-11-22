'use client'
import { useEffect, useState } from 'react'
import { Cannabis, Leaf, Sprout, Clover } from 'lucide-react'
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import Analytics from './Analytics'

interface Goal {
    user_id: number,
    title: string,
    date: string,
    target_amount: number,
    current_amount: number,
    completed: boolean,
    description: string,
    image_url: string,
    monthly_contribution: number,
}


const savingsGoalData = [
  { name: 'Jun', actual: 2800, target: 3130 },
  { name: 'Jul', actual: 3000, target: 3130 },
  { name: 'Aug', actual: 2700, target: 3130 },
  { name: 'Sept', actual: 4100, target: 3130 },
  { name: 'Oct', actual: 2700, target: 3130 },
  { name: 'Nov', actual: 3130, target: 3130 },
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


export function Dashboard({ account }: { account: string }) {
    // Supabase
    const supabase = useSupabase(); // Access the Supabase client
    const [transactions, setTransactions] = useState<transaction[]>([])
    const [balance, setBalance] = useState(0)
    const [goals, setGoals] = useState<Goal[]>([])

    // State
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        
        // Fetch transactions
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

        // Fetch balance
        const fetchBalance = async () => {
            const { data, error } = await supabase
                .from('user')
                .select('balance')
                .eq('id', 2024001)

            if (error) {
                console.error('Error fetching balance:', error)
            } else {
                setBalance(data[0].balance)
            }
        }

        // Fetch goal
        const fetchPocket = async () => {
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .eq('user_id', 2024001)

            if (error) {
                console.error('Error fetching goals:', error)
            } else {
                setGoals(data)
            }
        }

        fetchPocket()
        fetchBalance()
        fetchTransactions()
    }, [supabase])

  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Dashboard</h1>
            </div>
        </div>

        {/* Content */}
        <div className="flex-grow space-y-4 p-8 pt-6">
            <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="transaction">Transactions</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                    <Overview goals={goals} balance={balance} setActiveTab={setActiveTab} recentTransactions={transactions} savingsGoalData={savingsGoalData}/>
                </TabsContent>

                <TabsContent value="transaction" className="space-y-4">
                    <Transaction/>
                </TabsContent>
                
                <TabsContent value="analytics" className="space-y-4">
                    <Analytics/>
                </TabsContent>

            </Tabs>
      </div>
    </div>
  )
}