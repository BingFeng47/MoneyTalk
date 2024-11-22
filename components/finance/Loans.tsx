import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowUpRight, Car, Check, GraduationCap, Home, Plus, Wallet } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Progress } from '../ui/progress'

// Define the Loan type
type Loan = {
  id: string;
  userId: string;
  amount: number;
  interestRate: number;
  termMonths: number;
  startDate: string;
  endDate: string;
  loanType: string;
  status: string;
  icon: string;
}
// Mock function to simulate fetching data from an API
const fetchUserLoans = async (userId: string): Promise<Loan[]> => {
  // This would normally be an API call
  return [
    { id: '1', userId: '2024001', amount: 25000.00, interestRate: 3.50, termMonths: 36, startDate: '2024-01-15', endDate: '2027-01-15', loanType: 'Car Loan', status: 'active', icon: 'car' },
    { id: '2', userId: '2024001', amount: 150000.00, interestRate: 4.20, termMonths: 180, startDate: '2023-05-10', endDate: '2033-05-10', loanType: 'Home Loan', status: 'active', icon: 'home' },
    { id: '3', userId: '2024001', amount: 5000.00, interestRate: 5.00, termMonths: 24, startDate: '2024-02-20', endDate: '2026-02-20', loanType: 'Personal Loan', status: 'active', icon: 'wallet' },
    { id: '4', userId: '2024001', amount: 10000.00, interestRate: 6.00, termMonths: 48, startDate: '2023-09-01', endDate: '2027-09-01', loanType: 'Education Loan', status: 'active', icon: 'graduation-cap' },
  ]
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

export default function Loans() {
  const [loans, setLoans] = useState<Loan[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadLoans = async () => {
      setIsLoading(true)
      try {
        const userLoans = await fetchUserLoans('2024001') // Hardcoded user ID for this example
        setLoans(userLoans)
      } catch (error) {
        console.error('Failed to fetch loans:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadLoans()
  }, [])

  const totalLoanAmount = loans.reduce((sum, loan) => sum + loan.amount, 0)

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

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
        {loans.map((loan) => (
          <Card key={loan.id} className="w-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {loan.loanType}
              </CardTitle>
              <LoanIcon icon={loan.icon} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">RM {loan.amount.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                {loan.interestRate}% interest rate
              </p>
              <Progress 
                value={calculateProgress(loan.startDate, loan.endDate)} 
                className="mt-2"
              />
              <p className="text-xs text-muted-foreground mt-2">
                {Math.round(calculateProgress(loan.startDate, loan.endDate))}% completed
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <CardDescription>
                Term: {loan.termMonths} months
              </CardDescription>
              <Badge variant="default" className='capitalize hover:bg-primary'>{loan.status}</Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
      
    </div>
  )
}