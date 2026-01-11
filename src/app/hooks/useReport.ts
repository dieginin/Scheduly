import { splitShift } from "@/lib"
import { useReportStore } from "../stores"

export const useReport = () => {
  const report = useReportStore(s => s.report)
  const status = useReportStore(s => s.status)

  const currentShift = splitShift(report.shifts).shift

  const clockIn = useReportStore(s => s.clockIn)
  const clockOut = useReportStore(s => s.clockOut)
  const endLunch = useReportStore(s => s.endLunch)
  const startLunch = useReportStore(s => s.startLunch)
  const submitReport = useReportStore(s => s.submitReport)

  return {
    report,
    status,

    currentShift,

    clockIn,
    clockOut,
    endLunch,
    startLunch,
    submitReport,
  }
}
