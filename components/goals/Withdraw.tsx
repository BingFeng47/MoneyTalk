'use client'
import { useSupabase } from "@/app/demo/layout"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ArrowUpRight, Plus } from "lucide-react"
import { useEffect, useState } from 'react';


export function Withdraw({ goal, balance, account }: { goal: any, balance: number, account:string }) {
  const supabase = useSupabase();
  const [amount, setAmount] = useState<number>(1);
  const [maxId, setMaxId] = useState<number | null>(null);


  useEffect(() => {
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
  }, []);

  const handleSave = async () => {
    if (amount > goal.current_amount) {
      alert("Amount exceeds available withdrawal balance.");
      return;
    }


    const { data, error } = await supabase
      .from('goals')
      .update({
        current_amount: goal.current_amount - amount,
        completed: goal.current_amount - amount >= goal.target_amount
      })
      .eq('title', goal.title);


      let updateData = {};
      if (account.toLowerCase() === 'cimb') {
        updateData = { cimb_balance: balance + amount };
      } else if (account.toLowerCase() === 'maybank') {
        updateData = { maybank_balance: balance + amount };
      }

      const { error: userError } = await supabase
      .from('user')
      .update(updateData)
      .eq('id', goal.user_id);


      const { error: transactionError } = await supabase
          .from('transactions')
          .insert([
            {
              id: maxId!,
              user_id: 2024001, // Replace with actual user ID
              date: new Date().toISOString(),
              amount: Number(amount),
              transaction_type: 'credit',
              description: `Goal Withdrawal: ${goal.title}`,
              bank: account,
              category: 'Goals',
              payment_method: 'Internal Transfer', // Replace with actual payment method
            },
          ]);
      window.location.href = "/demo/goals";
  
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <Button variant={'default'}><ArrowUpRight className="mr-2 h-4 w-4" />Withdraw</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{goal.title}</DialogTitle>
          <DialogDescription className="flex flex-col">
            <p>Current Bank: <span className="capitalize">{account}</span></p>
             <p>Available Withdrawal Balance: RM {balance.toFixed(2)}</p>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col justify-center items-center gap-4">
          <Input 
              id="amount" 
              value={amount} 
              onChange={(e) => setAmount(Number(e.target.value))} 
              className="flex justify-center items-center text-center text-lg font-sans"
              prefix="RM"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>Add</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
