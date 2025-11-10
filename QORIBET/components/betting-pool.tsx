"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { X, TrendingUp } from "lucide-react"

interface BettingPoolProps {
  selectedBets: Array<{
    id: string
    match: string
    teams: string
    odd: number
    type: string
  }>
  onRemoveBet: (id:  string) => void
}



export default function BettingPool({ selectedBets, onRemoveBet }: BettingPoolProps)
 {
  const [stake, setStake] = useState<number>(10)

  const calculations = useMemo(() => {
    const totalOdd = selectedBets.reduce((acc, bet) => acc * bet.odd, 1)
    const potentialWin = stake * totalOdd
    const profit = potentialWin - stake

    return { totalOdd, potentialWin, profit }
  }, [selectedBets, stake])

  return (
    <aside className="w-80 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 overflow-y-auto hidden xl:flex flex-col shadow-lg">
      <div className="p-6 space-y-6 flex-1 flex flex-col">
        {/* Header */}
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">Betting Pool</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{selectedBets.length} selections</p>
        </div>

        {/* Selected Bets */}
        <div className="space-y-3">
          {selectedBets.length === 0 ? (
            <div className="text-center py-8">
              <TrendingUp size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">Click odds to add bets</p>
            </div>
          ) : (
            selectedBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg p-3 flex items-start justify-between hover:bg-slate-100 dark:hover:bg-slate-600 transition"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide truncate">
                    {bet.match}
                  </p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{bet.teams}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{bet.odd.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => onRemoveBet(bet.id)}
                  className="ml-2 text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Calculations */}
        {selectedBets.length > 0 && (
          <div className="space-y-4 flex-1 flex flex-col justify-end">
            {/* Stake Input */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase mb-2">
                Stake (S/)
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(Math.max(0, Number(e.target.value)))}
                  className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:border-blue-400 dark:focus:border-blue-400"
                  min="0"
                  step="1"
                />
                <span className="text-slate-600 dark:text-slate-400 font-medium">S/</span>
              </div>
            </div>

            {/* Quick Stake Buttons */}
            <div className="grid grid-cols-3 gap-2">
              {[10, 50, 100].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setStake(amount)}
                  className="px-2 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-blue-100 dark:hover:bg-blue-900 border border-slate-200 dark:border-slate-600 rounded text-sm text-slate-700 dark:text-slate-300 transition font-medium"
                >
                  S/{amount}
                </button>
              ))}
            </div>

            {/* Odds Summary */}
            <div className="bg-gradient-to-br from-blue-50 dark:from-slate-700 to-blue-50/50 dark:to-slate-800 border border-blue-200 dark:border-slate-600 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Total Odds</span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {calculations.totalOdd.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Potential Win</span>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  S/{calculations.potentialWin.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-blue-200 dark:border-slate-600">
                <span className="text-slate-600 dark:text-slate-400 text-sm">Profit</span>
                <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  S/{calculations.profit.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Place Bet Button */}
            <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition">
              Place Bet
            </Button>
          </div>
        )}
      </div>
    </aside>
  )
}
