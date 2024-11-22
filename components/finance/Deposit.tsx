"use client"
import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Percent } from 'lucide-react'
import { useAccount } from '@/app/demo/layout'

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


const calculateProgress = (startDate: string, maturityDate: string) => {
  const start = new Date(startDate).getTime()
  const end = new Date(maturityDate).getTime()
  const now = new Date().getTime()
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
}


const DepositCard = ({ deposit }: { deposit: FixedDeposit }) => {
  const progress = calculateProgress(deposit.start_date, deposit.maturity_date)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>RM {(deposit.deposit_amount)}</span>
          <Badge className='capitalize' variant={deposit.status === 'active' ? 'default' : deposit.status === 'matured' ? 'secondary' : 'destructive'}>
            {deposit.status}
          </Badge>
        </CardTitle>
        <CardDescription>{deposit.bank.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <Percent className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{deposit.interest_rate}% p.a.</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{deposit.term_months} months</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-1">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <div className="w-full flex justify-between">
          <span>Start: {new Date(deposit.start_date).toLocaleDateString()}</span>
          <span>Maturity: {new Date(deposit.maturity_date).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function FixedDepositsDisplay({fixed_deposits}: {fixed_deposits: FixedDeposit[]}) {
  
  const {account} = useAccount();
  const filteredDeposits = account === 'all' ? fixed_deposits : fixed_deposits.filter(deposit => deposit.bank.toLowerCase() === account.toLowerCase());

  const activeDeposits = filteredDeposits.filter(d => d.status === 'active')
  const inactiveDeposits = filteredDeposits.filter(d => d.status !== 'active')
  const totalDeposited = filteredDeposits.reduce((sum, deposit) => sum + deposit.deposit_amount, 0)



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Fixed Deposits</h1>
      <Card className="mb-6">
        <CardContent className="flex items-center justify-between py-4">
          <CardTitle>Total Deposited Amount</CardTitle>
          <div className="text-2xl font-bold">RM {totalDeposited.toFixed(2)}</div>
        </CardContent>
      </Card>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Deposits</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Deposits</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeDeposits.map(deposit => (
              <DepositCard key={deposit.id} deposit={deposit} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="inactive">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {inactiveDeposits.map(deposit => (
              <DepositCard key={deposit.id} deposit={deposit} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

