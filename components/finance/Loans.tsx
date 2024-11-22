import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowUpRight, Car, Check, GraduationCap, Home, Plus, Wallet } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'
import { useAccount } from '@/app/demo/layout'

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

const LoanIcon = ({ icon }: { icon: string }) => {
  switch (icon) {
    case 'car':
      return <Car className="h-8 w-8 text-primary" />;
    case 'home':
      return <Home className="h-8 w-8 text-primary" />;
    case 'graduation-cap':
      return <GraduationCap className="h-8 w-8 text-primary" />;
    case 'wallet':
    default:
      return <Wallet className="h-8 w-8 text-primary" />;
  }
}

export default function Loans({loans}: {loans: Loan[]}) {

  const {account} = useAccount();

  const filteredLoans = account === 'all' ? loans : loans.filter(loan => loan.bank.toLowerCase() === account.toLowerCase());

  const totalLoanAmount = filteredLoans.reduce((sum, loan) => sum + loan.amount, 0)


  const calculateProgress = (startDate: string, endDate: string) => {
    const start = new Date(startDate).getTime()
    const end = new Date(endDate).getTime()
    const now = new Date().getTime()
    return Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100))
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Active Loans</h1>

      <Card className="mb-6">
        <CardContent className="flex items-center justify-between py-4">
          <CardTitle>Total Loan Amount</CardTitle>
          <div className="text-2xl font-bold">RM {totalLoanAmount.toFixed(2)}</div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLoans.map((loan) => (
          <Card key={loan.id} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">
                {loan.loan_type}
              </CardTitle>
              <LoanIcon icon={loan.icon} />
            </CardHeader>
            <CardContent>
              <p className='text-muted-foreground text-xs'>{loan.bank.toUpperCase()}</p>
              <div className=' flex flex-row justify-between items-center'>
                <div className="text-2xl font-bold">RM {loan.amount.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  {loan.interest_rate}% interest rate
                </p>
              </div>
              <Progress 
                value={calculateProgress(loan.start_date, loan.end_date)} 
                className="mt-2"
              />
              <div className='flex justify-between items-center'>
                <p className="text-xs text-muted-foreground mt-2">
                  {Math.round(calculateProgress(loan.start_date, loan.end_date))}% completed
                </p>
                <p className='text-xs text-muted-foreground'>Term: {loan.term_months} months</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription>
                RM {loan.monthly_instalment} / month
              </CardDescription>
              <Badge variant="default" className={`capitalize ${loan.status === 'active' ? 'bg-primary' : loan.status === 'defaulted'  ? 'bg-red-500'  : 'bg-gray-500'}`}>
                {loan.status}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </div>
  )
}