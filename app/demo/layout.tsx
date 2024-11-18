// app/demo/layout.js
'use client'
import { AppSidebar } from '@/components/AppSideBar';
import Chatbot from '@/components/bot/Chatbot';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Bot } from 'lucide-react';
import { useState } from 'react';

export default function DemoLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    const [botVisible, setBotVisible] = useState(false)
    
    const handleOnClose = () => {
      setBotVisible(false)
    }

    return (
        <div className='h-screen w-screen'>
            <SidebarProvider>
            <AppSidebar />
            <main className='w-screen'>
                  {!botVisible && (
                  <div className='hidden  bg-primary rounded-xl fixed bottom-6 right-16 p-3 sm:flex justify-center items-center shadow-xl hover:cursor-pointer' onClick={() => setBotVisible(!botVisible)}>
                    <Bot size={28} className='text-white'/>
                  </div>
                  )}
              <SidebarTrigger/>
              { botVisible?
                <ResizablePanelGroup direction="horizontal">
                  <ResizablePanel>{children}</ResizablePanel>
                  <ResizableHandle withHandle />
                  <ResizablePanel><Chatbot handleOnClose={handleOnClose}/></ResizablePanel>
                </ResizablePanelGroup>
               :
               <div>{children}</div>
              }
            </main>
            </SidebarProvider>
        </div>
    );
  }