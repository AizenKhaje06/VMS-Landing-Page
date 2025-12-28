"use client"

import { useEffect, useState } from "react"
import { Clock, AlertTriangle, Zap } from "lucide-react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })
  const [stockLeft, setStockLeft] = useState(47) // Simulate low stock

  useEffect(() => {
    // Set timer to end in 2 hours for more urgency
    const calculateTimeLeft = () => {
      const now = new Date()
      const endTime = new Date(now.getTime() + 2 * 60 * 60 * 1000) // 2 hours from now

      const difference = endTime.getTime() - now.getTime()

      if (difference > 0) {
        return {
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        }
      }

      return { hours: 0, minutes: 0, seconds: 0 }
    }

    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Simulate stock decreasing occasionally
    const stockTimer = setInterval(() => {
      setStockLeft(prev => Math.max(1, prev - Math.floor(Math.random() * 3)))
    }, 30000) // Decrease stock every 30 seconds

    return () => {
      clearInterval(timer)
      clearInterval(stockTimer)
    }
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      {/* Flash Sale Timer */}
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30 animate-pulse">
        <Zap className="w-4 h-4 text-red-500" />
        <span className="text-sm font-bold text-foreground">
          🔥 FLASH SALE ENDS IN:{" "}
          <span className="font-bold text-red-500">
            {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
            {String(timeLeft.seconds).padStart(2, "0")}
          </span>
        </span>
      </div>

      {/* Low Stock Indicator */}
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
        <AlertTriangle className="w-4 h-4 text-amber-500" />
        <span className="text-sm font-bold text-foreground">
          Only <span className="text-amber-500 font-bold">{stockLeft}</span> left in stock!
        </span>
      </div>
    </div>
  )
}
