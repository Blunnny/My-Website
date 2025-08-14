'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <label className="switch hover:drop-shadow-primary/30 transition-all duration-300 hover:scale-110 hover:drop-shadow-lg active:scale-95">
      <input type="checkbox" checked={isDark} onChange={toggleTheme} />
      <span className="slider">
        <Sun className="absolute left-1 top-1 h-3 w-3 scale-100 text-yellow-400 opacity-100 transition-all duration-500 dark:scale-0 dark:opacity-0" />
        <Moon className="absolute right-1 top-1 h-3 w-3 scale-0 text-blue-300 opacity-0 transition-all duration-500 dark:scale-100 dark:opacity-100" />
      </span>
    </label>
  )
}
