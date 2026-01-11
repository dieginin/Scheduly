import { Clock, Coffee, Moon } from "lucide-react"

import type { WorkStatus } from "@/app/interfaces"
import { cn } from "@/lib"

const badges = {
  idle: {
    label: "Idle",
    className: "status-badge-idle",
    icon: Moon,
  },
  working: {
    label: "Working",
    className: "status-badge-working",
    icon: Clock,
  },
  lunch: {
    label: "Lunch",
    className: "status-badge-lunch",
    icon: Coffee,
  },
}

interface StatusBadgeProps {
  status: WorkStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const badge = badges[status]

  return (
    <div className={cn("status-badge", badge.className)}>
      <badge.icon className='w-4 h-4' />
      <span>{badge.label}</span>
    </div>
  )
}
