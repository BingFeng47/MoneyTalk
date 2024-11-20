'use client'
import Cards from '@/components/finance/Cards';
import Deposits from '@/components/finance/Deposit';
import Loans from '@/components/finance/Loans';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react'


export default function Finance() {
  const goals = [
    { id: 1, title: 'Australia Trip', description: 'Save $50,000 for a down payment by 2025', url:'/goals/australia.jpg', completed: true, target: 5000, current: 5000 },
    { id: 2, title: 'House Upfront', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/house.jpg', completed: false, target: 5000, current: 1000 },
    { id: 3, title: 'Tesla Model 3', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/tesla.jpg', completed: false, target: 5000, current: 3000 },
  ]

    // Mock data for the dashboard
    const accountOverview = {
      balance: 2800.00,
      total_goals: 3,
      total_goals_completed:1,
      total_monthly_contribution: 200
    }

    const [activeTab, setActiveTab] = useState("deposits");
    
  return (
    <div className='w-full pb-10'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Deposits, Loans & Cards</h1>
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
                <Deposits />
            </TabsContent>
            <TabsContent value="loans" className="space-y-4">
                <Loans />
            </TabsContent>
            <TabsContent value="cards" className="space-y-4">
                <Cards />
            </TabsContent>
          </Tabs>
        </div>
    </div>


  )
}
