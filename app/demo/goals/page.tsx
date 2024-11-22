'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, Check, GoalIcon, Plus, Repeat, Trash, Trash2, Wallet2 } from 'lucide-react'
import { useAccount, useSupabase } from '../layout'
import { useEffect, useState } from 'react'
import { AddGoal } from '@/components/goals/AddGoal'
import { AddPocketMoney } from '@/components/goals/AddPocketMoney'
import { Withdraw } from '@/components/goals/Withdraw'

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
} 


export default function Goal() {
    const supabase = useSupabase();
    const {account} = useAccount();

    
    const [currentAccount, setCurrentAccount] = useState<string>(account);
    const [goals, setGoals] = useState<Goal[]>([])
    const [balance, setBalance] = useState<number>(0)
    const [user, setUser] = useState<User | null>(null)
    const [maxId, setMaxId] = useState<number | null>(null);
    

    useEffect (() => {
      if (account === 'all') {
        setCurrentAccount('cimb')
      }else if (account === 'cimb') {
        setCurrentAccount('cimb')
      }else{
        setCurrentAccount('maybank')
      }
    },[account])
    

    // Filter information based on account
    useEffect(() => {
      const filteredBalance = account === 'all' 
          ? ((user?.cimb_balance ?? 0)) 
          : account === 'cimb' 
          ? (user?.cimb_balance ?? 0) 
          : (user?.maybank_balance ?? 0);


      setBalance(filteredBalance);
  }, [account, user]);

    useEffect(() => {

      // fetchGoals
      const fetchGoals = async () => {
        const { data, error } = await supabase.from('goals').select('*').eq('user_id', 2024001).order('completed', { ascending: false })
        if (error) console.error(error)
        if (data) setGoals(data)
      }

      // Fetch User
      const fetchUser = async () => {
        const { data, error } = await supabase
            .from('user')
            .select('*')
            .eq('id', 2024001)

        if (error) {
            console.error('Error fetching balance:', error)
        } else {
            setUser(data[0])
        }
    }

      fetchUser();
      fetchGoals()

      // Subscribe to real-time changes in the 'goals' table
      const subscription = supabase
      .channel('realtime-goals') // Channel name can be anything
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'goals' },
        (payload) => {
          console.log('Change detected:', payload); // Debug log
          fetchGoals(); // Re-fetch goals on any change
        }
      )
      .subscribe();

      const fetchLatestTransaction = async () => {
        const { data: latestTransactionData } = await supabase
          .from('transactions')
          .select('id')
          .order('id', { ascending: false })
          .limit(1);
  
        if (latestTransactionData && latestTransactionData.length > 0) {
          setMaxId(latestTransactionData[0].id + 1);
        } else {
          setMaxId(1);
        }
      };
  
      fetchLatestTransaction();


      // Cleanup subscription on component unmount
      return () => {
        supabase.removeChannel(subscription);
      };

    }, [supabase]);

    // Mock data for the dashboard
    const accountOverview = {
      total_goals: goals.length,
      total_goals_completed:goals.filter(goal => goal.completed).length,
    }

    const handleDeleteGoal = async (goal: Goal) => {
      const confirmed = window.confirm(`Are you sure you want to delete the goal "${goal.title}", the pocket money will be credited back to your ${currentAccount} balance?`);
      if (!confirmed) return;
      const balanceField = currentAccount === 'cimb' || 'all' ? 'cimb_balance' : 'maybank_balance';

      const { data: userData, error: userError } = await supabase
        .from('user')
        .select('*')
        .eq('id', goal.user_id)
        .single();

      const userBalance = userData ? userData[balanceField] : 0;

      if (userError) {
        console.error(userError);
        return;
      }

      const newBalance = userBalance + goal.current_amount;



      const { error: updateError } = await supabase
        .from('user')
        .update({ [balanceField]: newBalance })
        .eq('id', goal.user_id);

      if (updateError) {
        console.error(updateError);
        return;
      }

      const { data, error } = await supabase
      .from('goals')
      .delete()
      .eq('title', goal.title)
      if (error) console.error(error)
      if (data) console.log('Goal deleted successfully')

      const { error: transactionError } = await supabase
          .from('transactions')
          .insert([
            {
              id: maxId!,
              user_id: 2024001, // Replace with actual user ID
              date: new Date().toISOString(),
              amount: Number(goal.current_amount),
              transaction_type: 'credit',
              description: `Goal Withdrawal: ${goal.title}`,
              category: 'Goals',
              bank: currentAccount,
              payment_method: 'Internal Transfer', // Replace with actual payment method
            },
          ]);

    }




  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Financial Goals</h1>
            <AddGoal />
            </div>
        </div>
        
        <div className='px-4 pt-6 pb-2'>
          <h1 className='text-muted-foreground'>Overview</h1>
        </div>

        <div className=" px-4 grid gap-4 auto-rows-fr md:grid-cols-2 lg:grid-cols-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
              <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Pocket Balance
                </CardTitle>
                  <Wallet2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM {goals.reduce((total, goal) => total + goal.current_amount, 0).toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Contribution Needed </CardTitle>
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM {goals.reduce((total, goal) => total + goal.monthly_contribution, 0).toFixed(2)}</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
                  <GoalIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{accountOverview.total_goals}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                <div className="text-2xl font-bold">{accountOverview.total_goals_completed}</div>
                </CardContent>
              </Card>
          </div>

        <div className='px-4 pt-6 pb-2'>
          <h1 className='text-muted-foreground'>Goals</h1>
        </div>

        {/* All Goals */}
        <div className="px-4 space-y-4 ">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {goals.map(goal => (
              <Card key={goal.title} className="relative group">
              <CardHeader className='px-4 pb-2'>
                <img src={goal.image_url} alt={goal.title} className="w-full pb-2 h-40 object-cover rounded-lg" />
                <CardTitle>{goal.title}</CardTitle>
                <div className='flex justify-between'>
                <p className='text-muted-foreground text-xs'>RM {goal.current_amount} / RM {goal.target_amount}</p>
                <p className='text-muted-foreground text-xs'>RM{goal.monthly_contribution} / month</p>
                </div>
              </CardHeader>

              <CardContent className='pt-0 px-4'>
              <div className="relative w-full h-2.5">
                <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                <div className="absolute inset-0 bg-primary rounded-full" style={{ width: (goal.current_amount / goal.target_amount) * 100 + '%' }}></div>
              </div>
              </CardContent>

              <CardFooter className='px-4 flex justify-center gap-2'>
                {goal.completed ? 
                <Button className='w-full' disabled variant={'secondary'}>
                <Check className="mr-2 h-4 w-4" /> Completed
                </Button>
                :
                <AddPocketMoney goal={goal} balance={balance} account={currentAccount}/>
                }
                
                <Button className='w-full'>
                <Withdraw goal={goal} balance={balance} account={currentAccount}/>
                </Button>
              </CardFooter>

              <Button className="absolute top-2 right-2 hidden group-hover:block" variant="destructive" onClick={() => handleDeleteGoal(goal)}>
                <Trash2/>
              </Button>
              </Card>
            ))}
            </div>
        </div>
    </div>


  )
}
