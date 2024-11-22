import "./globals.css";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bird, Bot, GithubIcon, Menu, PresentationIcon, YoutubeIcon } from "lucide-react";
import { ThemeButton } from "@/components/ThemeButton";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem,  DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ThemeButtonMobile } from "@/components/ThemeButtonMobile";
import { Testimonials } from "@/components/landing/Testimonials";
import SparklesText from "@/components/ui/sparkles-text";
import GridPattern from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Features } from "@/components/features";
import SpecialThanks from "@/components/SpecialThanks";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-20 flex items-center sticky top-0 z-50 bg-secondary pt-1">
        {/* Logo */}
        <a className="flex items-center justify-center" href="/">
          <Bird className="h-8 w-8 text-[#682bd7] dark:text-white" />
          <h1 className="text-xl px-2 text-primary font-extrabold">
            Money<span className="font-bold text-xl text-secondary-foreground">Talk</span>
          </h1>
        </a>

        {/* Nav Items */}
        <nav className="ml-auto gap-2 lg:gap-4 items-center hidden md:flex">
          <Link href="/">
            <Button variant={"ghost"} className="text-md py-5 hover:bg-primary hover:text-primary-foreground">
              Home
            </Button>
          </Link>
          <Link href="/about">
            <Button variant={"ghost"} className="text-md py-5 hover:bg-primary hover:text-primary-foreground">
              About Us
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant={"ghost"} className="text-md py-5 hover:bg-primary hover:text-primary-foreground">
              How It Works
            </Button>
          </Link>
        </nav>

        <nav className="ml-auto gap-2 lg:gap-4 items-center hidden md:flex">
          <Link href="/demo/dashboard">
            <Button variant={"default"} className="lg:text-sm py-5 font-bold">
              Try Now!
            </Button>
          </Link>
          <ThemeButton />
        </nav>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden ml-auto flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Menu className="text-primary" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="px-2 pt-2">
              <div className="px-8 py-5 bg-accent rounded-lg mr-3 border border-primary">
                <DropdownMenuItem className="flex flex-col gap-2">
                  <Link href="/">
                    <Button variant={"outline"} className="lg:text-sm w-full">
                      Home
                    </Button>
                  </Link>
                  <Link href="/">
                    <Button variant={"outline"} className="lg:text-sm w-full">
                      AI Chat
                    </Button>
                  </Link>
                  <Link href="/about">
                    <Button variant={"outline"} className="lg:text-sm w-full">
                      About Us
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant={"outline"} className="lg:text-sm w-full">
                      How It Works
                    </Button>
                  </Link>
                  <Link href="/demo/dashboard">
                    <Button variant={"default"} className="lg:text-sm font-bold w-full">
                      Lets Talk!
                    </Button>
                  </Link>
                  <ThemeButtonMobile />
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section */}
        <div className="relative flex w-full items-center justify-center bg-background z-10 h-screen">
            <section className="w-full py-12 md:py-24 lg:py-32 xl:py-42 z-50 flex flex-col justify-center items-center text-center space-y-4">
            <Bird className="sm:w-48 sm:h-48 w-32 h-32" />
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              <SparklesText
              className="lg:text-5xl"
              text="Welcome to MoneyTalk"
              sparklesCount={8}
              colors={{ first: "#A07CFE", second: "#FE8FB5" }}
              />
            </h1>
            <p className="mx-auto  text-primary font-semibold md:text-2xl text-xl">
              No Money, <span className="line-through text-gray-400 text-lg"> No Talk</span> <span className="text-primary">  Let's Talk!</span> 
            </p>
            <div className="flex gap-2">
              <Link href="/docs" className="flex flex-row lg:gap-8 gap-4 pt-5">
                <Button variant={"outline"} size={"lg"} className="lg:text-sm py-6 font-semibold">
                Learn More
                </Button>
              </Link>
              <Link href="/demo/dashboard" className="flex flex-row lg:gap-8 gap-4 pt-5">
                <Button variant={"default"} size={"lg"} className="lg:text-sm py-6 font-semibold">
                Try Demo!
                </Button>
              </Link>
            </div>
            </section>
          <GridPattern
            squares={[
              [4, 4],
              [5, 1],
              [8, 2],
              [5, 3],
              [5, 5],
              [10, 10],
              [12, 15],
              [10, 15],
              [15, 10],
              [22, 20],
              [20, 20],
              [27, 30],
              [28, 10],
              [30, 20],
              [35, 24],
              [2, 29],
              [53, 10],
            ]}
            className={cn(
              "[mask-image:radial-gradient(700px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-55%] h-[210%] skew-y-12"
            )}
          />
        </div>

        {/* Features Section */}
        <section id='features' className="bg-muted min-h-screen min-w-screen flex justify-center items-center lg:py-20 py-10">
          <div className="lg:mx-40 mx-10 xs:2 flex gap-6 flex-grow md:flex-row flex-col">
            <p className="text-4xl font-bold flex justify-center dark:text-white">KEY FEATURES</p>
            <Features />
          </div>
        </section>
        {/* Testimonials Section */}
        <Testimonials />

        {/* Top Features */}
        <section className="bg-muted py-20 items-center">
              <div className="">
                <p className="text-2xl lg:text-4xl font-bold flex justify-center dark:text-accent-foreground">SPECIAL THANKS</p>
                <SpecialThanks/>
              </div>
              
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col md:flex-row gap-2 py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
          © MoneyTalk PayHack Hackathon 2024. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <GithubIcon className="hover:cursor-pointer text-primary dark:text-white" />
          <YoutubeIcon className="hover:cursor-pointer text-primary dark:text-white" />
          <PresentationIcon className="hover:cursor-pointer text-primary dark:text-white" />
        </nav>
        <p className="text-sm text-gray-500 dark:text-gray-400 sm:hidden">
          © MoneyTalk PayHack Hackathon 2024. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
