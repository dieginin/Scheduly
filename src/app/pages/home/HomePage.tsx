import { Calendar, Clock7, Coffee, Hamburger, ListCheck, type LucideProps, Toolbox } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Clock, ClockControls, MenuButton, StatusBadge } from "./ui"
import type { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from "react"
import { cn, formatTime } from "@/lib"

import { useReport } from "@/app/hooks"

interface SummaryCardProps {
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  title: string
  value: string

  isPrimary?: boolean
}

export const SummaryCard = ({ icon: Icon, title, value, isPrimary = false }: SummaryCardProps) => {
  return (
    <Card className='w-full'>
      <CardContent className='grid gap-2 text-center'>
        <Icon className={cn("w-5 h-5 mx-auto", isPrimary ? "text-primary" : "text-muted-foreground")} />
        <div className='font-mono text-xl font-bold text-foreground'>{value}</div>
        <div className='text-xs text-muted-foreground/70'>{title}</div>
      </CardContent>
    </Card>
  )
}

export const SummaryStrip = ({ children }: PropsWithChildren) => <div className='flex justify-center gap-4' children={children} />

export const HomePage = () => {
  const {
    report,
    status,
    shift,

    daysCount,
    lunchTime,
    workedTime,

    isLunching,
    isWorking,
    tookLunch,

    clockIn,
    clockOut,
    endLunch,
    startLunch,
  } = useReport()

  return (
    <div className='grid gap-4 w-sm md:w-lg'>
      <MenuButton />

      <Card className='mb-3'>
        <CardTitle className='grid justify-center'>
          <StatusBadge status={status} />
        </CardTitle>

        <CardContent>
          <Clock />
        </CardContent>

        <ClockControls
          lunchStart={shift?.lunchStart}
          status={status}
          onClockIn={clockIn}
          onClockOut={clockOut}
          onStartLunch={startLunch}
          onEndLunch={endLunch}
        />
      </Card>

      {isWorking && (
        <SummaryStrip>
          <SummaryCard icon={Clock7} title='Shift start' value={formatTime(shift?.start)} />
          {isLunching && !tookLunch && <SummaryCard icon={Coffee} title='Lunch start' value={formatTime(shift?.lunchStart)} />}
          {tookLunch && <SummaryCard icon={Hamburger} title='Lunch time' value={`${lunchTime.hours}h ${lunchTime.minutes}m`} />}
        </SummaryStrip>
      )}
      <SummaryStrip>
        <SummaryCard icon={Calendar} title='Days' value={daysCount.toString()} isPrimary />
        <SummaryCard icon={ListCheck} title='Shifts' value={report?.shifts.length.toString() ?? "0"} isPrimary />
        <SummaryCard icon={Toolbox} title='Worked' value={`${workedTime.hours}h ${workedTime.minutes}m`} isPrimary />
      </SummaryStrip>
    </div>
  )
}
