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

export const formatTime = (time: Date) =>
  time.toLocaleTimeString("us-US", {
    hour: "2-digit",
    minute: "2-digit",
  })
