import { renderHook } from "@testing-library/react-hooks"
import { useBreakpoints, Breakpoints } from "./useBreakpoints"

describe("useBreakpoints", () => {
  it("defaults to the smallest breakpoint if rendered server side", () => {
    const breakpoints1: Breakpoints = {
      small: {
        end: 100,
      },
      large: {
        start: 501,
      },
      medium: {
        start: 300,
        end: 500,
      },
    }

    const { result: result1 } = renderHook(() => useBreakpoints(breakpoints1))
    expect(result1.current).toEqual("small")
  })
})
