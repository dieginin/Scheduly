import type { Report, Shift, WorkStatus } from "../interfaces"
import { type StateCreator, create } from "zustand"
import { devtools, persist } from "zustand/middleware"

import { reviveDate, splitShift } from "@/lib"

interface ReportState {
  report?: Report
  shift?: Shift
  status: WorkStatus

  isLunching: boolean
  isWorking: boolean
  tookLunch: boolean

  clockIn: () => void
  clockOut: () => void
  endLunch: () => void
  startLunch: () => void
  submitReport: () => Promise<boolean>
}

const storeApi: StateCreator<ReportState> = (set, get) => ({
  report: undefined,
  shift: undefined,
  status: "idle",

  isLunching: false,
  isWorking: false,
  tookLunch: false,

  clockIn: () => {
    const report = get().report ?? { number: 1, startDate: new Date(), shifts: [] }

    const shift = { start: new Date() }
    report.shifts = [...report.shifts, shift]

    set({ report, shift, status: "working", isWorking: true })
  },
  clockOut: () => {
    const report = get().report!
    const { shift, rest } = splitShift(report.shifts)

    shift.end = new Date()
    if (get().status === "lunch") shift.lunchEnd = new Date()
    report.shifts = [...rest, shift]

    set({ report, shift: undefined, status: "idle", isLunching: false, isWorking: false, tookLunch: false })
  },
  endLunch: () => {
    const report = get().report!
    const { shift, rest } = splitShift(report.shifts)

    shift.lunchEnd = new Date()
    report.shifts = [...rest, shift]

    set({ report, shift, status: "working", isLunching: false, tookLunch: true })
  },
  startLunch: () => {
    const report = get().report!
    const { shift, rest } = splitShift(report.shifts)

    shift.lunchStart = new Date()
    report.shifts = [...rest, shift]

    set({ report, status: "lunch", isLunching: true })
  },
  submitReport: async () => {
    set({ report: undefined, shift: undefined, status: "idle", isLunching: false, isWorking: false, tookLunch: false })
    return true
  },
})

export const useReportStore = create<ReportState>()(
  persist(devtools(storeApi), {
    name: "report",
    onRehydrateStorage: () => state => {
      if (state?.report) {
        state.report.startDate = new Date(state.report.startDate)
        state.report.endDate = reviveDate(state.report.endDate)
        state.report.shifts = state.report.shifts.map(shift => ({
          ...shift,
          start: new Date(shift.start),
          end: reviveDate(shift.end),
          lunchStart: reviveDate(shift.lunchStart),
          lunchEnd: reviveDate(shift.lunchEnd),
        }))
      }
    },
  })
)
