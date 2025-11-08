"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Menu, X, LogOut } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"

interface HeaderProps {
  onOpenLogin?: () => void
  onOpenRegister?: () => void
}

export default function Header({ onOpenLogin, onOpenRegister }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  return (
    <header className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 shadow-sm">
      <div className="px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">⚽</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white hidden sm:inline">
            <span className="text-blue-600 dark:text-blue-400">QORI</span>
            <span className="text-slate-700 dark:text-slate-300">BET</span>
          </h1>
        </Link>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-8 flex-1 ml-12">
          <button className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium">
            Today
          </button>
          <button className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium">
            Live
          </button>
          <button className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-sm font-medium">
            Upcoming
          </button>
        </nav>

        {/* Search, Theme, and Auth */}
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition">
            <Search size={20} />
          </button>

          <ThemeToggle />

          {isLoggedIn ? (
            <>
              <span className="text-sm text-slate-600 dark:text-slate-400 hidden sm:inline">User</span>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="hidden sm:inline-flex gap-2 text-slate-600 dark:text-slate-400"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="hidden sm:inline-block px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 rounded-lg font-semibold transition"
              >
                Log In
              </button>

              <button
                onClick={onOpenRegister}
                className="hidden sm:inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-lg font-semibold transition"
              >
                Register
              </button>
            </>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900">
          <div className="space-y-3">
            {!isLoggedIn && (
              <>
                <button
                  onClick={() => {
                    onOpenLogin?.()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    onOpenRegister?.()
                    setIsMobileMenuOpen(false)
                  }}
                  className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
