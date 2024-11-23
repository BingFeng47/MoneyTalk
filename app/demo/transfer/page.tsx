'use client'
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Car, CreditCard, Home, QrCode } from 'lucide-react'
import { Label } from 'recharts'
import { useAccount, useSupabase } from '../layout'

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

export default function Transfer() {

  const {account} = useAccount()
  const supabase = useSupabase()
  const [user, setUser] = useState<User>()
  const [balance, setBalance] = useState(0)
  const [transferAmount, setTransferAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [maxId, setMaxId] = useState(null);

  // Filter information based on account
  useEffect(() => {
    const filteredBalance = account === 'all' 
        ? ((user?.cimb_balance ?? 0) + (user?.maybank_balance ?? 0)) 
        : account === 'cimb' 
        ? (user?.cimb_balance ?? 0) 
        : (user?.maybank_balance ?? 0);

    setBalance(filteredBalance);
}, [account, user]);

    useEffect(() => {
      const fetchMaxId = async () => {
        const { data, error } = await supabase
          .from('transactions')
          .select('id')
          .order('id', { ascending: false })
          .limit(1);

        if (data && data.length > 0) {
          setMaxId(data[0].id);
        } else {
          setMaxId(null);
        }
      };

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

      fetchUser()
      fetchMaxId();

    }, [transferAmount, receiveAmount]);

    const handleTransfer = async () => {
      if (transferAmount && description && category) {
        const { data, error } = await supabase
          .from('transactions')
          .insert([
            {
              id: maxId! + 1,
              user_id: 2024001, // Replace with actual user ID
              date: new Date().toISOString(),
              amount: Number(transferAmount),
              transaction_type: 'debit',
              bank: account,
              description: description,
              category: category,
              payment_method: 'Bank Transfer', // Replace with actual payment method
            },
          ]);

        if (error) {
          console.error('Error inserting transaction:', error);
        } else {
          updateBalance(balance - Number(transferAmount));
          setTransferAmount('');
          setDescription('');
          setCategory('');
        }
      } else {
        console.error('Please fill in all fields');
      }
  }


    const handleReceive = async () => {

      if (receiveAmount && description) {
        const { data, error } = await supabase
          .from('transactions')
          .insert([
            {
              id: maxId! + 1,
              user_id: 2024001, // Replace with actual user ID
              date: new Date().toISOString(),
              amount: Number(receiveAmount),
              transaction_type: 'credit',
              bank: account,
              description: description,
              category: 'Income',
              payment_method: 'Bank Transfer', // Replace with actual payment method
            },
          ]);

        if (error) {
          console.error('Error inserting transaction:', error);
        } else {
          updateBalance(balance + Number(receiveAmount));
          setReceiveAmount('');
          setDescription('');
        }
      } else {
        console.error('Please fill in all fields');
      }
  }

  const updateBalance = async (newBalance: number) => {
    const balanceField = account === 'cimb' ? 'cimb_balance' : 'maybank_balance';

    const { data, error } = await supabase
      .from('user')
      .update({ [balanceField]: newBalance })
      .eq('id', 2024001);

    if (error) {
      console.error('Error updating balance:', error);
    } else {
      setBalance(newBalance);
    }
  };


  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Transfer & Receive</h1>
            </div>
        </div>

        <div className="p-4 h-full flex-shrink-0">
          <Card >
            <CardHeader>
              <CardTitle className=''>Transfer or Receive Funds</CardTitle>
              <CardDescription>Manage your money easily</CardDescription>
            </CardHeader>
            <CardContent>
              {account === 'cimb' || account === 'maybank' ? (
              <div>
                <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold"><span className='uppercase'>{account}</span> Balance</h2>
                <p className="text-4xl font-bold text-primary">RM {balance.toLocaleString()}</p>
                </div>

                <Tabs defaultValue="transfer" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="transfer">Transfer</TabsTrigger>
                  <TabsTrigger value="receive">Receive</TabsTrigger>
                </TabsList>
                <TabsContent value="transfer">
                  <Card>
                  <CardHeader>
                    <CardTitle>Transfer Funds</CardTitle>
                    <CardDescription>Perform Debit Action for Demo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-4">
                    <Label>Description</Label>
                    <Input 
                      id="description" 
                      placeholder="Description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />

                    
                    
                    <Label>Amount</Label>
                    <Input 
                      id="transfer-amount" 
                      type="number" 
                      placeholder="Enter amount" 
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      min="1"
                      required
                    />

                    <Label>Category</Label>
                      <select 
                      id="category" 
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-2 rounded-md border-muted-foreground border text-sm text-muted-foreground"
                      required
                      >
                      <option value="" className=''>Select Category</option>
                      <option value="Goals">Goals</option>
                      <option value="Income">Income</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Investment">Investment</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Sports">Sports</option>
                      <option value="Food & Beverages">Food & Beverages</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Others">Others</option>
                      </select>

                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleTransfer()}>
                    <ArrowUpRight className="mr-2 h-4 w-4" /> Transfer
                    </Button>
                  </CardFooter>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">Quick Access</h3>
                    <div className="grid grid-cols-3 gap-2 flex-shrink-0">
                    <Button variant="outline" className="flex flex-col items-center p-10">
                      <Home className="h-8 w-8 mb-1" />
                      <span className="text-sm">Houses</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-10">
                      <CreditCard className="h-8 w8 mb-1" />
                      <span className="text-sm ">Bills</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col items-center p-10">
                      <Car className="h-8 w-8 mb-1" />
                      <span className="text-sm">Cars</span>
                    </Button>
                  </div>
                </div>
                  </Card>
                </TabsContent>
                <TabsContent value="receive">
                  <Card>
                  <CardHeader>
                    <CardTitle>Receive Funds</CardTitle>
                    <CardDescription>Perform Credit Action for Demo</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-4">
                    <Label>Description</Label>
                    <Input 
                      id="description" 
                      placeholder="Description" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                    
                    <Label>Amount</Label>
                    <Input 
                      id="transfer-amount" 
                      type="number" 
                      placeholder="Enter amount" 
                      value={receiveAmount}
                      onChange={(e) => setReceiveAmount(e.target.value)}
                      min="1"
                      required
                    />

                    </div>

                    <div className="my-6 pt-10 flex justify-center">
                    <QrCode size={150} />
                    </div>
                    <p className="text-center text-sm text-muted-foreground">Scan this QR code to receive funds</p>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={() => handleReceive()}>
                    <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
                    </Button>
                  </CardFooter>
                  </Card>
                </TabsContent>
                </Tabs>
              </div>
              ) : (
              <div className="text-center text-lg font-semibold text-muted-foreground">
                Please Select A Bank Account
              </div>
              )}
            </CardContent>
          </Card>
        </div>


    </div>

  )
}
