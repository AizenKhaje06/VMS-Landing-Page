"use client"

import { useEffect, useState } from "react"
import { Eye } from "lucide-react"

export function LiveViewers() {
  const [viewers, setViewers] = useState(127)

  useEffect(() => {
    // Simulate fluctuating viewer count for social proof
    const interval = setInterval(() => {
      setViewers((prev) => {
        const change = Math.floor(Math.random() * 7) - 3 // Random change between -3 and +3
        const newCount = prev + change
        return Math.max(85, Math.min(180, newCount)) // Keep between 85-180
      })
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
      <Eye className="w-4 h-4 text-green-500 animate-pulse" />
      <span className="text-xs sm:text-sm font-medium text-foreground">
        <span className="font-bold text-green-500">{viewers}</span> people viewing
      </span>
    </div>
  )
}
