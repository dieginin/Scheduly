import { calculateDays, lunchDuration, shiftDuration } from "@/lib"

import { useReportStore } from "../stores"

export const useReport = () => {
  const report = useReportStore(s => s.report)
  const shift = useReportStore(s => s.shift)
  const status = useReportStore(s => s.status)

  const daysCount = report ? calculateDays(report) : 0
  const lunchTime = shift ? lunchDuration(shift) : { hours: 0, minutes: 0 }
  const workedTime = shift ? shiftDuration(shift) : { hours: 0, minutes: 0 }

  const isLunching = useReportStore(s => s.isLunching)
  const isWorking = useReportStore(s => s.isWorking)
  const tookLunch = useReportStore(s => s.tookLunch)

  const clockIn = useReportStore(s => s.clockIn)
  const clockOut = useReportStore(s => s.clockOut)
  const endLunch = useReportStore(s => s.endLunch)
  const startLunch = useReportStore(s => s.startLunch)
  const submitReport = useReportStore(s => s.submitReport)

  return {
    report,
    shift,
    status,

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
    submitReport,
  }
}
