import { Bird, Bot, Calendar, ChevronsUpDown, Goal, Home, Inbox, LogOut, Search, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import Image from "next/image"
import { ThemeButtonMobile } from "./ThemeButtonMobile"
import React from "react"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/demo/dashboard",
    icon: Home,
  },
  {
    title: "Goals",
    url: "/demo/goals",
    icon: Goal,
  },
  {
    title: "Inbox",
    url: "/demo/inbox",
    icon: Inbox,
  },
  {
    title: "MoneyTalk",
    url: "/demo/chatbot",
    icon: Bot,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>

        {/* Logo */}
        <SidebarGroup className="pt-8">
            <SidebarGroupContent>
                <a className="flex items-center justify-center" href="/">
                    <Bird className="h-8 w-8 text-[#682bd7] dark:text-white" />
                    <h1 className="text-xl px-2 text-primary font-extrabold ">Money<span className="font-bold text-xl text-secondary-foreground">Talk</span></h1>
                </a>
            </SidebarGroupContent>
        </SidebarGroup>
        
        {/* Features */}
        <SidebarGroup>
          <SidebarGroupLabel>Features</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <React.Fragment key={item.title}>
                  {item.title === "MoneyTalk" ? (
                    <div className="md:hidden">
                      <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </div>
                  ) : (
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href={item.url}>
                          <item.icon />
                          <span>{item.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )}
                </React.Fragment>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        

        {/* Profile */}
        <SidebarGroup className="absolute bottom-0">
          <SidebarGroupContent>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="flex w-full items-center gap-4">
                        <div>
                            <Image src="/about/raze.png" alt="avatar" width={50} height={50} className="rounded-full" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p>bxng</p>
                            <p>b@example.com</p>
                        </div>
                        <div >
                            <ChevronsUpDown />
                        </div>
                    </div>
                </DropdownMenuTrigger>

                
                <DropdownMenuContent className="bg-background border border-primary rounded-lg ml-2" side="top">
                    <DropdownMenuLabel className="px-10 py-2">
                    <div className="flex w-full items-center gap-4">
                        <div>
                            <Image src="/about/raze.png" alt="avatar" width={50} height={50} className="rounded-full" />
                        </div>
                        <div className="flex flex-col items-start">
                            <p>bxng</p>
                            <p>b@example.com</p>
                        </div>

                    </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="border border-primary" />
                    <DropdownMenuItem className="px-10 py-2 hover:bg-primary hover:text-primary-foreground hover:rounded-sm">Profile</DropdownMenuItem>
                    <DropdownMenuItem className="px-10 py-2 hover:bg-primary hover:text-primary-foreground hover:rounded-sm">Billing</DropdownMenuItem>
                    <DropdownMenuItem className="px-10 py-2 hover:bg-primary hover:text-primary-foreground hover:rounded-sm">Team</DropdownMenuItem>
                    <DropdownMenuItem className="px-10 py-2 hover:bg-primary hover:text-primary-foreground hover:rounded-sm">Subscription</DropdownMenuItem>
                    <DropdownMenuItem className="px-10 py-2 "><ThemeButtonMobile/></DropdownMenuItem>
                    <DropdownMenuSeparator className="border border-primary" />
                    <DropdownMenuItem className="flex gap-1 justify-center items-center px-10 py-2 hover:bg-primary hover:rounded-b-lg hover:text-primary-foreground group">
                        <LogOut className="h-4 w-4 text-bg-foreground" />
                        <span className="text-bg-foreground ">Logout</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
