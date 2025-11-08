"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "./theme-provider-client"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
