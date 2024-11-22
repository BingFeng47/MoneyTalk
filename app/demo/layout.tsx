'use client';
import { AppSidebar } from '@/components/AppSideBar';
import Chatbot from '@/components/bot/Chatbot';
import { Button } from '@/components/ui/button';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Bot } from 'lucide-react';
import { createContext, useContext, useMemo, useState, ReactNode } from 'react';

// Supabase Client Context
import { SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);
const AccountContext = createContext<{ account: string; setAccount: React.Dispatch<React.SetStateAction<string>> } | null>(null);

// Supabase Provider Component
const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const supabase = useMemo(() => createClientComponentClient(), []);

  return (
    <SupabaseContext.Provider value={supabase}>
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

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  return (
    <div className="h-screen w-screen">
      <SidebarProvider>
        <AccountContext.Provider value={{ account, setAccount }}>
          <AppSidebar onAccountChange={(newAccount) => setAccount(newAccount)} />
          <main className="w-screen">
            {!botVisible && (
              <div
                className="hidden z-50 bg-primary rounded-xl fixed bottom-6 right-16 p-3 sm:flex justify-center items-center shadow-xl hover:cursor-pointer"
                onClick={() => setBotVisible(!botVisible)}
              >
                <Bot size={28} className="text-white" />
              </div>
            )}
            <SidebarTrigger className="fixed " />

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
                  <Chatbot handleOnClose={handleShowAlert} />
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

            {/* Alert Dialog */}
            {showAlert && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                <div className="bg-white p-6 rounded-lg shadow-lg">
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