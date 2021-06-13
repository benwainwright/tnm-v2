import { useEffect, useState } from "react";

interface BreakpointValue {
  start?: number;
  end?: number;
}

export interface Breakpoints {
  [name: string]: BreakpointValue;
}

const isBrowser = typeof window !== "undefined";

const findBreakpoint = (breakpoints: Breakpoints) => {
  const largestStart = Object.entries(breakpoints).reduce((accum, current) =>
    (current[1].start ?? 0) > (accum[1].start ?? 0) ? current : accum
  );

  if (!isBrowser) {
    return largestStart[0];
  }

  const betweenBreakpoint = Object.entries(breakpoints).find(([, values]) => {
    const start = values.start ?? 0;
    const end = values.end ?? 9_999_999;

    return window.innerWidth >= start && window.innerWidth <= end;
  });

  if (!betweenBreakpoint) {
    return largestStart[0];
  }

  return betweenBreakpoint[0];
};

export const useBreakpoints = (breakpoints: Breakpoints): string => {
  const [breakpoint, setBreakpoint] = useState(findBreakpoint(breakpoints));
  useEffect(() => {
    const handleResize = () => setBreakpoint(findBreakpoint(breakpoints));
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);
  return breakpoint;
};
