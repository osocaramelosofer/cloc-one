"use client"

import * as React from "react"
import { Moon, Sun, SunMedium } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/modules/ui/button"


export function ToggleTheme() {
  const { setTheme, theme } = useTheme()

  const handleToggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
      <div className="flex gap-2">
        <Button 
          onClick={handleToggleTheme}
          variant="outline" size="icon"
        >
          { theme === "light" ? (
            <Moon color="#000000"  size={16}/>
          ) : (
              <SunMedium color="#fff"  size={16}/>
            )}
        </Button>
      </div>
    
  )
}
