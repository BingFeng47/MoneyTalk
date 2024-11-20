'use client'
import { Bird, Bot, CircleX, Loader2, Mic } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input';
import { Button } from '../ui/button';

function Chatbot({ handleOnClose }: { handleOnClose: () => void }) {
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [responses, setResponse] = useState<{ user: string; chat: string }[]>([  { user: 'bot', chat: "Let's Talk! How can I help you today?" }]);

  // Initialize sessionId state
  const [sessionId] = useState(() => crypto.randomUUID());

  // Function to fetch bot response
  const fetchBotResponse = async (chats: { user: string; chat: string }) => {
    if (!chats) return; // Early return if no prompt

    try {
      setLoading(true); // Set loading state

      // Extract only the latest chat message
      const latestChat = chats; 
      const requestBody = {
        user: latestChat.user,  // Map avatar to 'user'
        chat: latestChat.chat     // Map chat to the actual message
      };

      // `https://ocealab.co/bot?sessionId=${sessionId}`
      const apiResponse = await fetch(`https://api1.ocealab.co/bot?sessionId=${sessionId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody), // Send the correct structure
      });

      if (!apiResponse.ok) {
        setError('Error fetching response from API.'); // User feedback
        setLoading(false); // Reset loading state
        return; // Exit if there's an error
      }

      // Handle the response as a stream
      const reader = apiResponse.body?.getReader(); // Optional chaining
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Failed to get reader from response body.');
      }

      // Read the response stream
      const processStream = async () => {
        let done = false;

        while (!done) {
          const { value, done: isDone } = await reader.read();
          done = isDone;

          // Decode the stream data
          if (value) {
            const text = decoder.decode(value, { stream: true });

            // Update the response character by character
            for (let char of text) {
              setResponse((prev) => {
                // If previous response is from the bot, update it
                if (prev.length > 0 && prev[prev.length - 1].user === 'bot') {
                  const lastResponse = prev[prev.length - 1];
                  const updatedResponse = { ...lastResponse, chat: lastResponse.chat + char };
                  return [...prev.slice(0, -1), updatedResponse];
                } else {
                  // Otherwise, add a new bot response
                  return [...prev, { user: 'bot', chat: char }];
                }
              });
              await new Promise(resolve => setTimeout(resolve, 2)); // Control typing speed (10 ms delay)
            }
          }
        }
        setLoading(false); // Reset loading state

      };

      processStream().catch((error) => {
        // console.error('Stream processing error:', error);
        setError('Error processing stream.'); // User feedback
      });
    } catch (error) {
      // console.error('Fetch error:', error);
      setError('Network error occurred.');
      setLoading(false); // Reset loading state
      // User feedback
    }
  };

  // Function to handle user prompt submission
  const onSubmit = () => {
    if (!inputValue.trim()) return; // Prevent empty submissions
    setLoading(true); // Set loading state
    // Append new chat to the list with the user user
    const userChat = { user: 'user', chat: inputValue };
    const updatedResponses = [...responses, userChat];
    setResponse(updatedResponses);
    fetchBotResponse(userChat); // Send the updated responses to the bot
    setInputValue(''); // Clear input after submitting
  };

  const quickPromptSubmit = (prompt:string) => {
    if (loading) return; // Prevent multiple submissions

    // Append new chat to the list with the user user
    const userChat = { user: 'user', chat: prompt };
    const updatedResponses = [...responses, userChat];
    setResponse(updatedResponses);
    fetchBotResponse(userChat); // Send the updated responses to the bot
  }

  return (
    <div className="h-[calc(100%-60px)] flex flex-col px-5 pt-6">
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

      {/* Chat messages */}
        {responses.map((response, index) => (
          <div key={index} className="mb-2 self-end bg-primary text-white px-4 py-2 rounded-lg flex gap-2 items-center">
        <div className={`py-2 rounded-lg flex gap-4 items-center`}>
            <div className="flex-shrink-0 self-start">
            {response.user === 'user' ? <Bird className="text-white" size={20} /> : <Bot className="text-white" size={20} />}
            </div>
            <div className="flex-grow">
            {response.chat}
            </div>
        </div>
          </div>
        ))}
      {loading && (
        <div className="mb-2 self-end text-primary px-4 py-2 rounded-lg flex gap-2 justify-center items-center">
          <div className={`py-2 rounded-lg flex gap-4 items-center`}>
            <div className="flex-grow">
              <span className="animate-pulse">Hold on… My robot brain needs a moment!</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Add dynamic chat content here */}
    </div>

    {/* Input and Button Section */}
    <div className="flex flex-col p-2 border-t border-muted">

      {/* Quick Prompt */}
      <div className='p-2 flex flex-col '>
        <p className='text-xs font-bold '>Quick Prompt</p>
        <div className='flex gap-4 my-2 overflow-x-auto no-scrollbar sm:scrollbar'>
          <Button className='text-xs bg-inherit ' variant={'outline'} onClick={() => quickPromptSubmit('Help me create a financial goal')}>Help me create a financial goal</Button>
          <Button className='text-xs bg-inherit' variant={'outline'} onClick={() => quickPromptSubmit('Can I own a Tesla Model 3 2024?')}>Can I own a Tesla Model 3 2024?</Button>
          <Button className='text-xs bg-inherit ' variant={'outline'} onClick={() => quickPromptSubmit('Am I financially ready for a partner?')}>Am I financially ready for a partner?</Button> 
          <Button className='text-xs bg-inherit ' variant={'outline'} onClick={() => quickPromptSubmit('Is there any anomaly in my transaction?')}>Is there any anomaly in my transaction?</Button> 
        </div>
      </div>
        
        {/* Input */}
      <div className='flex gap-2 px-2 pb-2'>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && !loading) {
              onSubmit();
            }
          }}
          className="w-full"
        />
        {loading ? (
          <div className='flex gap-2'>
          <Button disabled>
          <Mic />
          </Button>
          <Button disabled>
            <Loader2 className="animate-spin" />
          </Button>
          </div>
        ) : (
          <div className='flex gap-2'>
            <Button onClick={() => {}} disabled={!inputValue.trim()}>
              <Mic />
            </Button>
            <Button onClick={onSubmit} disabled={!inputValue.trim()}>
              Send
            </Button>
          </div>
          
        )}
      </div>
    </div>
  </div>
</div>
  )
}

export default Chatbot

function setError(arg0: string) {
  throw new Error('Function not implemented.');
}
