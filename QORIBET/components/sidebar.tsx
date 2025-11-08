"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface LeagueGroup {
  category: string
  leagues: Array<{ name: string; emoji?: string }>
  icon?: string
}

const leagueGroups: LeagueGroup[] = [
  {
    category: "QUICK FILTERS",
    leagues: [{ name: "All Matches" }, { name: "Live", emoji: "🔴" }, { name: "Upcoming", emoji: "⏰" }],
  },
  {
    category: "TOP LEAGUES",
    leagues: [
      { name: "Liga 1 Max", emoji: "🇵🇪" },
      { name: "Premier League", emoji: "🏴󐁧󐁢󐁥󐁮󐁧󐁿" },
      { name: "Champions League", emoji: "👑" },
      { name: "La Liga", emoji: "🇪🇸" },
      { name: "Bundesliga", emoji: "🇩🇪" },
      { name: "Serie A", emoji: "🇮🇹" },
      { name: "Ligue 1", emoji: "🇫🇷" },
    ],
  },
  {
    category: "OTHER SPORTS",
    leagues: [{ name: "Basketball" }, { name: "Tennis" }, { name: "Baseball" }],
  },
  {
    category: "FAVORITES",
    leagues: [{ name: "My Favorites", emoji: "❤️" }],
  },
]

export default function Sidebar() {
  const [expandedCategory, setExpandedCategory] = useState<string>("QUICK FILTERS")
  const [selectedLeague, setSelectedLeague] = useState<string>("All Matches")

  return (
    <aside className="w-64 bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 overflow-y-auto hidden lg:block sticky top-16 h-[calc(100vh-4rem)]">
      <div className="p-4 space-y-2">
        {leagueGroups.map((group) => (
          <div key={group.category}>
            <button
              onClick={() => setExpandedCategory(expandedCategory === group.category ? "" : group.category)}
              className="w-full flex items-center justify-between px-3 py-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-xs font-semibold uppercase tracking-wide"
            >
              <span>{group.category}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${expandedCategory === group.category ? "rotate-180" : ""}`}
              />
            </button>

            {expandedCategory === group.category && (
              <div className="space-y-1 mt-1">
                {group.leagues.map((league) => (
                  <button
                    key={league.name}
                    onClick={() => setSelectedLeague(league.name)}
                    className={`w-full text-left px-4 py-2 text-sm rounded transition flex items-center gap-2 ${
                      selectedLeague === league.name
                        ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-medium"
                        : "text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {league.emoji && <span className="text-base">{league.emoji}</span>}
                    {league.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  )
}
