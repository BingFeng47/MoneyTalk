'use client'
import Chatbot from '@/components/bot/Chatbot'
import React from 'react'

export default function chatbot() {
  return (
    <div className='h-screen items-center'>
        <Chatbot handleOnClose={()=>{}}/>
    </div>
  )
}
