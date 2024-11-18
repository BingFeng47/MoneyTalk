import { Button } from '@/components/ui/button'
import React from 'react'

export default function Goal() {
  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-3 tracking-tight">Financial Goals</h1>
            <Button className='font-bold'>+ New Goal</Button>
            </div>
        </div>
    </div>

  )
}
