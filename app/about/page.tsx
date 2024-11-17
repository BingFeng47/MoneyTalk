import Timeline from '@/components/Timeline'
import { Card, CardContent } from '@/components/ui/card'
import { Bird } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function About() {

    return (
    <div className="flex flex-col min-h-screen">

      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center flex mb-2 justify-center items-end ">
          <Bird className='w-12 h-12 text-primary dark:text-white -mr-2' />
          <Bird className='w-6 h-6 text-primary dark:text-white opacity-75 -mr-1' />
          <Bird className='w-3 h-3 text-primary dark:text-white opacity-50 ' />
        </h1>
        <h1 className="text-4xl font-bold text-center dark:text-white text-primary mb-8">About Us</h1>
        
        <div className="max-w-3xl mx-auto mb-16">
          <p className="text-lg text-center text-muted-foreground">
            We are a passionate team dedicated to creating innovative solutions that make a difference. 
            Our diverse skills and shared vision drive us to excel in everything we do.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  md:px-20">
          <Card className='border-primary bg-card'>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
          <div className="relative h-40 w-40 rounded-full overflow-hidden ">
            <Image
              src="/about/raze.png"
              alt="Calvin Koay"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h2 className="text-lg lg:text-3xl font-semibold mb-2">Calvin Koay</h2>
          <caption className='text-xs -mt-2 pb-2 text-muted-foreground'>rjhong_92@hotmail.com</caption>
          <p className="text-muted-foreground mb-4 text-xs">Product Manager</p>
          <p className="text-center text-sm ">
            Calvin brings over 10 years of industry experience and a passion for innovation. 
            His leadership drives our team to push boundaries and achieve excellence.
          </p>
              </div>
            </CardContent>
          </Card>
        
         
          <Card className='border-primary bg-card'>
            <CardContent className="p-10">
          <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden ">
              <Image
            src="/about/viper.png"
            alt="Bing Feng"
            layout="fill"
            objectFit="cover"
              />
              </div>
              <h2 className="text-lg lg:text-3xl font-semibold mb-2">Bing Feng</h2>
              <caption className='text-xs -mt-1 pb-2 text-muted-foreground'>limbingfeng000407@gmail.com</caption>
              <p className="text-muted-foreground mb-4 text-xs">Developer</p>
              <p className="text-center text-sm">
              Bing is a tech visionary with a knack for solving complex problems. 
              His expertise in cutting-edge technologies keeps us at the forefront of innovation.
              </p>
          </div>
            </CardContent>
          </Card>

          <Card className='border-primary bg-card'>
            <CardContent className="p-10">
          <div className="flex flex-col items-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden">
              <Image
                src="/about/kj.png"
                alt="Chee Yee"
                layout="fill"
                objectFit="cover"
              />
              </div>
              <h2 className="text-lg lg:text-3xl font-semibold mb-2">Chee Yee</h2>
              <caption className='text-xs -mt-1 pb-2 text-muted-foreground'>cheeyee721@gmail.com</caption>
              <p className="text-muted-foreground mb-4 text-xs">Designer</p>
              <p className="text-center text-sm">
              Chee Yee is a creative genius with a passion for design. 
              Her expertise ensures that every product is both visually appealing and easy to navigate.
              </p>
          </div>
            </CardContent>
          </Card>
        </div>
        <Timeline/>
      </div>
    </div>
    )
  }