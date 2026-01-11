import type { Report, Shift, WorkStatus } from "../interfaces"
import { type StateCreator, create } from "zustand"
import { reviveDate, splitShift } from "@/lib"

import { persist } from "zustand/middleware"

const defaultReport = {
  number: 0,
  startDate: new Date(),
  endDate: new Date(),
  shifts: [],
}

interface ReportState {
  report: Report
  status: WorkStatus

  clockIn: () => void
  clockOut: () => void
  endLunch: () => void
  startLunch: () => void
  submitReport: () => Promise<boolean>
}

const storeApi: StateCreator<ReportState> = (set, get) => ({
  report: defaultReport,
  status: "idle",

  clockIn: () => {
    const report = get().report
    if (report.number === 0) {
      report.number = 1
      report.startDate = new Date()
    }
    report.shifts = [...report.shifts, { start: new Date() }]

    set({ report, status: "working" })
  },
  clockOut: () => {
    const report = get().report
    const { rest, shift } = splitShift(report.shifts)

    shift.end = new Date()
    report.shifts = [...rest, shift]

    set({ report, status: "idle" })
  },
  endLunch: () => {
    const report = get().report
    const { rest, shift } = splitShift(report.shifts)

    shift.lunchEnd = new Date()
    report.shifts = [...rest, shift]

    set({ report, status: "working" })
  },
  startLunch: () => {
    const report = get().report
    const { rest, shift } = splitShift(report.shifts)

    shift.lunchStart = new Date()
    report.shifts = [...rest, shift]

    set({ report, status: "lunch" })
  },
  submitReport: async () => {
    return true
  },
})

export const useReportStore = create<ReportState>()(
  persist(storeApi, {
    name: "report",
    onRehydrateStorage: () => state => {
      if (!state) return

      const report = state.report
      report.startDate = new Date(report.startDate)
      report.endDate = new Date(report.endDate)

      report.shifts = report.shifts.map(
        shift =>
          ({
            ...shift,
            start: reviveDate(shift.start),
            end: reviveDate(shift.end),
            lunchStart: reviveDate(shift.lunchStart),
            lunchEnd: reviveDate(shift.lunchEnd),
          } as Shift)
      )
    },
  })
)
