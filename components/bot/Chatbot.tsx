import { Bird, Bot, CircleX, Loader2, PanelRightClose } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function Chatbot({ handleOnClose }: { handleOnClose: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="h-[calc(100%-60px)] flex flex-col px-5">
  <div className="border-2 border-muted rounded-lg h-full flex flex-col">
    {/* Header */}
    <div className="bg-primary flex justify-between items-center p-4 rounded-t-lg gap-2">
      <div className="flex justify-center items-center gap-3">
        <Bird size={42} className="text-white" strokeWidth={1.5} />
        <h1 className="text-xl text-white font-bold">MoneyTalk</h1>
      </div>
      <div className="pr-2">
        <button className="hidden md:block" onClick={handleOnClose}>
          <CircleX className="text-white" />
        </button>
      </div>
    </div>

    {/* Scrollable Chat Area */}
    <div className="flex-grow overflow-y-auto p-4">
      {/* Example chat messages */}
      <div className="mb-2 self-end bg-primary text-white px-4 py-2 rounded-lg max-w-3xl flex gap-2 items-center">
        <Bot size={25} className="text-white" strokeWidth={1.5} />
        Lets Talk! How can I help you today?
      </div>
      
      {/* Add dynamic chat content here */}
    </div>

    {/* Input and Button Section */}
    <div className="flex flex-col p-2 border-t border-muted">

      {/* Quick Prompt */}
      <div className='p-2 flex flex-col'>
        <p className='text-xs font-bold '>Quick Prompt</p>
        <div className='flex gap-4 my-2 overflow-x-auto'>
          <Button className='text-xs bg-inherit ' variant={'outline'}>Help me create a financial goal</Button>
          <Button className='text-xs bg-inherit' variant={'outline'}>Can i own a Tesla Model 3 2024?</Button>
          <Button className='text-xs bg-inherit ' variant={'outline'}>Am I financially for a partner?</Button> 
        </div>
      </div>
        
        {/* Input */}
      <div className='flex gap-2 px-2 pb-2'>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              // Add send logic here
            }
          }}
          className="w-full"
        />
        {loading ? (
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
        ) : (
          <Button onClick={() => {}} disabled={!inputValue.trim()}>
            Send
          </Button>
        )}
      </div>
    </div>
  </div>
</div>
  )
}

export default Chatbot