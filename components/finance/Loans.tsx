import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { ArrowUpRight, Check, Plus } from 'lucide-react'

export default function Loans() {
    const goals = [
        { id: 1, title: 'Australia Trip', description: 'Save $50,000 for a down payment by 2025', url:'/goals/australia.jpg', completed: true, target: 5000, current: 5000 },
        { id: 2, title: 'House Upfront', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/house.jpg', completed: false, target: 5000, current: 1000 },
        { id: 3, title: 'Tesla Model 3', description: 'Pay off $20,000 in student loans by 2023', url:'/goals/tesla.jpg', completed: false, target: 5000, current: 3000 },
      ]
  return (
    <div className="px-4 space-y-4 ">
        <p className='text-muted-foreground'>All Loans</p>

            <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
            {goals.map(goal => (
              <Card key={goal.id} className="relative group">
                <CardHeader className='px-4 pb-2'>
                  <img src={goal.url} alt={goal.title} className="w-full pb-2 h-40 object-cover rounded-lg" />
                  <CardTitle>{goal.title}</CardTitle>
                  <p className='text-muted-foreground text-xs'>RM {goal.current} / RM {goal.target}</p>
                </CardHeader>

                <CardContent className='pt-0 px-4'>
                <div className="relative w-full h-2.5">
                  <div className="absolute inset-0 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  <div className="absolute inset-0 bg-primary rounded-full" style={{ width: (goal.current / goal.target) * 100 + '%' }}></div>
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
  )
}
