import { formatLongDate, formatTime } from "@/lib"
import { useEffect, useState } from "react"

export const Clock = () => {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className='text-center'>
      <div className='text-6xl font-light tracking-tight text-transparent bg-linear-120 from-primary to-primary/35 bg-clip-text'>
        {formatTime(time)}
      </div>
      <p className='mt-2 text-muted-foreground'>{formatLongDate(time)}</p>
    </div>
  )
}
