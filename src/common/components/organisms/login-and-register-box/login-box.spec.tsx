import { render } from "@testing-library/react"
import LoginBox from "./login-box"

describe("The login box", () => {
  it("renders without errors", () => {
    render(<LoginBox />)
  })
})
