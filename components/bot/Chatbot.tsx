import { Bot, PanelRightClose } from 'lucide-react'
import React from 'react'

function Chatbot({ handleOnClose }: { handleOnClose: () => void }) {
  return (
    <div className='h-full flex flex-col justify-center items-center '>
        <button className='absolute top-6 right-6' onClick={handleOnClose}><PanelRightClose/></button>
        <div className='bg-primary flex flex-col justify-center items-center p-4 rounded-lg gap-2'>
          <Bot size={50} className='text-white' strokeWidth={1.5}/>
          <h1 className='text-lg text-white font-bold'>No Money No Talk!</h1>
        </div>
    </div>
  )
}

export default Chatbot