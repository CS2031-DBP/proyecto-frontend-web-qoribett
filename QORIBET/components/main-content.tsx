"use client"

import MatchCard from "./match-card"

interface Match {
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

const matches: Match[] = [
  {
    id: "1",
    league: "Liga 1 Max",
    team1: "Universitario",
    team2: "Alianza Lima",
    time: "15:00",
    odds: { win1: 2.1, draw: 3.4, win2: 3.5 },
  },
  {
    id: "2",
    league: "Liga 1 Max",
    team1: "Sporting Cristal",
    team2: "FBC Melgar",
    time: "17:30",
    odds: { win1: 1.85, draw: 3.6, win2: 4.2 },
  },
  {
    id: "3",
    league: "Premier League",
    team1: "Manchester City",
    team2: "Arsenal",
    time: "20:00",
    odds: { win1: 2.3, draw: 3.2, win2: 3.1 },
  },
  {
    id: "4",
    league: "Premier League",
    team1: "Liverpool",
    team2: "Chelsea",
    time: "18:00",
    odds: { win1: 1.9, draw: 3.5, win2: 4.0 },
  },
  {
    id: "5",
    league: "Champions League",
    team1: "Real Madrid",
    team2: "Barcelona",
    time: "19:30",
    odds: { win1: 1.72, draw: 3.8, win2: 5.5 },
  },
  {
    id: "6",
    league: "La Liga",
    team1: "Atletico Madrid",
    team2: "Sevilla",
    time: "21:00",
    odds: { win1: 1.55, draw: 4.0, win2: 6.5 },
  },
  {
    id: "7",
    league: "Bundesliga",
    team1: "Bayern Munich",
    team2: "Borussia Dortmund",
    time: "15:30",
    odds: { win1: 1.82, draw: 3.5, win2: 4.8 },
  },
]

export default function MainContent({
  onBetSelect,
  selectedBets,
}: {
  onBetSelect: (bet: any) => void
  selectedBets: any[]
}) {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Today's Matches</h2>
          <p className="text-slate-600 dark:text-slate-400">{matches.length} matches available for betting</p>
        </div>

        {/* Matches Grid */}
        <div className="grid gap-4">
          {matches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onOddSelect={onBetSelect}
              isSelected={selectedBets.some((b) => b.id === match.id)}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
