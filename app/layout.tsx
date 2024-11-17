import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bot } from "lucide-react";
import GoogleAnalyticsProvider from "@/components/ui/GoogleAnalyticsProvider";
import { ThemeButton } from "@/components/ui/ThemeButton";

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
        {/* Header */}
        <header className="px-4 lg:px-6 h-20 flex items-center sticky top-0 z-50 bg-background pt-1">
        
          {/* Logo */}
          <a className="flex items-center justify-center" href="/">
            <Bot className="h-8 w-8" />
          </a>
          
          {/* Nav Items */}
          <nav className="ml-auto flex gap-2 lg:gap-4 items-center">
            
            
            <Link href={"/chatbot"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                AI Team Builder
              </Button>
            </Link>

            <Link href={"/players"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                Players
              </Button>
            </Link>

            <Link href={"/about"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                About Us
              </Button>
            </Link>

            <Link href={"/docs"}>
              <Button variant= {"outline"} className="lg:text-sm py-5">
                Docs
              </Button>
            </Link>

            <ThemeButton/>
          </nav>

        </header>

        {children}

        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Biot VCT Hackathon. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">

          </nav>
        </footer>
      </ThemeProvider>

      </body>
    </html>
  );
}
