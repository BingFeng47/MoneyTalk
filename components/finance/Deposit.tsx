"use client"

interface FixedDeposit {
  id: string;
  userId: string;
  depositAmount: number;
  interestRate: number;
  termMonths: number;
  startDate: string;
  maturityDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  bank: string;
}

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, DollarSign, Percent } from 'lucide-react'

// Mock function to simulate fetching data from an API
const fetchFixedDeposits = async (userId: string): Promise<FixedDeposit[]> => {
  // This would normally be an API call
  return [
    { id: '27207c13-6e19-4217-84e5-e52e0088ce62', userId: '2024001', depositAmount: 10000.00, interestRate: 4.50, termMonths: 12, startDate: '2024-01-01', maturityDate: '2025-01-01', status: 'active', createdAt: '2024-11-22 12:13:15.413181', updatedAt: '2024-11-22 12:13:15.413181', bank: 'cimb' },
    { id: '4c778c14-a4d0-4f23-b145-6895a85e6b84', userId: '2024001', depositAmount: 2000.00, interestRate: 3.75, termMonths: 6, startDate: '2024-08-01', maturityDate: '2025-02-01', status: 'withdrawn', createdAt: '2024-11-22 12:13:15.413181', updatedAt: '2024-11-22 12:13:15.413181', bank: 'cimb' },
    { id: '6ff4ee58-a14b-4219-a6b3-96f7471c1ea3', userId: '2024001', depositAmount: 15000.00, interestRate: 4.00, termMonths: 18, startDate: '2024-06-01', maturityDate: '2025-12-01', status: 'matured', createdAt: '2024-11-22 12:13:15.413181', updatedAt: '2024-11-22 12:13:15.413181', bank: 'cimb' },
    { id: 'd629ce15-68e2-4434-81d7-82de77647927', userId: '2024001', depositAmount: 50000.00, interestRate: 5.25, termMonths: 24, startDate: '2024-03-15', maturityDate: '2026-03-15', status: 'active', createdAt: '2024-11-22 12:13:15.413181', updatedAt: '2024-11-22 12:13:15.413181', bank: 'cimb' },
    { id: 'db63a94f-e552-4c18-bcf4-8c264355cd86', userId: '2024001', depositAmount: 3000.00, interestRate: 5.00, termMonths: 12, startDate: '2024-10-01', maturityDate: '2025-10-01', status: 'active', createdAt: '2024-11-22 12:13:15.413181', updatedAt: '2024-11-22 12:13:15.413181', bank: 'cimb' },
  ]
}

const calculateProgress = (startDate: string, maturityDate: string) => {
  const start = new Date(startDate).getTime()
  const end = new Date(maturityDate).getTime()
  const now = new Date().getTime()
  return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
}


const DepositCard = ({ deposit }: { deposit: FixedDeposit }) => {
  const progress = calculateProgress(deposit.startDate, deposit.maturityDate)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>RM{(deposit.depositAmount)}</span>
          <Badge variant={deposit.status === 'active' ? 'default' : deposit.status === 'matured' ? 'secondary' : 'destructive'}>
            {deposit.status}
          </Badge>
        </CardTitle>
        <CardDescription>{deposit.bank.toUpperCase()} Bank</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <div className="flex items-center">
            <Percent className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{deposit.interestRate}% p.a.</span>
          </div>
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-4 w-4 opacity-70" />
            <span className="text-sm">{deposit.termMonths} months</span>
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
          <span>Start: {new Date(deposit.startDate).toLocaleDateString()}</span>
          <span>Maturity: {new Date(deposit.maturityDate).toLocaleDateString()}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default function FixedDepositsDisplay() {
  const [deposits, setDeposits] = useState<FixedDeposit[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadDeposits = async () => {
      setIsLoading(true)
      try {
        const data = await fetchFixedDeposits('2024001') // Hardcoded user ID for this example
        setDeposits(data)
      } catch (error) {
        console.error('Failed to fetch fixed deposits data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadDeposits()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  const activeDeposits = deposits.filter(d => d.status === 'active')
  const inactiveDeposits = deposits.filter(d => d.status !== 'active')

  const totalDeposited = deposits.reduce((sum, deposit) => sum + deposit.depositAmount, 0)

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

