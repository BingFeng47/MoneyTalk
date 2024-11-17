// app/demo/layout.js
import { AppSidebar } from '@/components/AppSideBar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function DemoLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className='h-screen'>
            <SidebarProvider>
            <AppSidebar />
            <main>
                <SidebarTrigger />
                {children}
            </main>
            </SidebarProvider>
        </div>
    );
  }