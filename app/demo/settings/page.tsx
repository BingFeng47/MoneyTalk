'use client'
import React from 'react'
import { useSupabase } from '../layout'
import { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

interface userData {

    id: number,
    name: string,
    age: number,
    gender: string,
    contact: string,
    address: string,
    email:string

}

export default function Settings() {

    const supabase = useSupabase()
    const [userData, setUserData] = useState<userData>()

    useEffect(() => {
        
        // Get user data
        const fetchUserData = async () => {
            const { data, error } = await supabase
                .from('user')
                .select('*')
                .eq('id', 2024001)

            if (error) {
                console.error('Error fetching user data:', error)
            } else {
                setUserData(data[0])
            }
        }

        fetchUserData()
    }, [supabase])

  return (
    <div className='w-full'>
        <div className="flex-grow border-b py-6 sm:py-4 px-4">
            <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold pl-6 tracking-tight">Settings</h1>
            </div>
        </div>

        <div className='p-4'>
            <p className='text-muted-foreground '>Profile</p>

            <div>
                {
                    userData ? 
                        <div className='flex flex-col sm:flex-row py-10 flex-shrink-0 justify-center items-center sm:items-start sm:justify-start' >
                            <div className=' flex-shrink-0 pl-10'>
                                <Image src="/about/cat.png" alt="avatar" width={150} height={150} className="rounded-full object-cover" />
                            </div>

                            <div className='flex-shrink-0 px-4 sm:px-20 mt-4 sm:mt-0 '>
                                <div className="flex flex-col gap-1">
                                    <p className="font-semibold">Name</p>
                                    <p>{userData.name}</p>
                                    <p className="font-semibold pt-2">Email</p>
                                    <p>{userData.email}</p>
                                    <p className="font-semibold pt-2">Age</p>
                                    <p>{userData.age}</p>
                                    <p className="font-semibold pt-2">Gender</p>
                                    <p>{userData.gender}</p>
                                    <p className="font-semibold pt-2">Contact</p>
                                    <p>{userData.contact}</p>
                                    <p className="font-semibold pt-2">Address</p>
                                    <p>{userData.address}</p>
                                </div>
                            </div>
                            
                        </div>
                    :
                    <div className='flex justify-center items-center pt-10'>
                        <div className="animate-spin" role="status">
                            <Loader2 className='text-primary'/>
                        </div>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
