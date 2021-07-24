import { act, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import LoginAndRegisterBox from "./login-and-register-box"

describe("The login and register box", () => {
  it("renders without error", () => {
    render(<LoginAndRegisterBox defaultTab="Login" />)
  })

  it("Changes the history bar if you click on a tab", () => {
    const replaceStateSpy = jest.spyOn(window.history, "replaceState")
    render(<LoginAndRegisterBox defaultTab="Login" />)

    const registerTab = screen.getByRole("tab", { name: "Register" })

    act(() => userEvent.click(registerTab))

    expect(replaceStateSpy).toBeCalledWith(null, "", "/register/")
  })
})
