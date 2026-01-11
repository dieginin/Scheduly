import { Coffee, Play, Square, UtensilsCrossed } from "lucide-react"
import type { ControlType, Variant, WorkStatus } from "@/app/interfaces"

import { Button } from "@/components/ui/button"
import { cva } from "class-variance-authority"

const clockButtonVariants = cva("gap-2 px-8 py-6 text-lg", {
  variants: {
    variant: {
      default: "",
      outline: "border",
    },
    intent: {
      primary: "",
      destructive: "",
      idle: "",
    },
  },
  compoundVariants: [
    {
      variant: "default",
      intent: "primary",
      class: "bg-primary hover:bg-primary/90",
    },
    {
      variant: "default",
      intent: "idle",
      class: "bg-idle hover:bg-idle/90",
    },
    {
      variant: "outline",
      intent: "destructive",
      class: "border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive",
    },
    {
      variant: "outline",
      intent: "idle",
      class: "border-idle text-idle hover:bg-idle/10 hover:text-idle",
    },
  ],
})

interface ControlConfig {
  icon: React.ElementType
  label: string
  variant: Variant
  intent: "primary" | "destructive" | "idle"
}

const controls: Record<ControlType, ControlConfig> = {
  startShift: {
    icon: Play,
    label: "Start working",
    variant: "default",
    intent: "primary",
  },
  endShift: {
    icon: Square,
    label: "Clock-out",
    variant: "outline",
    intent: "destructive",
  },
  startLunch: {
    icon: Coffee,
    label: "Start Lunch",
    variant: "default",
    intent: "idle",
  },
  endLunch: {
    icon: UtensilsCrossed,
    label: "Stop Lunch",
    variant: "outline",
    intent: "idle",
  },
}

const ClockControl = ({ type, onClick }: { type: ControlType; onClick: () => void }) => {
  const control = controls[type]

  return (
    <Button
      size='sm'
      variant={control.variant}
      className={clockButtonVariants({
        variant: control.variant,
        intent: control.intent,
      })}
      onClick={onClick}
    >
      <control.icon className='w-5 h-5' />
      {control.label}
    </Button>
  )
}

interface Props {
  lunchStart?: Date
  status: WorkStatus

  onClockIn: () => void
  onClockOut: () => void
  onStartLunch: () => void
  onEndLunch: () => void
}

export const ClockControls = ({ lunchStart, status, onClockIn, onClockOut, onStartLunch, onEndLunch }: Props) => {
  const byStatus: Record<WorkStatus, ControlType[]> = {
    idle: ["startShift"],
    working: ["startLunch", "endShift"],
    lunch: ["endLunch", "endShift"],
  }

  const handlers: Record<ControlType, () => void> = {
    startShift: onClockIn,
    endShift: onClockOut,
    startLunch: onStartLunch,
    endLunch: onEndLunch,
  }

  return (
    <div className='flex flex-wrap justify-center gap-3'>
      {byStatus[status]
        .filter(c => c !== "startLunch" || !lunchStart)
        .map(type => (
          <ClockControl key={type} type={type} onClick={handlers[type]} />
        ))}
    </div>
  )
}
