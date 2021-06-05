import { handleLogin } from "./handle-login"
import { login } from "../aws/authenticate"
import { mocked } from "ts-jest/utils"
import { ApiError } from "../types/api-error"
import { navigate } from "gatsby"

jest.mock("gatsby")
jest.mock("../aws/authenticate")

describe("the login handler", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("sets an appropriate error message if the user does not exist", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    const error: ApiError = {
      code: "UserNotFoundException",
      name: "UserNotFoundException",
      message: "User does not exist.",
    }

    error.code = "UserNotFoundException"

    mocked(login, true).mockRejectedValue(error)

    await handleLogin("foo", "bar", setUser, setErrorMessage)

    expect(setErrorMessage).toBeCalledWith({
      field: "email",
      message: "User does not exist",
    })
  })

  it("sets an appropriate error message if the password is wrong", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    const error: ApiError = {
      code: "NotAuthorizedException",
      name: "NotAuthorizedException",
      message: "Incorrect username or password",
    }

    error.code = "UserNotFoundException"

    mocked(login, true).mockRejectedValue(error)

    await handleLogin("foo", "bar", setUser, setErrorMessage)

    expect(setErrorMessage).toBeCalledWith({
      field: "email",
      message: "User does not exist",
    })
  })

  it("redirects to the new password page if the response is a new password challenge", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    mocked(login, true).mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    })

    await handleLogin("foo", "bar", setUser, setErrorMessage)

    expect(mocked(navigate, true)).toHaveBeenCalledWith(
      `/new-password?username=foo`
    )
  })

  it("redirects to the account page if the response is successful", () => {})
})
