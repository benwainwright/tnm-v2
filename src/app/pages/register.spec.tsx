import { currentUser } from "@app/aws/authenticate"
import { render, screen } from "@testing-library/react"
import { useStaticQuery } from "gatsby"
import { mocked } from "ts-jest/utils"
import Register from "./register"

jest.mock("gatsby")
jest.mock("@app/aws/authenticate")

test("The register page shows the register tab by default", async () => {
  const user = jest.fn()
  mocked(currentUser).mockResolvedValue(user)

  mocked(useStaticQuery).mockReturnValue({
    site: { siteMetadata: { title: "foo", description: "foo" } }
  })

  render(<Register />)

  const forgot = await screen.findByText("Verify Password")

  expect(forgot).toBeInTheDocument()
})
