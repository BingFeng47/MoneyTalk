import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
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
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
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
        

        {children}

        
      </ThemeProvider>

      </body>
    </html>
  );
}
