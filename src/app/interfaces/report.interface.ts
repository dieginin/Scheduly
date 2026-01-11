import type { Shift } from "."

export interface Report {
  number: number
  startDate: Date
  endDate?: Date
  shifts: Shift[]
}
