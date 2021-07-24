import { login, newPasswordChallengeResponse } from "@app/aws/authenticate"
import { SrpData } from "@app/types/srp-data"
import { act, renderHook } from "@testing-library/react-hooks"
import { navigate } from "gatsby"
import { when } from "jest-when"
import { mocked } from "ts-jest/utils"
import { LoginState } from "./login-box"
import { useLoginBox } from "./use-login-box"

jest.mock("@app/aws/authenticate")
jest.mock("gatsby")

afterEach(() => jest.resetAllMocks())

test("use login hook Sets an error message if an error is thrown by login", async () => {
  mocked(login).mockRejectedValue(new Error("AN ERROR!"))

  const { result } = renderHook(() => useLoginBox())

  await act(() => result.current.onSubmit({ email: "foo" } as SrpData))

  expect(result.current.errorMessage).toEqual({ message: "AN ERROR!" })
})

test("use login hook Sets the state to MfaChallenge if an MfaChallenge is returned from the login", async () => {
  when(mocked(login)).calledWith("foo@bar.com", "foo").mockResolvedValue({
    challengeName: "SMS_MFA"
  })

  const { result } = renderHook(() => useLoginBox())

  await act(() =>
    result.current.onSubmit({ email: "foo@bar.com", password: "foo" })
  )

  expect(result.current.loginState).toEqual(LoginState.MfaChallenge)
})

test("use login hook Sets the state to changePasswordChallenge if a changePasswordChallenge is returned from login", async () => {
  when(mocked(login)).calledWith("foo@bar.com", "foo").mockResolvedValue({
    challengeName: "NEW_PASSWORD_REQUIRED"
  })

  const { result } = renderHook(() => useLoginBox())

  await act(() =>
    result.current.onSubmit({ email: "foo@bar.com", password: "foo" })
  )

  expect(result.current.loginState).toEqual(LoginState.ChangePasswordChallenge)
})

test("Redirects to the account page if login is succesful after login state", async () => {
  when(mocked(login))
    .calledWith("foo@bar.com", "foo")
    .mockResolvedValue({
      signInUserSession: {
        accessToken: "foo-token"
      }
    })

  const { result } = renderHook(() => useLoginBox())

  await act(() =>
    result.current.onSubmit({ email: "foo@bar.com", password: "foo" })
  )

  expect(mocked(navigate)).toBeCalledWith("/account/")
})

test("Redirects to the account page if login is succesful after changing password", async () => {
  const loginResponse = {
    challengeName: "NEW_PASSWORD_REQUIRED"
  }

  when(mocked(login))
    .calledWith("foo@bar.com", "foo-password")
    .mockResolvedValue(loginResponse)

  when(mocked(newPasswordChallengeResponse))
    .calledWith(loginResponse, "new-password")
    .mockResolvedValue({
      signInUserSession: {
        accessToken: "foo-token"
      }
    })

  const { result } = renderHook(() => useLoginBox())

  await act(() =>
    result.current.onSubmit({ email: "foo@bar.com", password: "foo-password" })
  )

  await act(() => result.current.onSubmit({ password: "new-password" }))

  expect(mocked(navigate)).toBeCalledWith("/account/")
})
