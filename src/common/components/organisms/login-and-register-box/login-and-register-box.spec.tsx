import { render } from "@testing-library/react"
import LoginAndRegisterBox from "./login-and-register-box"

describe("The login and register box", () => {
  it("renders without error", () => {
    render(<LoginAndRegisterBox />)
  })
})
