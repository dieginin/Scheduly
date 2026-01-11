import type { Shift } from "@/app/interfaces"

export const reviveDate = (value?: string | Date) => (value ? new Date(value) : undefined)

export const splitShift = (shifts: Shift[]): { rest: Shift[]; shift: Shift } => ({
  rest: shifts.slice(0, -1),
  shift: shifts[shifts.length - 1],
})
