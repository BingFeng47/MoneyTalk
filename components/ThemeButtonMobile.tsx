"use client"
import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { MoonIcon, SunIcon } from "lucide-react"


export function ThemeButtonMobile() {
  const { setTheme } = useTheme()

  return (
    <div className="flex gap-2">
        <Button variant={'outline'} onClick={() => setTheme("light")} className="w-1/2">
          <SunIcon className="text-primary dark:text-white"/>
        </Button>
        <Button variant={'outline'} onClick={() => setTheme("dark")} className="w-1/2">
          <MoonIcon className="text-primary dark:text-white"/>
        </Button>
    </div>
  )
}
