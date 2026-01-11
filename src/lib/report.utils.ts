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

  const startDate = start instanceof Date ? start : new Date(start)
  const endDate = end instanceof Date ? end : new Date(end)

  const diffMs = endDate.getTime() - startDate.getTime()
  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  }
}

export const lunchDuration = (shift: Shift) => durationBetween(shift.lunchStart, shift.lunchEnd)

export const workDuration = (report: Report): TimeDuration => {
  let totalMinutes = 0

  report.shifts.forEach(shift => {
    const shiftDuration = durationBetween(shift.start, shift.end ?? new Date())
    const lunchDuration = durationBetween(shift.lunchStart, shift.lunchEnd)

    const shiftMinutes = shiftDuration.hours * 60 + shiftDuration.minutes
    const lunchMinutes = lunchDuration.hours * 60 + lunchDuration.minutes

    totalMinutes += Math.max(shiftMinutes - lunchMinutes, 0)
  })

  return {
    hours: Math.floor(totalMinutes / 60),
    minutes: totalMinutes % 60,
  }
}

export const calculateDays = (report: Report): number => {
  const start = report.startDate.getTime()
  const end = (report.endDate ?? new Date()).getTime()

  const diffMs = Math.max(1, end - start)
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24))
}
