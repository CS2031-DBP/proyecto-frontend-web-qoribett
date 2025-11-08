"use client"
import { Clock } from "lucide-react"
import Link from "next/link"

interface MatchCardProps {
  match: {
    id: string
    league: string
    team1: string
    team2: string
    time: string
    odds: {
      win1: number
      draw: number
      win2: number
    }
  }
  onOddSelect: (bet: any) => void
  isSelected: boolean
}

export default function MatchCard({ match, onOddSelect, isSelected }: MatchCardProps) {
  const handleOddClick = (oddValue: number, oddType: string) => {
    onOddSelect({
      id: `${match.id}-${oddType}`,
      match: `${match.team1} vs ${match.team2}`,
      teams: `${match.team1} - ${oddType}`,
      odd: oddValue,
      type: oddType,
    })
  }

  return (
    <Link href={`/match/${match.id}`}>
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden hover:border-blue-400 dark:hover:border-blue-400 transition cursor-pointer">
        {/* Match Header */}
        <div className="bg-gradient-to-r from-slate-50 dark:from-slate-900 to-slate-100 dark:to-slate-800 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {match.league}
            </span>
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-sm">
              <Clock size={14} />
              {match.time}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-lg font-bold text-slate-900 dark:text-white">{match.team1}</p>
            </div>
            <div className="px-4 text-slate-600 dark:text-slate-400 font-semibold">vs</div>
            <div className="flex-1 text-right">
              <p className="text-lg font-bold text-slate-900 dark:text-white">{match.team2}</p>
            </div>
          </div>
        </div>

        {/* Odds */}
        <div className="px-6 py-4 grid grid-cols-3 gap-3">
          <button
            onClick={(e) => {
              e.preventDefault()
              handleOddClick(match.odds.win1, `Win ${match.team1.split(" ").pop()}`)
            }}
            className="group relative px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950 border border-slate-200 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-400 rounded transition"
          >
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">1</div>
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300">
              {match.odds.win1.toFixed(2)}
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              handleOddClick(match.odds.draw, "Draw")
            }}
            className="group relative px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-amber-50 dark:hover:bg-amber-950 border border-slate-200 dark:border-slate-600 hover:border-amber-400 dark:hover:border-amber-400 rounded transition"
          >
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">X</div>
            <div className="text-2xl font-bold text-amber-600 dark:text-amber-400 group-hover:text-amber-700 dark:group-hover:text-amber-300">
              {match.odds.draw.toFixed(2)}
            </div>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              handleOddClick(match.odds.win2, `Win ${match.team2.split(" ").pop()}`)
            }}
            className="group relative px-4 py-3 bg-slate-50 dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950 border border-slate-200 dark:border-slate-600 hover:border-rose-400 dark:hover:border-rose-400 rounded transition"
          >
            <div className="text-xs text-slate-600 dark:text-slate-400 font-semibold mb-1">2</div>
            <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 group-hover:text-rose-700 dark:group-hover:text-rose-300">
              {match.odds.win2.toFixed(2)}
            </div>
          </button>
        </div>
      </div>
    </Link>
  )
}
