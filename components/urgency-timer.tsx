"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface TimeLeft {
  hours: number
  minutes: number
  seconds: number
}

export function UrgencyTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    // Set timer to end at midnight
    const calculateTimeLeft = () => {
      const now = new Date()
      const midnight = new Date()
      midnight.setHours(24, 0, 0, 0)

      const difference = midnight.getTime() - now.getTime()

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

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-500/10 border border-amber-500/30">
      <Clock className="w-4 h-4 text-amber-500" />
      <span className="text-sm font-medium text-foreground">
        Flash Sale Ends:{" "}
        <span className="font-bold text-amber-500">
          {String(timeLeft.hours).padStart(2, "0")}:{String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </span>
    </div>
  )
}
