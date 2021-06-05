import { handleLogin } from "./handle-login"
import { login } from "../aws/authenticate"
import { mocked } from "ts-jest/utils"
import { mock as mockExtended } from "jest-mock-extended"
import { ApiError } from "../types/api-error"
import { navigate } from "gatsby"
import Cookies from "universal-cookie"

jest.mock("gatsby")
jest.mock("../aws/authenticate")
jest.mock("universal-cookie")

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

  it("sets TNMV2_CHALLENGE_USERNAME cookie if new password challenge is required", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    mocked(login, true).mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    })

    const mockCookies = mockExtended<Cookies>()

    mocked(Cookies, true).mockImplementation(() => mockCookies)

    await handleLogin("foo-user", "bar", setUser, setErrorMessage)

    expect(mockCookies.set).toBeCalledWith(
      "TNMV2_CHALLENGE_USERNAME",
      "foo-user"
    )
  })

  it("sets TNMV2_CHALLENGE_USERNAME cookie if MFA challenge is required", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    mocked(login, true).mockResolvedValue({
      challengeName: "SMS_MFA",
    })

    const mockCookies = mockExtended<Cookies>()

    mocked(Cookies, true).mockImplementation(() => mockCookies)

    await handleLogin("foo-user", "bar", setUser, setErrorMessage)

    expect(mockCookies.set).toBeCalledWith(
      "TNMV2_CHALLENGE_USERNAME",
      "foo-user"
    )
  })

  it("redirects to the new password page if the response is a new password challenge", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    mocked(login, true).mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    })

    await handleLogin("foo", "bar", setUser, setErrorMessage)

    expect(mocked(navigate, true)).toHaveBeenCalledWith(`/new-password`)
  })

  it("redirects to the MFA password page if the response is a MFA challenge", async () => {
    const setUser = jest.fn()
    const setErrorMessage = jest.fn()

    mocked(login, true).mockResolvedValue({
      challengeName: "SMS_MFA",
    })

    await handleLogin("foo", "bar", setUser, setErrorMessage)

    expect(mocked(navigate, true)).toHaveBeenCalledWith(`/mfa-login`)
  })

  it("redirects to the account page if the response is successful", () => {})
})
