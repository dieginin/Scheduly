import type { Shift } from "@/app/interfaces"

export const splitShift = (shifts: Shift[]): { rest: Shift[]; shift: Shift } => ({
  rest: shifts.slice(0, -1),
  shift: shifts[shifts.length - 1],
})
