'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export default function Achievements() {
  
  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Achievements</h1>
            </div>
        </div>

        <div className='flex flex-col gap-4 p-4'>
            
                {/* Total Savings */}
                <Card className="z-0  "> {/* Normal z-index for the cards */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-0">
                        <CardTitle className="text-sm font-medium flex items-center justify-between w-full">
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p className="text-2xl font-bold pb-2">Savings Mastery</p>
                            <p className="text-muted-foreground abos">Achieve a total savings milestone of RM10,000. A testament to your financial discipline and planning!</p>
                            <p className="text-muted-foreground text-xs pt-1"> You beat 30% of the users!</p>
                        </div>
                        <Image 
                                src="/achievements/medal02.png" 
                                alt="trophy" 
                                width={150} 
                                height={150} 
                                className=""
                        />
                    </CardContent>
                </Card>

                {/* Total Savings */}
                <Card className="z-0 "> {/* Normal z-index for the cards */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-0">
                        <CardTitle className="text-sm font-medium flex items-center justify-between w-full">
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p className="text-2xl font-bold pb-2">Goal Getter</p>
                            <p className="text-muted-foreground">Successfully complete your first financial goal. You’ve taken the first step toward a brighter financial future!</p>
                            <p className="text-muted-foreground text-xs pt-1"> You beat 47% of the users!</p>
                        </div>
                        <Image 
                                src="/achievements/medal01.png" 
                                alt="trophy" 
                                width={150} 
                                height={150} 
                                className=""
                        />
                    </CardContent>
                </Card>

                {/* Total Savings */}
                <Card className="z-0 "> {/* 90% width for the card */}
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pt-0">
                        <CardTitle className="text-sm font-medium flex items-center justify-between w-full">
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <p className="text-2xl font-bold pb-2">Chatbot Champion</p>
                            <p className="text-muted-foreground">Engage with the financial chatbot 20 times. Your curiosity and commitment to learning set you apart!</p>
                            <p className="text-muted-foreground text-xs pt-1"> You beat 70% of the users!</p>
                        
                        </div>
                        <Image 
                                src="/achievements/medal03.png" 
                                alt="trophy" 
                                width={150} 
                                height={150} 
                                className=""
                        />
                    </CardContent>
                </Card>
        </div>
    </div>

  )
}
