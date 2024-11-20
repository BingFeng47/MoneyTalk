'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ArrowDownLeft, ArrowUpRight, Car, CreditCard, Home, QrCode } from 'lucide-react'
import { Label } from 'recharts'


export default function Transfer() {
  const [balance, setBalance] = useState(8055)
  const [transferAmount, setTransferAmount] = useState('')
  const [receiveAmount, setReceiveAmount] = useState('')

  const handleTransfer = (amount: number) => {
    if (amount > 0 && amount <= balance) {
      setBalance(prevBalance => prevBalance - amount)
      setTransferAmount('')
      // In a real app, you'd handle the actual transfer here
    }
  }

  const handleReceive = (amount: number) => {
    if (amount > 0) {
      setBalance(prevBalance => prevBalance + amount)
      setReceiveAmount('')
      // In a real app, you'd handle the actual receive process here
    }
  }

  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Transfer & Receive</h1>
            </div>
        </div>

        <div className="p-4 h-full">
          <Card >
            <CardHeader>
              <CardTitle>Transfer or Receive Funds</CardTitle>
              <CardDescription>Manage your money easily</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">Available Balance</h2>
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
                      <CardDescription>Send money to another account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label >Amount</Label>
                        <Input 
                          id="transfer-amount" 
                          type="number" 
                          placeholder="Enter amount" 
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleTransfer(Number(transferAmount))}>
                        <ArrowUpRight className="mr-2 h-4 w-4" /> Transfer
                      </Button>
                    </CardFooter>
                    <div className="mt-6 p-4">
                      <h3 className="text-lg font-semibold mb-2">Quick Access</h3>
                      <div className="grid grid-cols-3 gap-2">
                        <Button variant="outline" className="flex flex-col items-center p-10">
                          <Home className="h-6 w-6 mb-1" />
                          <span className="text-xs">Houses</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col items-center p-10">
                          <CreditCard className="h-6 w-6 mb-1" />
                          <span className="text-xs ">Bills</span>
                        </Button>
                        <Button variant="outline" className="flex flex-col items-center p-10">
                          <Car className="h-6 w-6 mb-1" />
                          <span className="text-xs">Cars</span>
                        </Button>
                    </div>
              </div>
                  </Card>
                </TabsContent>
                <TabsContent value="receive">
                  <Card>
                    <CardHeader>
                      <CardTitle>Receive Funds</CardTitle>
                      <CardDescription>Receive money from another account</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="space-y-1">
                        <Label>Amount</Label>
                        <Input 
                          id="receive-amount" 
                          type="number" 
                          placeholder="Enter amount" 
                          value={receiveAmount}
                          onChange={(e) => setReceiveAmount(e.target.value)}
                        />
                      </div>
                      <div className="my-6 pt-10 flex justify-center">
                        <QrCode size={150} />
                      </div>
                      <p className="text-center text-sm text-muted-foreground">Scan this QR code to receive funds</p>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => handleReceive(Number(receiveAmount))}>
                        <ArrowDownLeft className="mr-2 h-4 w-4" /> Receive
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>

              
            </CardContent>
          </Card>
        </div>


    </div>

  )
}
