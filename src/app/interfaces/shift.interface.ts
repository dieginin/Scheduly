export type WorkStatus = "idle" | "working" | "lunch"

export interface Shift {
  end?: Date
  lunchEnd?: Date
  lunchStart?: Date
  start: Date
}
