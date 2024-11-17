// components/HeaderWithPathname.js
"use client"; // Mark this component as client-side

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bird, Menu, GithubIcon, YoutubeIcon, PresentationIcon } from "lucide-react";
import { ThemeButtonMobile } from "./ThemeButtonMobile";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ThemeButton } from "./ThemeButton";

export default function MenuHeader() {
  const pathname = usePathname(); // Now you can use `usePathname` here
  const isDemoPage = pathname.startsWith("/demo");

  return (
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

      <Link href={"/"}>
        <Button variant={"ghost"} className="text-md py-5  hover:bg-primary hover:text-primary-foreground">
        GitHub
        </Button>
      </Link>

      <Link href={"/"}>
        <Button variant={"ghost"} className="text-md py-5  hover:bg-primary hover:text-primary-foreground">
        YouTube
        </Button>
      </Link>

      </nav>

      <nav className="ml-auto gap-2 lg:gap-4 items-center hidden md:flex">
        <Link href={"/demo"}>
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
                
                <Link href={"/docs"}>
                  <Button variant={"outline"} className="lg:text-sm w-full">
                    GitHub
                  </Button>
                </Link>

                <Link href={"/docs"}>
                  <Button variant={"outline"} className="lg:text-sm w-full">
                    YouTube
                  </Button>
                </Link>

                
                <Link href={"/demo"}>
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
  );
}