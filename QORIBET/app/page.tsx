"use client"

import { useState } from "react"
import Header from "@/components/header"
import Sidebar from "@/components/sidebar"
import MainContent from "@/components/main-content"
import BettingPool from "@/components/betting-pool"
import LoginModal from "@/components/login-modal"
import RegisterModal from "@/components/register-modal"

export default function Home() {
  const [selectedBets, setSelectedBets] = useState<
    Array<{
      id: string
      match: string
      teams: string
      odd: number
      type: string
    }>
  >([])

  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isRegisterOpen, setIsRegisterOpen] = useState(false)

  const handleBetSelect = (bet: {
    id: string
    match: string
    teams: string
    odd: number
    type: string
  }) => {
    const existingIndex = selectedBets.findIndex((b) => b.id === bet.id)
    if (existingIndex > -1) {
      setSelectedBets(selectedBets.filter((_, i) => i !== existingIndex))
    } else {
      setSelectedBets([...selectedBets, bet])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header onOpenLogin={() => setIsLoginOpen(true)} onOpenRegister={() => setIsRegisterOpen(true)} />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <MainContent onBetSelect={handleBetSelect} selectedBets={selectedBets} />
        <BettingPool
          selectedBets={selectedBets}
          onRemoveBet={(id) => {
            setSelectedBets(selectedBets.filter((b) => b.id !== id))
          }}
        />
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginOpen(false)
          setIsRegisterOpen(true)
        }}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterOpen(false)
          setIsLoginOpen(true)
        }}
      />
    </div>
  )
}
