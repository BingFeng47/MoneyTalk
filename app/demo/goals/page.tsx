'use client'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowDownIcon, ArrowUpIcon, ArrowUpRight, Check, DollarSign, Edit2, GoalIcon, Plus, Repeat, Trash, Wallet, Wallet2 } from 'lucide-react'


export default function Goal() {
  const goals = [
    { id: 1, title: 'Australia Trip', description: 'Save $50,000 for a down payment by 2025', url:'/goals/australia.jpg', completed: true },
    { id: 2, title: 'House Upfront', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/house.jpg', completed: false  },
    { id: 3, title: 'Tesla Model 3', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/tesla.jpg', completed: false },
  ]

    // Mock data for the dashboard
    const accountOverview = {
      balance: 2800.00,
      total_goals: 3,
      total_goals_completed:1,
      total_monthly_contribution: 200
    }


  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Financial Goals</h1>
            <Button className='font-bold hidden sm:block'>+ New Goal</Button>
            <Button className='font-bold block sm:hidden'>+</Button>
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
                  <div className="text-2xl font-bold">RM {accountOverview.balance.toFixed(2)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Contribution Needed </CardTitle>
                  <Repeat className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">RM {accountOverview.total_monthly_contribution.toFixed(2)}</div>
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
              <Card key={goal.id} className="relative group">
                <CardHeader className='p-4'>
                  <img src={goal.url} alt={goal.title} className="w-full pb-2 h-40 object-cover rounded-lg" />
                  <CardTitle>{goal.title}</CardTitle>
                </CardHeader>

                <CardContent className='pt-0 px-4'>
                <div className="relative w-full h-2.5">
                  <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="absolute inset-0 bg-primary rounded-full" style={{ width: '20%' }}></div>
                </div>
                </CardContent>

                <CardFooter className='px-4 flex justify-center  gap-2'>

                  {goal.completed ? 
                  <Button className='w-full ' disabled variant={'secondary'}>
                    <Check className="mr-2 h-4 w-4" /> Completed
                  </Button>
                  :
                  <Button className='w-full ' variant={'secondary'}>
                    <Plus className="mr-2 h-4 w-4" /> Add Money
                  </Button>
                  }
                  
                  <Button className='w-full '>
                    <ArrowUpRight className="mr-2 h-4 w-4" /> View Details
                  </Button>

                  
                </CardFooter>
              </Card>
            ))}
            </div>
        </div>
    </div>


  )
}
