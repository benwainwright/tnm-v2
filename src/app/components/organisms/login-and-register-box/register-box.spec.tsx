import { render } from "@testing-library/react"
import RegisterBox from "./register-box"

describe("The register box", () => {
  it("renders without errors", () => {
    render(<RegisterBox />)
  })
})
