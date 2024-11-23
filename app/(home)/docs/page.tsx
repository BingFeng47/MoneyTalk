import { Card } from '@/components/ui/card'
import { Youtube } from '@/components/Youtube'
import { BookX } from 'lucide-react'
import React from 'react'

export default function DocsPage() {
  return (
    <div className="flex flex-col min-h-screen">
        <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center flex mb-2 justify-center items-end ">
          <BookX className='w-12 h-12 text-primary dark:text-white -mr-1' />
        </h1>
        <h1 className="text-4xl font-bold text-center dark:text-white text-primary mb-8">How It Works</h1>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-center text-muted-foreground">
            Explore everything behind this project — repositories, videos, presentations, and pitches — all in one place.
          </p>
        </div>
        </div>
        
        <h1 className='text-center text-lg text-muted-foreground'>The documentation and repository will be releasing soon!</h1>
        
        <section id='youtube' className='w-full px-5 md:px-28 pb-10'>
          {/* <Youtube/> */}
        </section>
        
    </div>

  )
}
