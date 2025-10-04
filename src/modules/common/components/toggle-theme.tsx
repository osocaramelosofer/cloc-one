"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"


export function ToggleTheme() {
  const { setTheme } = useTheme()

  return (
      <div className="flex gap-2">
        <Button 
          onClick={() => setTheme("light")}
          variant="outline" size="icon"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
        <Button 
          onClick={() => setTheme("dark")}
          variant="outline" size="icon"
        >
          <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-300 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        </Button>
      </div>
    
  )
}
