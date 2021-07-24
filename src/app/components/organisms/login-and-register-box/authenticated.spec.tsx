import Authenticated, { Redirect } from "./authenticated"
import { currentUser } from "@app/aws/authenticate"
import { mocked } from "ts-jest/utils"
import { render, screen, waitFor } from "@testing-library/react"
import { navigate } from "gatsby"

jest.mock("@app/aws/authenticate")
jest.mock("gatsby")

describe("The <Authenticated> component", () => {
  it("shows contents when a user has been found", async () => {
    const user = jest.fn()
    mocked(currentUser).mockResolvedValue(user)

    render(<Authenticated redirect={Redirect.IfLoggedIn}>Hello!</Authenticated>)

    const childText = await screen.findByText("Hello!")

    expect(childText).toBeInTheDocument()
  })

  it("does not show content when a user has not been found", async () => {
    mocked(currentUser).mockReturnValue(Promise.resolve())

    render(<Authenticated redirect={Redirect.IfLoggedIn}>Hello!</Authenticated>)

    const childText = await screen.findByText("Hello!")

    expect(childText).not.toBeInTheDocument()
  })

  it("Redirects to /login/ when no user has been found", async () => {
    mocked(currentUser).mockReturnValue(Promise.resolve())

    render(<Authenticated redirect={Redirect.IfLoggedIn}>Hello!</Authenticated>)

    await waitFor(() => expect(navigate).toHaveBeenCalledWith("/login/"))
  })
})
