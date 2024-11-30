import RetirementContent from '@/components/retirement/retirement-content'
import { Suspense } from 'react'

export default function RetirementPage() {
  return (
    <div className="w-full pb-10">
      <div className="flex-grow border-b py-6 sm:py-4 px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold pl-6 tracking-tight">Retirement Plan</h1>
        </div>
      </div>
      <Suspense fallback={<RetirementSkeleton />}>
        <RetirementContent />
      </Suspense>
    </div>
  )
}

function RetirementSkeleton() {
  return (
    <div className="space-y-6 p-6">
      <div className="h-[200px] w-full bg-gray-200 rounded-md" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-[200px] w-full bg-gray-200 rounded-md" />
        <div className="h-[200px] w-full bg-gray-200 rounded-md" />
      </div>
      <div className="h-[300px] w-full bg-gray-200 rounded-md" />
    </div>
  )
}

