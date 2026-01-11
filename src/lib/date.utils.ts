export const formatDate = (date: Date) =>
  date.toLocaleDateString("us-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

export const formatLongDate = (date: Date) =>
  date.toLocaleDateString("us-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

export const formatSemiLongDate = (date: Date) =>
  date.toLocaleDateString("us-US", {
    weekday: "long",
    year: "2-digit",
    month: "short",
    day: "numeric",
  })

export const formatTime = (time?: Date | string) => {
  const d = time instanceof Date ? time : time ? new Date(time) : new Date()
  if (isNaN(d.getTime())) return "--:--"
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
}
