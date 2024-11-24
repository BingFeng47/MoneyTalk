'use client';
import { AppSidebar } from '@/components/AppSideBar';
import Chatbot from '@/components/bot/Chatbot';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Bot, PiggyBank } from 'lucide-react';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

// Supabase Client Context
import { SupabaseClient } from '@supabase/supabase-js';
import ConfirmationModal from '@/components/Confirmation';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

const SupabaseContext = createContext<SupabaseClient | null>(null);
const AccountContext = createContext<{ account: string; setAccount: React.Dispatch<React.SetStateAction<string>> } | null>(null);

// Supabase Provider Component
const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useMemo(() => createClientComponentClient(), []);

  return (
    <SupabaseContext.Provider value={supabase}>
      <ConfirmationModal/>
      {children}
    </SupabaseContext.Provider>
  );
};

// Hook for Supabase Client
export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used within a SupabaseProvider');
  }
  return context;
};

// Hook for Account Context
export const useAccount = () => {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
};

// Main Demo Layout Component
// Main Demo Layout Component
export default function DemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [botVisible, setBotVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [account, setAccount] = useState('all');
  const [isAccountConnect, setIsAccountConnect] = useState(false);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleConnect =()=>{
    setIsAccountConnect(true);
  }

  return (
    <div className="h-screen w-screen">
      <SidebarProvider>
        <AccountContext.Provider value={{ account, setAccount }}>
          <AppSidebar onAccountChange={(newAccount) => setAccount(newAccount)} onAccountConnect={handleConnect} />
          <main className="w-screen">
            {!botVisible && (
              <div
                className="hidden z-50 bg-primary rounded-xl fixed bottom-6 right-16 p-3 sm:flex justify-center items-center shadow-xl hover:cursor-pointer"
                onClick={() => setBotVisible(!botVisible)}
              >
                <Bot size={28} className="text-white" />
              </div>
            )}
            <SidebarTrigger className="fixed pt-8" />

            {/* Bot */}
            {botVisible ? (
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                  <SupabaseProvider>
                    <AccountContext.Provider value={{ account, setAccount }}>
                      {children}
                    </AccountContext.Provider>
                  </SupabaseProvider>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel>
                  <div className="sticky bottom-0 right-0 w-full sm:w-auto sm:bottom-6">
                    <Chatbot handleOnClose={handleShowAlert} />
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            ) : (
              <div>
                <SupabaseProvider>
                  <AccountContext.Provider value={{ account, setAccount }}>
                    {children}
                  </AccountContext.Provider>
                </SupabaseProvider>
              </div>
            )}

            {/* Show Connect Account Overlay */}
            {isAccountConnect && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">Connect Your Bank Account</h2>
                  <p className='text-sm text-muted-foreground'>MoneyTalk uses OpenFin to securely link your accounts</p>
                  <RadioGroup defaultValue="comfortable" className='flex flex-col gap-2 pt-4'>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="MayBank" id="r1" />
                      <Label >MayBank</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="CIMB" id="r2" />
                      <Label >CIMB</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="RHB" id="r3" />
                      <Label >RHB</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Public Bank" id="r4" />
                      <Label >Public Bank</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ambank" id="r5" />
                      <Label >Ambank</Label>
                    </div>
                  </RadioGroup>
                  <div className="mt-4 flex justify-end">
                    <Button onClick={() => setIsAccountConnect(false)} variant={'default'}>
                      Connect
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Alert Dialog */}
            {showAlert && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-secondary p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold">End Chat Session</h2>
                  <p className="mt-2">Are you sure you want to close the chat? The session will end.</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button onClick={() => setShowAlert(false)} variant={'outline'}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setShowAlert(false);
                        setBotVisible(false);
                      }}
                      variant={'destructive'}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </main>
        </AccountContext.Provider>
      </SidebarProvider>
    </div>
  );
}