import type { Report, Shift } from "@/app/interfaces"

export const reviveDate = (value?: Date | string) => {
  if (!value) return undefined
  return value instanceof Date ? value : new Date(value)
}

export const splitShift = (shifts: Shift[]): { rest: Shift[]; shift: Shift } => ({
  rest: shifts.slice(0, -1),
  shift: shifts[shifts.length - 1],
})

type TimeDuration = {
  hours: number
  minutes: number
}

const durationBetween = (start?: Date, end?: Date): TimeDuration => {
  if (!start || !end) return { hours: 0, minutes: 0 }

  const diffMs = end.getTime() - start.getTime()
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  }
}

export const lunchDuration = (shift: Shift) => durationBetween(shift.lunchStart, shift.lunchEnd)

export const shiftDuration = (shift: Shift) => {
  const lunchDuration = durationBetween(shift.lunchStart, shift.lunchEnd)
  const shiftDuration = durationBetween(shift.start, shift.end)
  return {
    hours: shiftDuration.hours - lunchDuration.hours,
    minutes: shiftDuration.minutes - lunchDuration.minutes,
  }
}

export const calculateDays = (report: Report): number => {
  if (!report.endDate) return 0

  const start = report.startDate.getTime()
  const end = report.endDate.getTime()

  const diffMs = start - end
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}
