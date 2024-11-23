'use client'
import Cards from '@/components/finance/Cards';
import Deposits from '@/components/finance/Deposit';
import Loans from '@/components/finance/Loans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react'
import { useAccount, useSupabase } from '../layout';

interface FixedDeposit {
  id: string;
  user_id: string;
  deposit_amount: number;
  interest_rate: number;
  term_months: number;
  start_date: string;
  maturity_date: string;
  status: string;
  created_at: string;
  updated_at: string;
  bank: string;
}
// Define the Loan type
interface Loan {
  id: string;
  user_id: string;
  amount: number;
  interest_rate: number;
  term_months: number;
  start_date: string;
  end_date: string;
  loan_type: string;
  status: string;
  icon: string;
  bank: string;
  monthly_instalment: number;
}
// Define the CreditCard type
type CreditCard = {
  id: string;
  user_id: string;
  card_number: string;
  cardholder_name: string;
  credit_limit: number;
  current_balance: number;
  due_date: string;
  interest_rate: number;
  min_payment: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  bank: string;
}

export default function Finance() {
  const {account} = useAccount();
  const supabase = useSupabase();

  const [activeTab, setActiveTab] = useState("deposits");
  const [fixedDeposits, setFixedDeposits] = useState<FixedDeposit[]>([])
  const [loans, setLoans] = useState<Loan[]>([])
  const [creditCards, setCreditCards] = useState<CreditCard[]>([])

  // Fetch fixed deposits
  const fetchFixedDeposits = async () => {
    const { data, error } = await supabase
      .from('fixed_deposits')
      .select('*')
      .eq('user_id', '2024001')
    if (error) {
      console.error('Failed to fetch fixed deposits:', error)
    } else {
      setFixedDeposits(data || [])
    }
  }

    // Fetch fixed loans
    const fetchLoans = async () => {
      const { data, error } = await supabase
        .from('loans')
        .select('*')
        .eq('user_id', '2024001')
      if (error) {
        console.error('Failed to fetch loans:', error)
      } else {
        setLoans(data || [])
      }
    }

  // Fetch fixed loans
  const fetchCreditCards = async () => {
    const { data, error } = await supabase
      .from('credit_cards')
      .select('*')
      .eq('user_id', '2024001')
    if (error) {
      console.error('Failed to fetch loans:', error)
    } else {
      setCreditCards(data || [])
      console.log('asdasd')
    }
  }
  useEffect(() => {
    fetchFixedDeposits()
    fetchLoans()
    fetchCreditCards()
  }, [])
    
  return (
    <div className='w-full pb-10'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Deposits, Loans & Cards</h1>
            <p className='uppercase text-gray-400 text-sm px-6'>{account}</p>
            </div>
        </div>
        
        <div className="flex-grow space-y-4 p-8 pt-6">
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
                <TabsTrigger value="deposits">Deposits</TabsTrigger>
                <TabsTrigger value="loans">Loans</TabsTrigger>
                <TabsTrigger value="cards">Cards</TabsTrigger>
            </TabsList>
            <TabsContent value="deposits" className="space-y-4">
                <Deposits fixed_deposits={fixedDeposits}/>
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
                <Loans loans={loans}/>
            </TabsContent>
            <TabsContent value="cards" className="space-y-4">
                <Cards credit_cards={creditCards}/>
            </TabsContent>
          </Tabs>
        </div>
    </div>


  )
}
