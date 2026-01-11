import { Clock, Coffee, Moon } from "lucide-react"

import type { WorkStatus } from "@/app/interfaces"
import { cva } from "class-variance-authority"

const statusBadgeVariants = cva("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium", {
  variants: {
    status: {
      idle: "bg-muted text-muted-foreground",
      working: "bg-primary/15 text-primary",
      lunch: "bg-idle/15 text-idle",
    },
  },
  defaultVariants: {
    status: "idle",
  },
})

const badgeMeta = {
  idle: {
    label: "Idle",
    icon: Moon,
  },
  working: {
    label: "Working",
    icon: Clock,
  },
  lunch: {
    label: "Lunch",
    icon: Coffee,
  },
}

interface StatusBadgeProps {
  status: WorkStatus
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const badge = badgeMeta[status]

  return (
    <div className={statusBadgeVariants({ status })}>
      <badge.icon className='w-4 h-4' />
      <span>{badge.label}</span>
    </div>
  )
}
