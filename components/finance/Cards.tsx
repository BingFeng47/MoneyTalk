"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"

// Define the CreditCard type
type CreditCard = {
  id: string;
  userId: string;
  cardNumber: string;
  cardholderName: string;
  creditLimit: number;
  currentBalance: number;
  dueDate: string;
  interestRate: number;
  minPayment: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  bank: string;
}

// Mock function to simulate fetching data from an API
const fetchCreditCardData = async (userId: string): Promise<CreditCard> => {
  // This would normally be an API call
  return {
    id: 'f940def4-26e1-4fe8-b736-493f79700f73',
    userId: '2024001',
    cardNumber: '1234567812345678',
    cardholderName: 'Moo Deng',
    creditLimit: 10000.00,
    currentBalance: 2378.00,
    dueDate: '2024-12-15',
    interestRate: 18.50,
    minPayment: 100.00,
    status: 'active',
    createdAt: '2024-11-22 12:14:31.51479',
    updatedAt: '2024-11-22 12:14:31.51479',
    bank: 'cimb bank'
  }
}

const formatCardNumber = (number: string) => {
  return number.replace(/(\d{4})/g, '$1 ').trim()
}

export default function CreditCardDisplay() {
  const [cardData, setCardData] = useState<CreditCard | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadCardData = async () => {
      setIsLoading(true)
      try {
        const data = await fetchCreditCardData('2024001') // Hardcoded user ID for this example
        setCardData(data)
      } catch (error) {
        console.error('Failed to fetch credit card data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadCardData()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!cardData) {
    return <div className="text-center">No credit card data available.</div>
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Credit Cards</h1>
      <Card className="w-96 h-56 bg-gradient-to-br from-red-600 via-red-500 to-orange-400 text-white rounded-xl overflow-hidden shadow-lg">
        <CardContent className="p-6 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
        <div className="text-lg font-semibold uppercase">{cardData.bank}</div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-400 via-yellow-200 to-orange-200"></div>
          </div>
          <div className="space-y-4">
        <div className="text-2xl tracking-wider" aria-label="Card number">
          {formatCardNumber(cardData.cardNumber)}
        </div>
        <div className="flex justify-between">
          <div>
            <div className="text-xs uppercase opacity-75">Card Holder</div>
            <div className="font-semibold">{cardData.cardholderName}</div>
          </div>
          <div>
            <div className="text-xs uppercase opacity-75">Expires</div>
            <div className="font-semibold">12/28</div>
          </div>
        </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Current Balance</h2>
              <p className="text-2xl font-bold">RM {cardData.currentBalance.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-2">Credit Limit</h2>
              <p className="text-2xl font-bold">RM {cardData.creditLimit.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardContent className="p-4 space-y-2">
            <div className="flex justify-between">
              <span>Due Date</span>
              <span className="font-semibold">{new Date(cardData.dueDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Minimum Payment</span>
              <span className="font-semibold">RM {cardData.minPayment.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Interest Rate</span>
              <span className="font-semibold">{cardData.interestRate}%</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

