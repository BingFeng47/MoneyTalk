import { Button } from '@/components/ui/button'
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Edit2, Trash } from 'lucide-react'


export default function Goal() {
  const goals = [
    { id: 1, title: 'Save for a house', description: 'Save $50,000 for a down payment by 2025' },
    { id: 2, title: 'Pay off student loans', description: 'Pay off $20,000 in student loans by 2023' },
    { id: 3, title: 'Pay off student loans', description: 'Pay off $20,000 in student loans by 2023' },
    { id: 4, title: 'Pay off student loans', description: 'Pay off $20,000 in student loans by 2023' },
    // Add more goals as needed
  ]
  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Financial Goals</h1>
            <Button className='font-bold hidden sm:block'>+ New Goal</Button>
            <Button className='font-bold block sm:hidden'>+</Button>
            </div>
        </div>


        {/* All Goals */}
        <div className="p-4 space-y-4">
            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            {goals.map(goal => (
              <Card key={goal.id} className="relative group">
            <CardHeader>
            <img src={`/about/raze.png`} alt={goal.title} className="w-full h-32 object-contain" />
            <CardTitle>{goal.title}</CardTitle>
            </CardHeader>
            <CardContent>
            <p>{goal.description}</p>
            <p>Target: $50,000</p>
            <p>Current Progress: $10,000</p>
            <div className="relative w-full h-2.5">
              <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              <div className="absolute inset-0 bg-primary rounded-full" style={{ width: '20%' }}></div>
            </div>
            </CardContent>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button className="mr-2"><Edit2/></Button>
              <Button variant={'destructive'}><Trash/></Button>
              </div>
              </Card>
            ))}
            </div>
        </div>
    </div>


  )
}
