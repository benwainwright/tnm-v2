import { mocked } from "ts-jest/utils"
import { render, screen } from "@testing-library/react"
import { currentUser } from "@common/aws/authenticate"
import { useStaticQuery } from "gatsby"
import Login from "./login"

jest.mock("gatsby")
jest.mock("@common/aws/authenticate")

test("The login page shows the login tab by default", async () => {
  const user = jest.fn()
  mocked(currentUser).mockResolvedValue(user)

  mocked(useStaticQuery).mockReturnValue({
    site: { siteMetadata: { title: "foo", description: "foo" } }
  })

  render(<Login />)

  const forgot = await screen.findByText("Forgot your password?")

  expect(forgot).toBeInTheDocument()
})
