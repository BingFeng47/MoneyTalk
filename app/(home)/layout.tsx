import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { ThemeProvider, useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bird, Bot, GithubIcon, Menu, PresentationIcon, YoutubeIcon } from "lucide-react";
import GoogleAnalyticsProvider from "@/components/GoogleAnalyticsProvider";
import { ThemeButton } from "@/components/ThemeButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ThemeButtonMobile } from "@/components/ThemeButtonMobile";
import { Youtube } from "@/components/Youtube";

// Font variables
const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Website metadata
export const metadata: Metadata = {
  title: "MoneyTalk",
  description: "Say it, MoneyTalk does it — your personal finance ally.",
  icons: {
    icon: '/bird.svg', 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalyticsProvider/>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {/* Header */}
        <header className="px-4 lg:px-6 h-20 flex items-center sticky top-0 z-50 bg-secondary pt-1">
        
          {/* Logo */}
            <a className="flex items-center justify-center" href="/">
              <Bird className="h-8 w-8 text-[#682bd7] dark:text-white" />
              <h1 className="text-xl px-2 text-primary font-extrabold ">Money<span className="font-bold text-xl text-secondary-foreground">Talk</span></h1>
            </a>
            
          
          {/* Nav Items */}
            <nav className="ml-auto gap-2 lg:gap-4 items-center hidden md:flex">
            
            <Link href={"/"}>
              <Button variant={"ghost"} className="text-md py-5 hover:bg-primary hover:text-primary-foreground">
                Home
              </Button>
            </Link>

            <Link href={"/about"}>
              <Button variant={"ghost"} className="text-md py-5  hover:bg-primary hover:text-primary-foreground">
              About Us
              </Button>
            </Link>

            <Link href={"/docs"}>
              <Button variant={"ghost"} className="text-md py-5  hover:bg-primary hover:text-primary-foreground">
                How It Works
              </Button>
            </Link>

            </nav>

            <nav className="ml-auto gap-2 lg:gap-4 items-center hidden md:flex">
              <Link href={"/demo/dashboard"}>
                <Button variant={"default"} className="lg:text-sm py-5 font-bold">
                Try Now!
                </Button>
              </Link>

              <ThemeButton />
            </nav>

            {/* Hamburger Menu for Mobile */}
            <div className="md:hidden ml-auto flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger><Menu className="text-primary"/></DropdownMenuTrigger>
                <DropdownMenuContent className="px-2 pt-2">
                  <div className="px-8 py-5 bg-accent rounded-lg mr-3 border border-primary">
                  <DropdownMenuItem className="flex flex-col gap-2">
                      <Link href={"/"}>
                        <Button variant={"outline"} className="lg:text-sm w-full">
                          Home
                        </Button>
                      </Link>

                      <Link href={"/about"}>
                        <Button variant={"outline"} className="lg:text-sm w-full">
                          About Us
                        </Button>
                      </Link>

                      <Link href={"/docs"}>
                        <Button variant={"outline"} className="lg:text-sm w-full">
                          How It Works
                        </Button>
                      </Link>
                                           
                      <Link href={"/demo/dashboard"}>
                        <Button variant={"default"} className="lg:text-sm font-bold w-full">
                          Lets Talk!
                        </Button>
                      </Link>

                      <ThemeButtonMobile/>

                    </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
              </DropdownMenu>
              
            </div>

        </header>

        {children}

        <footer className="flex flex-col md:flex-row gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">© MoneyTalk PayHack Hackathon 2024. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <GithubIcon className="hover:cursor-pointer text-primary dark:text-white" />
            <YoutubeIcon className="hover:cursor-pointer text-primary dark:text-white"/>
            <PresentationIcon className="hover:cursor-pointer text-primary dark:text-white"/>
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">© MoneyTalk PayHack Hackathon 2024. All rights reserved.</p>
        </footer>
      </ThemeProvider>

      </body>
    </html>
  );
}
