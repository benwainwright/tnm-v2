import { handleLogin } from "./handle-login"
import { login, newPasswordChallengeResponse } from "../aws/authenticate"
import { LoginState } from "../pages/login"
import { mocked } from "ts-jest/utils"

jest.mock("gatsby")
jest.mock("../aws/authenticate")
jest.mock("universal-cookie")

describe("the login handler", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  it("sets the state to MfaChallenge if an MfaChallenge is returned from the login", async () => {
    mocked(login).mockResolvedValue({
      challengeName: "SMS_MFA",
    })

    const setLoginState = jest.fn()
    const setErrorMessage = jest.fn()
    const setResponse = jest.fn()
    const loginResponse = jest.fn()

    await handleLogin(
      { email: "foo@bar.com", password: "foo" },
      LoginState.DoLogin,
      setLoginState,
      setResponse,
      setErrorMessage,
      loginResponse
    )

    expect(setLoginState).toBeCalledWith(LoginState.MfaChallenge)
  })

  it("calls the setResponse callback when a response is receieved", async () => {
    const mockResponse = {
      challengeName: "NEW_PASSWORD_REQUIRED",
    }

    mocked(login).mockResolvedValue(mockResponse)

    const setLoginState = jest.fn()
    const setErrorMessage = jest.fn()
    const setResponse = jest.fn()

    await handleLogin(
      { email: "foo@bar.com", password: "foo" },
      LoginState.DoLogin,
      setLoginState,
      setResponse,
      setErrorMessage,
      undefined
    )

    expect(setResponse).toBeCalledWith(mockResponse)
  })

  it("sets the state to changePasswordChallenge if a changePasswordChallenge is returned from login", async () => {
    mocked(login).mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    })

    const setLoginState = jest.fn()
    const setErrorMessage = jest.fn()
    const setResponse = jest.fn()

    await handleLogin(
      { email: "foo@bar.com", password: "foo" },
      LoginState.DoLogin,
      setLoginState,
      setErrorMessage,
      setResponse,
      undefined
    )

    expect(setLoginState).toBeCalledWith(LoginState.ChangePasswordChallenge)
  })

  it("Calls newPasswordChallengeResponse if the state is PasswordChallenge", async () => {
    const setLoginState = jest.fn()
    const setErrorMessage = jest.fn()
    const setResponse = jest.fn()

    const user = jest.fn()

    mocked(newPasswordChallengeResponse).mockResolvedValue({
      challengeName: "NEW_PASSWORD_REQUIRED",
    })

    await handleLogin(
      { password: "foo-password" },
      LoginState.ChangePasswordChallenge,
      setLoginState,
      setErrorMessage,
      setResponse,
      user
    )

    expect(mocked(newPasswordChallengeResponse)).toBeCalledWith(
      user,
      "foo-password"
    )
  })
})
