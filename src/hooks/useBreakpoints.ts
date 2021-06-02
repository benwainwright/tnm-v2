import { useEffect, useState } from "react"

interface BreakpointValue {
  start?: number
  end?: number
}

export interface Breakpoints {
  [name: string]: BreakpointValue
}

const findBreakpoint = (breakpoints: Breakpoints) => {
  const betweenBreakpoint = Object.entries(breakpoints).find(([, values]) => {
    const start = values.start ?? 0
    const end = values.end ?? 9999999

    return window.innerWidth >= start && window.innerWidth <= end
  })

  return (betweenBreakpoint ?? [""])[0]
}

export const useBreakpoints = (breakpoints: Breakpoints): string => {
  const [breakpoint, setBreakpoint] = useState(findBreakpoint(breakpoints))
  useEffect(() => {
    const handleResize = () => setBreakpoint(findBreakpoint(breakpoints))
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  })
  return breakpoint
}
