"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import BettingPool from "@/components/betting-pool"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

interface BetType {
  category: string
  bets: Array<{
    id: string
    name: string
    odd: number
  }>
}

const BET_TYPES: BetType[] = [
  {
    category: "Match Result",
    bets: [
      { id: "result-1", name: "Team 1 Win", odd: 2.1 },
      { id: "result-x", name: "Draw", odd: 3.4 },
      { id: "result-2", name: "Team 2 Win", odd: 3.5 },
    ],
  },
  {
    category: "Goals",
    bets: [
      { id: "goals-under2", name: "Under 2.5 Goals", odd: 1.85 },
      { id: "goals-over2", name: "Over 2.5 Goals", odd: 1.95 },
      { id: "goals-exact1", name: "Exactly 1 Goal", odd: 4.2 },
      { id: "goals-exact2", name: "Exactly 2 Goals", odd: 3.8 },
      { id: "goals-exact3", name: "Exactly 3 Goals", odd: 5.1 },
    ],
  },
  {
    category: "Both Teams Score",
    bets: [
      { id: "bts-yes", name: "Both Score - Yes", odd: 1.72 },
      { id: "bts-no", name: "Both Score - No", odd: 2.1 },
    ],
  },
  {
    category: "Cards",
    bets: [
      { id: "cards-under4", name: "Under 4 Cards", odd: 1.65 },
      { id: "cards-over4", name: "Over 4 Cards", odd: 2.2 },
      { id: "cards-red-yes", name: "Red Card - Yes", odd: 2.5 },
      { id: "cards-red-no", name: "Red Card - No", odd: 1.55 },
    ],
  },
  {
    category: "Shots",
    bets: [
      { id: "shots-under8", name: "Under 8 Shots on Target", odd: 1.8 },
      { id: "shots-over8", name: "Over 8 Shots on Target", odd: 2.0 },
    ],
  },
  {
    category: "Corners",
    bets: [
      { id: "corners-under10", name: "Under 10 Corners", odd: 1.75 },
      { id: "corners-over10", name: "Over 10 Corners", odd: 2.05 },
    ],
  },
]

export default function MatchDetailPage() {
  const params = useParams()
  const matchId = params.id as string
  const [selectedBets, setSelectedBets] = useState<any[]>([])

  // Mock match data
  const match = {
    id: matchId,
    team1: "Manchester City",
    team2: "Arsenal",
    league: "Premier League",
    time: "20:00",
    date: "Today",
  }

  const handleBetSelect = (bet: any) => {
    const existingIndex = selectedBets.findIndex((b) => b.id === bet.id)
    if (existingIndex > -1) {
      setSelectedBets(selectedBets.filter((_, i) => i !== existingIndex))
    } else {
      setSelectedBets([...selectedBets, bet])
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-5xl mx-auto">
            {/* Back Button */}
            <Link
              href="/"
              className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 w-fit"
            >
              <ArrowLeft size={18} />
              Back to Matches
            </Link>

            {/* Match Header */}
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 mb-8">
              <p className="text-sm text-blue-600 dark:text-blue-400 font-semibold uppercase tracking-wide mb-3">
                {match.league}
              </p>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{match.team1}</h1>
                <span className="text-slate-500 dark:text-slate-400 font-semibold">VS</span>
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{match.team2}</h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                {match.date} at {match.time}
              </p>
            </div>

            {/* Bet Types Grid */}
            <div className="grid gap-6">
              {BET_TYPES.map((betType) => (
                <div
                  key={betType.category}
                  className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6"
                >
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">{betType.category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {betType.bets.map((bet) => (
                      <button
                        key={bet.id}
                        onClick={() =>
                          handleBetSelect({
                            id: bet.id,
                            match: `${match.team1} vs ${match.team2}`,
                            teams: bet.name,
                            odd: bet.odd,
                            type: bet.name,
                          })
                        }
                        className={`p-4 rounded-lg border-2 transition ${
                          selectedBets.some((b) => b.id === bet.id)
                            ? "border-blue-600 bg-blue-50 dark:bg-blue-950"
                            : "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700 hover:border-blue-400 dark:hover:border-blue-400"
                        }`}
                      >
                        <div className="text-sm font-medium text-slate-900 dark:text-white mb-2">{bet.name}</div>
                        <div
                          className={`text-xl font-bold ${selectedBets.some((b) => b.id === bet.id) ? "text-blue-600 dark:text-blue-400" : "text-slate-600 dark:text-slate-400"}`}
                        >
                          {bet.odd.toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Betting Pool Sidebar */}
        <BettingPool
          selectedBets={selectedBets}
          onRemoveBet={(id) => {
            setSelectedBets(selectedBets.filter((b) => b.id !== id))
          }}
        />
      </div>
    </div>
  )
}
